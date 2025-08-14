import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory as KonectaFactory } from "../candid/js/konecta.did.js";

// ────────────────────────────────────────────────────────────
//  Generated Candid bindings (TypeScript declarations)
// ────────────────────────────────────────────────────────────
import type {
  _SERVICE as KonectaActor,
  ApplyToServiceRequestPayload,
  ExpertFeedbackRequestPayload,
  GetInformationRequest,
  GetInformationResponse,
  GetTableMetadataOutputType,
  HttpResponsePayload,
  MissingFeedbackEvent,
  PaginatedScanCursor,
  QueryOpsInputType,
  QueryOpsOutputType,
  RelationalExpressionAttributeDataValue,
  Result,
  Result_1,
  Result_10,
  Result_11,
  Result_12,
  Result_13,
  Result_14,
  Result_15,
  Result_16,
  Result_17,
  Result_2,
  Result_3,
  Result_4,
  Result_5,
  Result_6,
  Result_7,
  Result_8,
  Result_9,
  TransformArgs,
  TransferRequestPayload,
  UpdateInformationRequest,
  UpdateOpsInputType,
  UpdateOpsOutputType,
  UserFeedbackRequestPayload,
  UserResponsePayload,
} from "../candid/ts/konecta.did.js";

export type FEED_TYPE =
  | "FUTURE_REQUESTS"
  | "FUTURE_OFFERS"
  | "PAST_OFFERS"
  | "PAST_REQUESTS";

/**
 * Helper to build Candid option values: converts an optional `T` into
 * the variant representation (`[]` for None, `[value]` for Some).
 */
function opt<T>(value?: T): [] | [T] {
  return typeof value === "undefined" ? [] : [value];
}

/**
 * Strongly‑typed wrapper around the Konecta canister actor generated from Candid.
 */
class KonectaActorService {
  private konectaActor: KonectaActor | undefined = undefined;

  // ────────────────────────────────────────────────────────────
  //  Initialisation
  // ────────────────────────────────────────────────────────────

  /**
   * Creates an `HttpAgent` and initialises the Konecta actor.
   */
  async init(canisterId: string, identity?: Identity): Promise<boolean> {
    try {
      const agent = new HttpAgent({ identity, host: "https://ic0.app" });
      if (process.env.NODE_ENV === "development") {
        // Fetch root key only in local/dev environments
        await agent.fetchRootKey();
      }

      this.konectaActor = Actor.createActor<KonectaActor>(KonectaFactory, {
        agent,
        canisterId,
      });
      return true;
    } catch (err) {
      console.error("[KonectaService] init error", err);
      return false;
    }
  }

  /** Ensures the actor has been initialised before any call */
  private checkActor(): KonectaActor {
    if (!this.konectaActor) {
      throw new Error("Konecta actor not initialised. Call init() first.");
    }
    return this.konectaActor;
  }

  // ────────────────────────────────────────────────────────────
  //  Event & Application Management
  // ────────────────────────────────────────────────────────────

  async acceptUserApplication(applicantUserId: string, eventId: string): Promise<Result> {
    return this.checkActor().acceptUserApplication(applicantUserId, eventId);
  }

  async declineServiceRequestApplication(applicantUserId: string, eventId: string): Promise<Result> {
    return this.checkActor().declineServiceRequestApplication(applicantUserId, eventId);
  }

  async cancelKonectaEvent(eventId: string): Promise<Result> {
    return this.checkActor().cancelKonectaEvent(eventId);
  }

  async joinPublicEvent(eventId: string): Promise<Result> {
    return this.checkActor().joinPublicEvent(eventId);
  }

  async withdrawFromEvent(eventId: string): Promise<Result> {
    return this.checkActor().withdrawFromEvent(eventId);
  }

  async applyToServiceRequest(payload: ApplyToServiceRequestPayload): Promise<Result> {
    return this.checkActor().applyToServiceRequest(payload);
  }

  // ────────────────────────────────────────────────────────────
  //  Feedback Management
  // ────────────────────────────────────────────────────────────

  async insertUserFeedback(payload: UserFeedbackRequestPayload): Promise<Result_3> {
    return this.checkActor().insertUserFeedback(payload);
  }

  async insertMultipleUserFeedback(payloads: UserFeedbackRequestPayload[]): Promise<Result_4> {
    return this.checkActor().insertMultipleUserFeedback(payloads);
  }

  async insertExpertFeedback(payload: ExpertFeedbackRequestPayload): Promise<Result> {
    return this.checkActor().insertExpertFeedback(payload);
  }

  async checkFeedbackByUserForEvent(
    userId: string,
    eventId: string,
    values: RelationalExpressionAttributeDataValue[],
  ): Promise<boolean> {
    return this.checkActor().checkFeedbackByUserForEvent(userId, eventId, values);
  }

  async checkIfUserFeedbackExistsForEvent(eventId: string): Promise<Result_17> {
    return this.checkActor().checkIfUserFeedbackExistsForEvent(eventId);
  }

  async getFeedbackById(feedbackId: string): Promise<Result_14> {
    return this.checkActor().getFeedbackById(feedbackId);
  }

  // ────────────────────────────────────────────────────────────
  //  Payment & Transactions
  // ────────────────────────────────────────────────────────────

  async transferAmountFromUserToEventSubAccount(payload: TransferRequestPayload): Promise<Result_1> {
    return this.checkActor().transferAmountFromUserToEventSubAccount(payload);
  }

  async transferAmountFromSubAccountToUserForEvent(eventId: string): Promise<Result_2> {
    return this.checkActor().transferAmountFromSubAccountToUserForEvent(eventId);
  }

  async runMoneyTransferJob(): Promise<Result> {
    return this.checkActor().runMoneyTransferJob();
  }

  async getDefaultAccountIdentifier(): Promise<string> {
    return this.checkActor().getDefaultAccountIdentifier();
  }

  async generateTransactionResponse(paginatedResult: Result_16): Promise<Result_5> {
    return this.checkActor().generateTransactionResponse(paginatedResult);
  }

  // ────────────────────────────────────────────────────────────
  //  Feed & Pagination Helpers
  // ────────────────────────────────────────────────────────────

  async getPaginatedFeed(payload: {
    categories: [] | [string[]];
    status: [] | [string];
    recordingType: [] | [boolean[]];
    cursor: [] | [PaginatedScanCursor];
    userId: [] | [Principal];
    limit: bigint;
    currentTimestamp: bigint;
    isFuture: boolean;
    eventType: [] | [string];
  }): Promise<Result_6> {
    return this.checkActor().getPaginatedFeed(payload);
  }

  async getMyServiceOffers(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_6> {
    return this.checkActor().getMyServiceOffers(limit, opt(cursor));
  }

  async getPaginatedJoinedOffersForMyProfile(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_6> {
    return this.checkActor().getPaginatedJoinedOffersForMyProfile(limit, opt(cursor));
  }

  async getPaginatedJoinedRequestsForMyProfile(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_6> {
    return this.checkActor().getPaginatedJoinedRequestsForMyProfile(limit, opt(cursor));
  }

  async getPaginatedServiceOffersForMyProfile(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_6> {
    return this.checkActor().getPaginatedServiceOffersForMyProfile(limit, opt(cursor));
  }

  async getApplicationStatusOfMyCreatedEvents(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_7> {
    return this.checkActor().getApplicationStatusOfMyCreatedEvents(limit, opt(cursor));
  }

  /**
   * Same data set as `getApplicationStatusOfMyCreatedEvents` but allows filtering by creator Principal.
   */
  async getPaginatedApplicationStatusOfMyCreatedEvents(
    creator: Principal,
    limit: bigint,
    cursor?: PaginatedScanCursor,
  ): Promise<Result_7> {
    return this.checkActor().getPaginatedApplicationStatusOfMyCreatedEvents(creator, limit, opt(cursor));
  }

  async getAllTransactions(): Promise<Result_15> {
    return this.checkActor().getAllTransactions();
  }

  async getAllPaginatedTransactions(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_5> {
    return this.checkActor().getAllPaginatedTransactions(limit, opt(cursor));
  }

  async getTransactionsForUser(limit: bigint, cursor?: PaginatedScanCursor): Promise<Result_5> {
    return this.checkActor().getTransactionsForUser(limit, opt(cursor));
  }

  async getTransactionsForUserByType(limit: bigint, cursor: PaginatedScanCursor | undefined, userType: string): Promise<Result_5> {
    return this.checkActor().getTransactionsForUserByType(limit, opt(cursor), userType);
  }

  async getTransactionsForEventByType(limit: bigint, cursor: PaginatedScanCursor | undefined, eventId: string, userType: string): Promise<Result_5> {
    return this.checkActor().getTransactionsForEventByType(limit, opt(cursor), eventId, userType);
  }

  async getUserDetailsByCompositeQuery(query: string): Promise<UserResponsePayload> {
    return this.checkActor().getUserDetailsByCompositeQuery(query);
  }

  async getUserStatusForServiceOffers(principal: Principal, eventId: string): Promise<string> {
    return this.checkActor().getUserStatusForServiceOffers(principal, eventId);
  }

  async getListOfMissingFeedbackEvents(): Promise<Result_11> {
    return this.checkActor().getListOfMissingFeedbackEvents();
  }

  async getMissingFeedbackEventArray(eventIds: string[]): Promise<MissingFeedbackEvent[]> {
    return this.checkActor().getMissingFeedbackEventArray(eventIds);
  }

  // ────────────────────────────────────────────────────────────
  //  Email & Notification helpers
  // ────────────────────────────────────────────────────────────

  async sendEventCompletionEmail(): Promise<Result> {
    return this.checkActor().sendEventCompletionEmail();
  }

  async getListOfEventCompletionEmails(): Promise<Result_13> {
    return this.checkActor().getListOfEventCompletionEmails();
  }

  async getListOfExpertFeedbacks(): Promise<Result_12> {
    return this.checkActor().getListOfExpertFeedbacks();
  }

  async getListOfUserActionEmails(): Promise<Result_10> {
    return this.checkActor().getListOfUserActionEmails();
  }

  async getListOfUserFeedbackForwardedEmailsToExpert(): Promise<Result_9> {
    return this.checkActor().getListOfUserFeedbackForwardedEmailsToExpert();
  }

  async getListOfUserFeedbacks(): Promise<Result_8> {
    return this.checkActor().getListOfUserFeedbacks();
  }

  // ────────────────────────────────────────────────────────────
  //  Low‑level DB & system
  // ────────────────────────────────────────────────────────────

  async queryOperation(payload: { queryOpsInput: QueryOpsInputType }): Promise<QueryOpsOutputType> {
    return this.checkActor().queryOperation(payload);
  }

  async updateOperation(payload: { updateOpsInput: UpdateOpsInputType }): Promise<UpdateOpsOutputType> {
    return this.checkActor().updateOperation(payload);
  }

  async isWhiteListUser(principalId: string): Promise<boolean> {
    return this.checkActor().isWhiteListUser(principalId);
  }

  async generateSchema(): Promise<string> {
    return this.checkActor().generateSchema();
  }

  async transform(args: TransformArgs): Promise<HttpResponsePayload> {
    return this.checkActor().transform(args);
  }

  async get_trusted_origins(): Promise<string[]> {
    return this.checkActor().get_trusted_origins();
  }

  async icrc28_trusted_origins(): Promise<{ trusted_origins: string[] }> {
    return this.checkActor().icrc28_trusted_origins();
  }

  async getCanistergeekInformation(request: GetInformationRequest): Promise<GetInformationResponse> {
    return this.checkActor().getCanistergeekInformation(request);
  }

  async updateCanistergeekInformation(request: UpdateInformationRequest): Promise<void> {
    return this.checkActor().updateCanistergeekInformation(request);
  }

  // ────────────────────────────────────────────────────────────
  //  Table metadata helpers
  // ────────────────────────────────────────────────────────────

  async eventCompletionNotificationTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().eventCompletionNotificationTableMetadata();
  }

  async expertEmailTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().expertEmailTableMetadata();
  }

  async expertFeedbackTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().expertFeedbackTableMetadata();
  }

  async getTransactionTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().getTransactionTableMetadata();
  }

  async getUserFeedbackTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().getUserFeedbackTableMetadata();
  }

  async resolutionResponseTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.checkActor().resolutionResponseTableMetadata();
  }
}

export const konectaActorServiceInstance = new KonectaActorService();
export default konectaActorServiceInstance;
