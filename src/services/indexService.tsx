import { Actor, Agent, HttpAgent, Identity } from '@dfinity/agent';
import { DelegationIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import { idlFactory as IndexFactory } from '../candid/js/index.did.js';
import userActorServiceInstance from './userService.tsx';
import eventActorServiceInstance from './eventService.tsx';
import konectaActorServiceInstance from './konectaService.tsx';
import { tokenLedgerArr } from './values.tsx';

import type {
    _SERVICE as IndexActor,
    CanisterMapPayload,
    GetInformationRequest,
    GetInformationResponse,
    SubaccountMapPayload,
    TransactionResponsePayload,
    UpdateInformationRequest,
    UpdateUserRequestPayload,
    UserAccountInfoPayload,
    UserMapPayload,
    UserPayload,
    RegistrationCheckResult,
} from '../candid/ts/index.did.js';

// ---------------------------------------------------------------------------
// ### Local helper interfaces used by the frontend application logic
// ---------------------------------------------------------------------------
interface LoginAttemptResponseV2 {
    type: 'login' | 'signup_required';
    success: boolean;
    userCanisterId: string | undefined;
}

interface UpdateIdentityResponse {
    type: 'user_canister_unavailable' | 'index_actor_update' | 'user_actor_update';
    success: boolean;
}

// ---------------------------------------------------------------------------
// ### Main service class wrapping the Index canister
// ---------------------------------------------------------------------------
class IndexActorService {
    public indexActor: IndexActor | undefined;
    public identity: Identity | DelegationIdentity | undefined;
    public isInitialized: boolean = false;
    public indexCanisterId: string;
    public eventCanisterId: string;
    public konectaCanisterId: string;
    public userCanisterId: string | undefined;
    public userSubaccLedgerIdentifier: string | undefined;
    public userSubaccountHex: string | undefined;
    public icpLedgerCanisterId: string;

    constructor() {
        this.indexActor = undefined;
        this.indexCanisterId = 'yak2b-tqaaa-aaaag-qnhmq-cai';
        this.eventCanisterId = 'yhl4v-6iaaa-aaaag-qnhma-cai';
        this.konectaCanisterId = 'eyark-fqaaa-aaaag-qm7oa-cai';
        this.icpLedgerCanisterId = tokenLedgerArr.at(0)?.canisterId as string;
    }

    public reset(): void {
        console.log("INDEX_SERVICE: Resetting service state.");
        this.indexActor = undefined;
        this.identity = undefined;
        this.isInitialized = false;
        // Do not reset canister IDs, but reset the user-specific ones
        this.userCanisterId = undefined;
        this.userSubaccLedgerIdentifier = undefined;
        this.userSubaccountHex = undefined;
    }

    /**
     * Internal guard that ensures the actor is ready before any call.
     */
    private checkActor(): IndexActor {
        if (!this.indexActor) {
            throw new Error('Index actor not initialized. Please call init() first.');
        }
        return this.indexActor;
    }

    // ===================================================================
    // ## Core Initialization & Session Management
    // ===================================================================

    public async init(agent: Agent): Promise<void> {
        this.indexActor = Actor.createActor<IndexActor>(IndexFactory, {
            agent,
            canisterId: this.indexCanisterId,
        });
    }

    async attemptUserActorInit(agent: HttpAgent): Promise<boolean> {
        if (!this.userCanisterId) {
            return false;
        }
        return userActorServiceInstance.initWithAgent(this.userCanisterId, agent);
    }

    async konectaActorInit(): Promise<boolean> {
        return konectaActorServiceInstance.init(this.konectaCanisterId, this.identity);
    }

    async eventActorInit(): Promise<boolean> {
        return eventActorServiceInstance.init(this.eventCanisterId, this.identity);
    }

    async updateNFIDIdentity(
        agent: HttpAgent,
        identity: Identity,
        userAccountInfo: UserAccountInfoPayload,
    ): Promise<UpdateIdentityResponse> {
        this.identity = identity;
        const userCanisterId = userAccountInfo?.canister_id;
        this.userCanisterId = userCanisterId;
        this.userSubaccLedgerIdentifier =
            userAccountInfo?.subaccount_ledger_identifier;

        const userActorUpdateSuccess = await this.attemptUserActorInit(agent);

        if (!userActorUpdateSuccess) {
            return { type: 'user_actor_update', success: false };
        }

        return { type: 'user_actor_update', success: true };
    }

    // ===================================================================
    // ## User & Account Methods
    // ===================================================================

    async userSignUp(userName: string): Promise<string> {
        const result = await this.checkActor().signUp(userName);
        if ('ok' in result) {
            // The backend returns the new user canister ID upon successful signup
            const canisterId = await this.checkActor().getUserCanister();
            this.userCanisterId = canisterId;
            return canisterId;
        }
        throw new Error(result.err ?? 'Unknown error during signUp');
    }

    async updateUserRecord(
        userId: string,
        payload: UpdateUserRequestPayload,
    ): Promise<string> {
        return this.checkActor().updateUserRecord(userId, payload);
    }

    async userExistsOrNot(): Promise<boolean> {
        return this.checkActor().userExistsOrNot();
    }

    async usernameExistsOrNot(
        username: string,
    ): Promise<[] | [UserMapPayload]> {
        return this.checkActor().usernameExistsOrNot(username);
    }

    async findUser(query: string): Promise<[] | [UserMapPayload]> {
        return this.checkActor().findUser(query);
    }

    async getUserByUsername(userName: string): Promise<[] | [UserPayload]> {
        return this.checkActor().getUserByUsername(userName);
    }

    async getUserAccountInfo(): Promise<UserAccountInfoPayload> {
        return this.checkActor().getUserAccountInfo();
    }

    async getUserCanister(): Promise<string> {
        return this.checkActor().getUserCanister();
    }

    async isUserRegistered(): Promise<RegistrationCheckResult> {
        return this.checkActor().isUserRegistered();
    }

    async getUserCanisterByUserPrincipal(principalId: string): Promise<string> {
        return this.checkActor().getUserCanisterByUserPrincipal(principalId);
    }

    async verifyPayment(): Promise<boolean> {
        return this.checkActor().verifyPayment();
    }

    // ===================================================================
    // ## List & Batch Retrieval Methods
    // ===================================================================

    async getUserCanistersByPrincipal(
        principalIds: Array<string>,
    ): Promise<Array<CanisterMapPayload>> {
        return this.checkActor().getUserCanistersByPrincipal(principalIds);
    }

    async getListOfCanister(): Promise<Array<CanisterMapPayload>> {
        return this.checkActor().getListOfCanister();
    }

    async getListOfUserSubaccounts(): Promise<Array<SubaccountMapPayload>> {
        return this.checkActor().getListOfUserSubaccounts();
    }

    async getListOfUsers(): Promise<Array<UserMapPayload>> {
        return this.checkActor().getListOfUsers();
    }

    async getListofTransactions(): Promise<Array<TransactionResponsePayload>> {
        return this.checkActor().getListofTransactions();
    }

    /** Generates or refreshes the Cadence schema stored in the canister. */
    async generateSchema(): Promise<string> {
        return this.checkActor().generateSchema();
    }

    /** Retrieves monitoring information exposed by canistergeek. */
    async getCanistergeekInformation(
        request: GetInformationRequest,
    ): Promise<GetInformationResponse> {
        return this.checkActor().getCanistergeekInformation(request);
    }

    /** Updates Canistergeek configuration or forces a metrics collection run. */
    async updateCanistergeekInformation(
        request: UpdateInformationRequest,
    ): Promise<void> {
        return this.checkActor().updateCanistergeekInformation(request);
    }

    /** Returns the list of HTTP origins trusted by the backend. */
    async getTrustedOrigins(): Promise<Array<string>> {
        return this.checkActor().get_trusted_origins();
    }

    /** Returns ICRC‑28 compatible trusted origins object. */
    async getIcrc28TrustedOrigins(): Promise<{ trusted_origins: Array<string> }> {
        return this.checkActor().icrc28_trusted_origins();
    }

    /** Reinstalls all user canisters managed by the index. */
    async reinstallUserCanisters(): Promise<string> {
        return this.checkActor().reinstallUserCanisters();
    }

    /** Upgrades all user canisters to the latest Wasm code. */
    async upgradeUserCanisters(): Promise<string> {
        return this.checkActor().upgradeUserCanisters();
    }
}

// Singleton instance used across the app
const indexActorServiceInstance = new IndexActorService();

export default indexActorServiceInstance;