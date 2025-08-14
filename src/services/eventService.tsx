import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as EventFactory } from '../candid/js/event.did.js';

import type {
  _SERVICE as EventActor,
  EventRequestPayload,
  EventAttendeeRequestPayload,
  EventAttendeeActions,
  WithdrawAttendeeRequestPayload,
  GetInformationRequest,
  UpdateInformationRequest,
  HttpRequest,
  StreamingCallbackToken,
  GetFileOutputType,
  GetTableMetadataOutputType,
  ItemOutputType,
  PaginatedScanCursor,
  Result,
  Result_1,
  Result_2,
  Result_3,
  Result_4,
  Result_5,
  Result_6,
  Result_7,
  Result_8,
  Result_9,
  EventWithUserDataPayload,
  UserResponsePayload,
  GetInformationResponse,
  HttpResponse,
  StreamingCallbackHttpResponse,
  EventWithUserDataTupleArray,
  UpdateMultipleEventsPayload,
  UpdateMultipleEventsResponse,
} from '../candid/ts/event.did.js';

/* -------------------------------------------------------------------------- */
/*                              Helper Types                                  */
/* -------------------------------------------------------------------------- */

// Utility type to model Motoko "?T" (IDL [] | [T]) as optional in TS API
export type Option<T> = T | undefined;

export interface FilterEventsParams {
  categories?: string[];
  status?: string;
  recordingType?: boolean[];
  userId?: Principal;
  offset: bigint;
  limit: bigint;
  currentTimestamp: bigint;
  isFuture: boolean;
  eventType?: string;
}

export interface PaginatedFilterEventsParams extends Omit<FilterEventsParams, 'offset'> {
  cursor?: Option<PaginatedScanCursor>;
}

/* -------------------------------------------------------------------------- */
/*                           EventActorService                                 */
/* -------------------------------------------------------------------------- */

class EventActorService {
  private eventActor: EventActor | undefined;

  /** ---------------------------------------------------------------------- */
  /**                           Actor lifecycle                              */
  /** ---------------------------------------------------------------------- */

  async init(
    canisterId: string | Principal,
    identity?: Identity,
    host: string = 'https://ic0.app',
  ): Promise<boolean> {
    try {
      const agent = new HttpAgent({ identity, host });

      // In local or dev networks we need the root key for certificate validation
      if (process.env.NODE_ENV === 'development') {
        await agent.fetchRootKey();
      }

      this.eventActor = Actor.createActor<EventActor>(EventFactory, {
        agent,
        canisterId,
      });

      return true;
    } catch (err) {
      console.error('[EventActorService] init() failed:', err);
      return false;
    }
  }

  private get actor(): EventActor {
    if (!this.eventActor) {
      throw new Error('Event actor not initialised – call init() first.');
    }
    return this.eventActor;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Helper converters                              */
  /* ------------------------------------------------------------------------ */

  private toOpt<T>(value: Option<T>): [] | [T] {
    return value === undefined ? [] : [value];
  }

  private buildFilterParams(p: FilterEventsParams) {
    return {
      categories: this.toOpt(p.categories),
      status: this.toOpt(p.status),
      recordingType: this.toOpt(p.recordingType),
      userId: this.toOpt(p.userId),
      offset: p.offset,
      limit: p.limit,
      currentTimestamp: p.currentTimestamp,
      isFuture: p.isFuture,
      eventType: this.toOpt(p.eventType),
    } as const;
  }

  private buildPaginatedFilterParams(p: PaginatedFilterEventsParams) {
    return {
      categories: this.toOpt(p.categories),
      status: this.toOpt(p.status),
      recordingType: this.toOpt(p.recordingType),
      cursor: this.toOpt(p.cursor),
      userId: this.toOpt(p.userId),
      limit: p.limit,
      currentTimestamp: p.currentTimestamp,
      isFuture: p.isFuture,
      eventType: this.toOpt(p.eventType),
    } as const;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Event Management                              */
  /* ------------------------------------------------------------------------ */

  createEvent(userCanisterId: string, payload: EventRequestPayload) {
    return this.actor.createEvent(userCanisterId, payload);
  }

  updateEvent(userCanisterId: string, eventId: string, payload: EventRequestPayload) {
    return this.actor.updateEvent(userCanisterId, eventId, payload);
  }

  updateMultipleEvents(
    userCanisterId: string,
    updates: UpdateMultipleEventsPayload[],
  ): Promise<UpdateMultipleEventsResponse> {
    return this.actor.updateMultipleEvents(userCanisterId, updates);
  }

  cancelEvent(
    userPrincipal: Principal,
    eventId: string,
    status: string,
  ): Promise<Result_9> {
    return this.actor.cancelEvent(userPrincipal, eventId, status);
  }

  /* ------------------------------------------------------------------------ */
  /*                     Attendee & Application Management                    */
  /* ------------------------------------------------------------------------ */

  acceptApplication(eventId: string, userPrincipal: Principal): Promise<Result_1> {
    return this.actor.acceptApplication(eventId, userPrincipal);
  }

  declineApplication(eventId: string, userPrincipal: Principal): Promise<Result_1> {
    return this.actor.declineApplication(eventId, userPrincipal);
  }

  addEventAttendee(payload: EventAttendeeRequestPayload): Promise<Result_1> {
    return this.actor.addEventAttendee(payload);
  }

  updateEventAttendeeStatus(
    eventId: string,
    userPrincipal: Principal,
    oldStatus: EventAttendeeActions,
    newStatus: EventAttendeeActions,
  ): Promise<Result_1> {
    return this.actor.updateEventAttendeeStatus(eventId, userPrincipal, oldStatus, newStatus);
  }

  withdrawEventAttendee(payload: WithdrawAttendeeRequestPayload): Promise<Result> {
    return this.actor.withdrawEventAttendee(payload);
  }

  /* ------------------------------------------------------------------------ */
  /*                       Event & Proposal Retrieval                         */
  /* ------------------------------------------------------------------------ */

  checkIfAttendeeOrAcceptedUserExistsForEvent(userPrincipal: Principal, eventId: string) {
    return this.actor.checkIfAttendeeOrAcceptedUserExistsForEvent(userPrincipal, eventId);
  }

  // Single event helpers -----------------------------------------------------
  getEventDetailsWithUserData(eventId: string) {
    return this.actor.getEventDetailsWithUserData(eventId);
  }

  getEventDetailsWithUserDataAsync(eventId: string) {
    return this.actor.getEventDetailsWithUserDataAsync(eventId);
  }

  // Bulk helpers -------------------------------------------------------------
  getEventArrayFromEventIdArray(eventIds: string[]): Promise<EventWithUserDataTupleArray> {
    return this.actor.getEventArrayFromEventIdArray(eventIds);
  }

  /** Users who have applied but not yet been accepted/declined. */
  getAppliedUsersWithData(eventId: string): Promise<Result_7> {
    return this.actor.getAppliedUsersWithData(eventId);
  }

  // Filtering & pagination ---------------------------------------------------
  getFilteredEvents(params: FilterEventsParams): Promise<Result_5> {
    return this.actor.getFilteredEvents(this.buildFilterParams(params));
  }

  getPaginatedFilteredEvents(params: PaginatedFilterEventsParams): Promise<Result_3> {
    return this.actor.getPaginatedFilteredEvents(this.buildPaginatedFilterParams(params));
  }

  getMyProposals(userPrincipal: Principal): Promise<Result_2> {
    return this.actor.getMyProposals(userPrincipal);
  }

  getMyPaginatedProposals(
    userPrincipal: Principal,
    limit: bigint,
    cursor: Option<PaginatedScanCursor>,
  ): Promise<Result_4> {
    return this.actor.getMyPaginatedProposals(userPrincipal, limit, this.toOpt(cursor));
  }

  getServiceRequestsForUser(userPrincipal: Principal): Promise<Result_2> {
    return this.actor.getServiceRequestsForUser(userPrincipal);
  }

  getEventsForAttendeeWithEventData(userId: string): Promise<Result_6> {
    return this.actor.getEventsForAttendeeWithEventData(userId);
  }

  getPaginatedEventsForAttendee(
    userId: string,
    limit: bigint,
    cursor: Option<PaginatedScanCursor>,
  ): Promise<Result_3> {
    return this.actor.getPaginatedEventsForAttendee(userId, limit, this.toOpt(cursor));
  }

  getEventsWithUserData(items: ItemOutputType[]): Promise<EventWithUserDataPayload[]> {
    return this.actor.getEventsWithUserData(items);
  }

  /* ------------------------------------------------------------------------ */
  /*                         Attendee Helpers                                 */
  /* ------------------------------------------------------------------------ */

  getAttendeeStatusForEvent(userPrincipal: Principal, eventId: string) {
    return this.actor.getAttendeeStatusForEvent(userPrincipal, eventId);
  }

  getAllAttendeesIds(eventId: string): Promise<Result_8> {
    return this.actor.getAllAttendeesIds(eventId);
  }

  getAttendeesByActionWithUserDetails(eventId: string, action: EventAttendeeActions): Promise<Result_7> {
    return this.actor.getAttendeesByActionWithUserDetails(eventId, action);
  }

  getAttendeesByActionWithUserDetailsAsync(eventId: string, action: EventAttendeeActions): Promise<Result_7> {
    return this.actor.getAttendeesByActionWithUserDetailsAsync(eventId, action);
  }

  /* ------------------------------------------------------------------------ */
  /*                            User Utilities                                */
  /* ------------------------------------------------------------------------ */

  fetchUserData(userCanisterId: string, userId: string): Promise<UserResponsePayload> {
    return this.actor.fetchUserData(userCanisterId, userId);
  }

  /* ------------------------------------------------------------------------ */
  /*                                Files                                     */
  /* ------------------------------------------------------------------------ */

  getFile(fileId: string): Promise<GetFileOutputType> {
    return this.actor.getFile(fileId);
  }

  /* ------------------------------------------------------------------------ */
  /*                             Admin / System                               */
  /* ------------------------------------------------------------------------ */

  isWhiteListUser(principalId: string) {
    return this.actor.isWhiteListUser(principalId);
  }

  getCompletedEventsForCron(fromTimestamp: bigint, toTimestamp: bigint): Promise<Result_2> {
    return this.actor.getCompletedEventsForCron(fromTimestamp, toTimestamp);
  }

  generateSchema() {
    return this.actor.generateSchema();
  }

  getEventTableMetadata(): Promise<GetTableMetadataOutputType> {
    return this.actor.getEventTableMetadata();
  }

  /* ------------------------------ HTTP API -------------------------------- */

  http_request(request: HttpRequest): Promise<HttpResponse> {
    return this.actor.http_request(request);
  }

  http_request_streaming_callback(token: StreamingCallbackToken): Promise<StreamingCallbackHttpResponse> {
    return this.actor.http_request_streaming_callback(token);
  }

  get_trusted_origins() {
    return this.actor.get_trusted_origins();
  }

  icrc28_trusted_origins() {
    return this.actor.icrc28_trusted_origins();
  }

  /* -------------------------- Canistergeek API ---------------------------- */

  getCanistergeekInformation(request: GetInformationRequest): Promise<GetInformationResponse> {
    return this.actor.getCanistergeekInformation(request);
  }

  updateCanistergeekInformation(request: UpdateInformationRequest): Promise<void> {
    return this.actor.updateCanistergeekInformation(request);
  }
}

export const eventActorServiceInstance = new EventActorService();
export default eventActorServiceInstance;
