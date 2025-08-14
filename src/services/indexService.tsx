import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { DelegationIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import { idlFactory as IndexFactory } from '../candid/js/index.did.js';
import userActorServiceInstance from './userService';
import eventActorServiceInstance from './eventService';
import konectaActorServiceInstance from './konectaService';
import { tokenLedgerArr } from './values';

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
        this.identity = undefined;
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
            throw new Error(
                'Index actor not initialized. Please call init() or initV2() first.',
            );
        }
        return this.indexActor;
    }

    // ===================================================================
    // ## Core Initialization & Session Management
    // ===================================================================

    async initV2(
        agent: HttpAgent,
        identity: Identity,
    ): Promise<LoginAttemptResponseV2 | undefined> {
        if (this.isInitialized) {
            console.log("INDEX_SERVICE_INIT_V2: Already initialized, skipping re-initialization.");
            const userCanisterId = this.userCanisterId;
            if (!userCanisterId) {
                return { type: 'signup_required', success: true, userCanisterId: undefined };
            }
            return { type: 'login', success: true, userCanisterId };
        }

        console.log("INDEX_SERVICE_INIT_V2: Function started.");
        this.identity = identity;

        if (process.env.NODE_ENV === 'development') {
            console.log("INDEX_SERVICE_INIT_V2: Fetching root key for development environment.");
            await agent.fetchRootKey();
        }

        this.indexActor = Actor.createActor<IndexActor>(IndexFactory, {
            agent,
            canisterId: this.indexCanisterId,
        });
        console.log("INDEX_SERVICE_INIT_V2: Index actor created for canister:", this.indexCanisterId);

        try {
            const principal = identity.getPrincipal();
            console.log(`INDEX_SERVICE_INIT_V2: Calling isUserRegistered() with principal: ${principal.toText()}`);

            // 1. Call the more explicit function to check registration status.
            const registrationStatus = await this.isUserRegistered(principal);
            console.log("INDEX_SERVICE_INIT_V2: isUserRegistered response:", registrationStatus);

            // 2. Check for the 'err' variant, which indicates the user is not registered.
            if ('err' in registrationStatus) {
                console.log("INDEX_SERVICE_INIT_V2: User not registered. Returning 'signup_required'. Message:", registrationStatus.err.message);
                return {
                    type: 'signup_required',
                    success: true,
                    userCanisterId: undefined,
                };
            }

            // 3. If 'ok', the user is registered. Hydrate the service state with the response data.
            const registrationData = registrationStatus.ok;
            const userCanisterId = registrationData.canister_id.toText();

            this.isInitialized = true;
            this.userCanisterId = userCanisterId;
            this.userSubaccLedgerIdentifier = registrationData.subaccount_ledger_identifier[0] ?? undefined;
            this.userSubaccountHex = registrationData.subaccount_id_hex[0] ?? undefined;

            console.log("INDEX_SERVICE_INIT_V2: User is registered. User canister ID:", userCanisterId);
            localStorage.setItem('userCanisterId', userCanisterId);

            return {
                type: 'login',
                success: true,
                userCanisterId,
            };
        } catch (error) {
            console.error("INDEX_SERVICE_INIT_V2: Error during isUserRegistered() call:", error);
            throw error;
        }
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
            return result.ok;
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

    async isUserRegistered(principal: Principal): Promise<RegistrationCheckResult> {
        return this.checkActor().isUserRegistered(principal);
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