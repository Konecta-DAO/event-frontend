import {
  Actor,
  ActorMethod,
  HttpAgent,
  HttpAgentOptions,
  Identity,
} from '@dfinity/agent'
import { idlFactory as KonectaFactory } from '../candid/js/konecta.did.js'
import {
  ApplicantsWithUserDataPayload,
  ApplicationStatusOfMyCreatedEvents,
  ApplyToServiceRequestPayload,
  CheckEventExistsPayload,
  CreateUserFeedbackResponsePayload,
  EventRequestPayload,
  FeedDetailsPayload,
  FeedRequestPayload,
  FeedResponsePayload,
  _SERVICE as KonectaActor,
  LedgerIcrc2TransferError,
  PaginatedApplicationStatusOfMyCreatedEvents,
  PaginatedFeedResponsePayload,
  PaginatedTransactionWithUserDataResponse,
  ProposalResponsePayload,
  RemoveCalendarEvent,
  Result_18,
  Result_6,
  TransactionWithUserDataResponse,
  TransferRequestPayload,
  UserFeedbackRequestPayload,
} from '../candid/ts/konecta.did.js'
import { UserPayload } from 'entity/UserModel'
import { UserRequestModel } from 'entity/UserRequestModel.js'
import { DelegationIdentity } from '@dfinity/identity'
import { EventRequestModel } from 'entity/EventRequestModel.js'
import { Token } from 'entity/konecta/KonectaEventRequestModel.js'
import { EventAttendeeActions } from 'entity/EventAttendeeActions.js'
import moment from 'moment'
import { getNanosecondsFromMoment } from 'utils/dateTimeUtils'

export type LoadMoreTransactionCallback = (
  limit?: bigint,
) => Promise<TransactionPaginatedResponse | undefined>
interface TransactionPaginatedResponse {
  totalRecords: bigint
  transactions: TransactionWithUserDataResponse[]
  loadMoreTransactions: LoadMoreTransactionCallback | undefined
}

export type LoadMoreApplicantCallback = (
  limit?: bigint,
) => Promise<ApplicantsPaginatedResponse | undefined>
interface ApplicantsPaginatedResponse {
  totalRecords: bigint
  applicants: ApplicationStatusOfMyCreatedEvents[]
  loadMoreApplicants: LoadMoreApplicantCallback | undefined
}

export type FEED_TYPE =
  | 'FUTURE_REQUESTS'
  | 'FUTURE_OFFERS'
  | 'PAST_OFFERS'
  | 'PAST_REQUESTS'

export type PROFILE_TAB_FEED_TYPE =
  | 'MY_OFFERS'
  | 'MY_REQUESTS'
  | 'JOINED_OFFERS'
  | 'JOINED_REQUESTS'
  | 'OTHER_OFFERS'
  | 'OTHER_REQUESTS'

export type LoadMoreEventFeedCallback = (
  limit?: bigint,
) => Promise<EventFeedPaginatedResponse | undefined>

export type LoadAllEventFeedCallback = () => Promise<
  EventFeedPaginatedResponse | undefined
>

export interface EventFeedPaginatedResponse {
  totalRecords: bigint
  events: FeedResponsePayload[]
  loadNextPage: LoadMoreEventFeedCallback | undefined
  loadAllEvents: LoadAllEventFeedCallback | undefined
}

class KonectaActorService {
  konectaActor: KonectaActor | undefined

  constructor() {
    this.konectaActor = undefined
  }

  async init(
    canisterId: string,
    identity?: Identity,
    skipUserCanisterCall: boolean = false,
  ): Promise<boolean> {
    try {
      const args: HttpAgentOptions = {}
      args.identity = identity
      args.host = 'https://ic0.app'

      const agent = new HttpAgent(args)
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }
      this.konectaActor = Actor.createActor(KonectaFactory, {
        agent,
        canisterId,
      })

      return true
    } catch (e) {
      console.error('initKonectaActor error', e)
      return false
    }
  }

  async getDefaultAccountIdentifier(): Promise<undefined | string> {
    const address = await this.konectaActor?.getDefaultAccountIdentifier()
    return address
  }

  async createKonectaEvent(
    userCanisterId: string,
    data: EventRequestPayload,
  ): Promise<undefined | string> {
    if (!this.konectaActor) {
      return
    }
    console.log(
      'data - createKonectaEvent - konectaService111',
      userCanisterId,
      data,
    )

    const resp = await this.konectaActor.createKonectaEvent(
      userCanisterId,
      data,
    )
    console.log('eventResp - createKonectaEvent - konectaService111', resp)

    if (!resp || (resp as { err: string })?.err) {
      throw new Error('Error response while creating konecta event')
    }
    const responsePayload = resp as { ok: string }
    return responsePayload.ok
  }

  async updateKonectaEvent(
    userCanisterId: string,
    data: EventRequestPayload,
  ): Promise<undefined | string> {
    if (!this.konectaActor) {
      return
    }
    console.log(
      'data - updateKonectaEvent - konectaService111',
      userCanisterId,
      data,
    )

    const resp = await this.konectaActor.updateKonectaEvent(
      userCanisterId,
      data,
    )
    console.log('eventResp - updateKonectaEvent - konectaService111', resp)

    return resp
  }

  async getMyServiceOffers(): Promise<undefined | FeedResponsePayload[]> {
    const resp = await this.konectaActor?.getMyServiceOffers()
    console.log('eventResp - getMyServiceOffers - konectaService111', resp)
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error('Error response while fetching user service offers')
    }
    const responsePayload = resp as {
      ok: Array<FeedResponsePayload>
    }
    return responsePayload.ok
  }

  async getServiceOffersForMyProfileTest(
    userPrincipalId: string,
  ): Promise<undefined | FeedResponsePayload[]> {
    try {
      const resp = await this.konectaActor?.getServiceOffersForMyProfileTest(
        userPrincipalId,
      )
      console.log(
        'eventResp - getServiceOffersForMyProfileTest principal:',
        userPrincipalId,
        resp,
      )

      if (!resp) {
        throw new Error(
          'getServiceOffersForMyProfileTest response is undefined',
        )
      }

      if (!resp || (resp as { err: string })?.err) {
        throw new Error((resp as { err: string })?.err)
      }

      const responsePayload = resp as { ok: FeedResponsePayload[] }

      const feedResponse = responsePayload.ok
      return feedResponse
    } catch (e) {
      console.log('error in getServiceOffersForMyProfileTest', e)
      return undefined
    }
  }

  async getServiceRequestsForMyProfileTest(
    userPrincipalId: string,
  ): Promise<undefined | FeedResponsePayload[]> {
    try {
      const resp = await this.konectaActor?.getServiceRequestsForMyProfileTest(
        userPrincipalId,
      )
      console.log(
        'eventResp - getServiceRequestsForMyProfileTest principal:',
        userPrincipalId,
        resp,
      )

      if (!resp) {
        throw new Error(
          'getServiceRequestsForMyProfileTest response is undefined',
        )
      }

      if (!resp || (resp as { err: string })?.err) {
        throw new Error((resp as { err: string })?.err)
      }

      const responsePayload = resp as { ok: FeedResponsePayload[] }

      const feedResponse = responsePayload.ok
      return feedResponse
    } catch (e) {
      console.log('error in getServiceRequestsForMyProfileTest', e)
      return undefined
    }
  }

  async getMyServiceRequests(): Promise<undefined | FeedResponsePayload[]> {
    const resp = await this.konectaActor?.getMyServiceRequests()
    console.log('eventResp - getMyServiceRequests - konectaService111', resp)
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error('Error response while fetching user service requests')
    }
    const responsePayload = resp as {
      ok: Array<FeedResponsePayload>
    }
    return responsePayload.ok
  }

  async getServiceOffersApartFromMe(): Promise<
    undefined | FeedResponsePayload[]
  > {
    const resp = await this.konectaActor?.getServiceOffersApartFromMe()
    console.log(
      'eventResp - getServiceOffersApartFromMe - konectaService111',
      resp,
    )
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error(
        'Error response while fetching service offers of other users',
      )
    }
    const responsePayload = resp as {
      ok: Array<FeedResponsePayload>
    }
    return responsePayload.ok
  }

  async getServiceRequestsApartFromMe(): Promise<
    undefined | FeedResponsePayload[]
  > {
    const resp = await this.konectaActor?.getServiceRequestsApartFromMe()
    console.log(
      'eventResp - getServiceRequestsApartFromMe - konectaService111',
      resp,
    )
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error(
        'Error response while fetching service requests of other users',
      )
    }
    const responsePayload = resp as {
      ok: Array<FeedResponsePayload>
    }
    return responsePayload.ok
  }

  async getFeedDetailsByEventId(eventId: string): Promise<FeedDetailsPayload> {
    console.log(
      'eventeventIdResp - getFeedDetailsByEventId - konectaService111',
      eventId,
    )
    const resp = await this.konectaActor?.getFeedDetailsByEventId(eventId)
    console.log('eventResp - getFeedDetailsByEventId - konectaService111', resp)
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error('Error response while fetching event detail')
    }
    const responsePayload = resp as {
      ok: FeedDetailsPayload
    }
    return responsePayload.ok
  }

  async joinPublicEvent(eventId: string): Promise<undefined | string> {
    console.log('eventId - joinPublicEvent - konectaService111', eventId)
    const joinResp = await this.konectaActor?.joinPublicEvent(eventId)
    console.log('eventResp - joinPublicEvent - konectaService111', joinResp)
    if (!joinResp || (joinResp as { err: string })?.err) {
      throw new Error('Error while joining to an event')
    }
    return (joinResp as { ok: string }).ok
  }

  async applyToServiceRequest(
    payload: ApplyToServiceRequestPayload,
  ): Promise<undefined | string> {
    console.log('payload - applyToServiceRequest - konectaService111', payload)
    const applyResp = await this.konectaActor?.applyToServiceRequest(payload)
    console.log(
      'eventResp - applyToServiceRequest - konectaService111',
      applyResp,
    )

    if (!applyResp || (applyResp as { err: string })?.err) {
      throw new Error((applyResp as { err: string })?.err)
    }
    return (applyResp as { ok: string }).ok
  }

  async getMyTransactions(
    offset: bigint = BigInt(0),
    limit: bigint = BigInt(5),
  ): Promise<undefined | TransactionPaginatedResponse> {
    console.log('KonectA service - getMyTransaction request', offset, limit)
    const resp = await this.konectaActor?.getTransactionsForUser(offset, limit)

    if (!resp) {
      console.log('KonectA service - getMyTransaction response undefined', resp)
      return undefined
    }

    if ((resp as { err: Array<string> }).err) {
      console.log('KonectA service - getMyTransaction response err', resp)
      return undefined
    }

    if ((resp as { ok: PaginatedTransactionWithUserDataResponse }).ok) {
      console.log('KonectA service - getMyTransaction response', resp)
      const responseObj = (
        resp as { ok: PaginatedTransactionWithUserDataResponse }
      ).ok
      const {
        offset: responseOffset,
        limit: responseLimit,
        nonScannedItemCount,
        items,
        scannedItemCount,
        totalRecords,
      } = responseObj

      const hasNextPage = responseOffset + responseLimit < totalRecords
      return {
        totalRecords,
        transactions: items,
        loadMoreTransactions: hasNextPage
          ? async (limit = BigInt(5)) => {
              return await this.getMyTransactions(
                responseOffset + responseLimit,
                limit,
              )
            }
          : undefined,
      }
    }

    return undefined
  }

  async getMyApplicants(
    offset: bigint = BigInt(0),
    limit: bigint = BigInt(5),
  ): Promise<undefined | ApplicantsPaginatedResponse> {
    console.log('KonectA service - getMyApplicants request', offset, limit)
    const resp = await this.konectaActor?.getApplicationStatusOfMyCreatedEvents(
      offset,
      limit,
    )

    if (!resp) {
      console.log('KonectA service - getMyApplicants response undefined', resp)
      return undefined
    }

    if ((resp as { err: Array<string> }).err) {
      console.log('KonectA service - getMyApplicants response err', resp)
      return undefined
    }

    if ((resp as { ok: PaginatedApplicationStatusOfMyCreatedEvents }).ok) {
      console.log('KonectA service - getMyApplicants response', resp)
      const responseObj = (
        resp as { ok: PaginatedApplicationStatusOfMyCreatedEvents }
      ).ok
      const {
        offset: responseOffset,
        limit: responseLimit,
        nonScannedItemCount,
        items,
        scannedItemCount,
        totalRecords,
      } = responseObj

      const hasNextPage = responseOffset + responseLimit < totalRecords
      return {
        totalRecords,
        applicants: items,
        loadMoreApplicants: hasNextPage
          ? async (limit = BigInt(5)) => {
              return await this.getMyApplicants(
                responseOffset + responseLimit,
                limit,
              )
            }
          : undefined,
      }
    }

    return undefined
  }

  async acceptUserApplication(
    userIdOfApplicant: string,
    eventId: string,
  ): Promise<undefined | string> {
    console.log(
      'userIdOfApplicant - acceptUserApplication - konectaService111',
      userIdOfApplicant,
    )
    const acceptResp = await this.konectaActor?.acceptUserApplication(
      userIdOfApplicant,
      eventId,
    )
    console.log(
      'eventResp - acceptUserApplication - konectaService111',
      acceptResp,
    )

    if (!acceptResp || (acceptResp as { err: string })?.err) {
      throw new Error('Error while accepting an event')
    }
    return (acceptResp as { ok: string }).ok
  }

  async declineUserApplication(
    userIdOfApplicant: string,
    eventId: string,
  ): Promise<undefined | string> {
    console.log(
      'userIdOfApplicant - declineUserApplication - konectaService111',
      userIdOfApplicant,
      eventId,
    )
    const declineResp = await this.konectaActor?.declineUserApplication(
      userIdOfApplicant,
      eventId,
    )
    console.log(
      'eventResp - declineUserApplication - konectaService111',
      declineResp,
    )
    if (!declineResp || (declineResp as { err: string })?.err) {
      throw new Error('Error while declining an event')
    }
    return (declineResp as { ok: string }).ok
  }

  async getAppliedUsersByActionWithUserData(
    eventId: string,
    action: EventAttendeeActions[],
  ): Promise<undefined | ApplicantsWithUserDataPayload[]> {
    console.log(
      'eventId - getAppliedUsersByActionWithUserData - konectaService111',
      eventId,
    )
    const appliedUsersResp =
      await this.konectaActor?.getAppliedUsersByActionWithUserData(
        eventId,
        action,
      )
    console.log(
      'eventResp - getAppliedUsersByActionWithUserData - konectaService111',
      appliedUsersResp,
    )

    if (
      !appliedUsersResp ||
      (appliedUsersResp as { err: Array<string> })?.err
    ) {
      throw new Error('Error response while fetching applied users')
    }
    const responsePayload = appliedUsersResp as {
      ok: Array<ApplicantsWithUserDataPayload>
    }
    return responsePayload.ok
  }

  async cancelKonectaEvent(eventId: string): Promise<undefined | string> {
    console.log('eventId - cancelKonectaEvent - konectaService111', eventId)
    const cancelResp = await this.konectaActor?.cancelKonectaEvent(eventId)
    console.log(
      'eventResp - cancelKonectaEvent - konectaService111',
      cancelResp,
    )
    if (!cancelResp || (cancelResp as { err: string })?.err) {
      throw new Error('Error while cancelling an event')
    }
    return (cancelResp as { ok: string }).ok
  }

  async getUserStatusForEvent(eventId: string): Promise<undefined | string> {
    console.log('eventId - getUserStatusForEvent - konectaService111', eventId)
    const resp = await this.konectaActor?.getUserStatusForEvent(eventId)
    console.log('eventResp - getUserStatusForEvent - konectaService111', resp)
    return resp
  }

  async getMyProposals(): Promise<undefined | ProposalResponsePayload[]> {
    try {
      console.log('konnectaService - getMyProposals')
      const response: any = await this.konectaActor?.getMyProposals()
      console.log('konnectaService - getMyProposals - response', response)

      if (!response) {
        throw new Error('response is undefined')
      }

      if ((response as { err: string }).err) {
        throw new Error('response contains error')
      }

      const proposals = (response as { ok: ProposalResponsePayload[] }).ok

      return proposals
    } catch (e) {
      console.log('konnectaService - getMyProposals - error', e)
      return undefined
    }
  }

  async getEventPaginatedFeed(
    feedType: FEED_TYPE,
    offset = BigInt(0),
    limit = BigInt(10),
    categories: string[] = [],
    userProfile: UserPayload,
    feedSearchText: string,
  ): Promise<undefined | EventFeedPaginatedResponse> {
    try {
      const timezone: string = userProfile.timezone
      console.log(
        'KonectA service - getEventPaginatedFeed - userProfile - timezone',
        userProfile,
        timezone,
      )
      const FeedKeyMethodMap = {
        FUTURE_OFFERS: {
          name: 'getAllFutureOffers',
          method: this.konectaActor?.getAllFutureOffers,
        },
        FUTURE_REQUESTS: {
          name: 'getAllFutureRequests',
          method: this.konectaActor?.getAllFutureRequests,
        },
        PAST_OFFERS: {
          name: 'getAllPastOffers',
          method: this.konectaActor?.getAllPastOffers,
        },
        PAST_REQUESTS: {
          name: 'getAllPastRequests',
          method: this.konectaActor?.getAllPastRequests,
        },
      }

      const actorFeedMethod = FeedKeyMethodMap[feedType].method

      if (!actorFeedMethod) {
        console.log(
          'KonectA service - getEventPaginatedFeed - Feed type',
          feedType,
          'actor method undefined',
        )
        return undefined
      }
      const methodName = FeedKeyMethodMap[feedType].name

      console.log(
        `KonectA service - getEventPaginatedFeed - Feed type ${feedType} - actor method params - method name ${methodName}`,
        {
          currentTimestamp: getNanosecondsFromMoment(moment()),
          offset,
          limit,
          categories,
          timezone,
          feedSearchText,
        },
      )
      const response = await actorFeedMethod({
        currentTimestamp: getNanosecondsFromMoment(moment()),
        offset,
        limit,
        categories,
        recordingType: [],
        searchValue:
          typeof feedSearchText !== 'undefined' && feedSearchText.length > 0
            ? [feedSearchText]
            : [],
        timezone:
          typeof timezone !== 'undefined' && timezone.length > 0
            ? [timezone]
            : [],
      })

      if ((response as { err: Array<string> }).err) {
        console.log(
          `KonectA service - getEventPaginatedFeed - feed type: ${feedType} - feed method: ${methodName} response err`,
          response,
        )
        return undefined
      }

      if ((response as { ok: PaginatedFeedResponsePayload }).ok) {
        const responseObj = (response as { ok: PaginatedFeedResponsePayload })
          .ok
        const {
          offset: responseOffset,
          limit: responseLimit,
          items,
          totalRecords,
        } = responseObj
        console.log(
          `KonectA service - getEventPaginatedFeed - feed type: ${feedType} response object - feed method: ${methodName}`,
          responseObj,
        )

        const hasNextPage = responseOffset + responseLimit < totalRecords

        return {
          totalRecords,
          events: items,
          loadNextPage: hasNextPage
            ? async () => {
                return await this.getEventPaginatedFeed(
                  feedType,
                  responseOffset + responseLimit,
                  responseLimit,
                  categories,
                  userProfile,
                  feedSearchText,
                )
              }
            : undefined,
          loadAllEvents: async () => {
            return await this.getEventPaginatedFeed(
              feedType,
              BigInt(0),
              totalRecords,
              categories,
              userProfile,
              feedSearchText,
            )
          },
        }
      }
      return undefined
    } catch (e) {
      console.log(
        `KonectA service - getEventPaginatedFeed - feed type: ${feedType} err`,
        e,
      )
      return undefined
    }
  }

  async getProfileEventTabPaginatedFeed(
    userPid: string,
    feedType: PROFILE_TAB_FEED_TYPE,
    offset = BigInt(0),
    limit = BigInt(10),
  ) {
    try {
      const FeedKeyMethodMap = {
        MY_OFFERS: {
          name: 'getPaginatedServiceOffersForMyProfile',
          methodPromise:
            this.konectaActor?.getPaginatedServiceOffersForMyProfile(
              offset,
              limit,
            ),
        },
        MY_REQUESTS: {
          name: 'getPaginatedServiceRequestsForMyProfile',
          methodPromise:
            this.konectaActor?.getPaginatedServiceRequestsForMyProfile(
              offset,
              limit,
            ),
        },
        JOINED_OFFERS: {
          name: 'getPaginatedJoinedOffersForMyProfile',
          methodPromise:
            this.konectaActor?.getPaginatedJoinedOffersForMyProfile(
              offset,
              limit,
            ),
        },
        JOINED_REQUESTS: {
          name: 'getPaginatedJoinedRequestsForMyProfile',
          methodPromise:
            this.konectaActor?.getPaginatedJoinedRequestsForMyProfile(
              offset,
              limit,
            ),
        },
        OTHER_OFFERS: {
          name: 'getPaginatedServiceOffersForMyProfileTest',
          methodPromise:
            this.konectaActor?.getPaginatedServiceOffersForMyProfileTest(
              userPid,
              offset,
              limit,
            ),
        },
        OTHER_REQUESTS: {
          name: 'getPaginatedServiceRequestsForMyProfileTest',
          methodPromise:
            this.konectaActor?.getPaginatedServiceRequestsForMyProfileTest(
              userPid,
              offset,
              limit,
            ),
        },
      }

      const actorFeedMethodPromise = FeedKeyMethodMap[feedType].methodPromise

      if (!actorFeedMethodPromise) {
        console.log(
          'KonectA service - getProfileEventTabPaginatedFeed - Feed type',
          feedType,
          'actor method undefined',
        )
        return undefined
      }
      const methodName = FeedKeyMethodMap[feedType].name

      console.log(
        `KonectA service - getProfileEventTabPaginatedFeed - Feed type ${feedType} - actor method params - method name ${methodName}`,
        {
          offset,
          limit,
        },
      )

      const response = await actorFeedMethodPromise

      if ((response as { err: Array<string> }).err) {
        console.log(
          `KonectA service - getProfileEventTabPaginatedFeed - feed type: ${feedType} - feed method: ${methodName} response err`,
          response,
        )
        return undefined
      }

      if ((response as { ok: PaginatedFeedResponsePayload }).ok) {
        const responseObj = (response as { ok: PaginatedFeedResponsePayload })
          .ok
        const {
          offset: responseOffset,
          limit: responseLimit,
          items,
          totalRecords,
        } = responseObj
        console.log(
          `KonectA service - getProfileEventTabPaginatedFeed - feed type: ${feedType} response object - feed method: ${methodName}`,
          responseObj,
        )

        const hasNextPage = responseOffset + responseLimit < totalRecords

        return {
          totalRecords,
          events: items,
          loadNextPage: hasNextPage
            ? async () => {
                return await this.getProfileEventTabPaginatedFeed(
                  userPid,
                  feedType,
                  responseOffset + responseLimit,
                  responseLimit,
                )
              }
            : undefined,
          loadAllEvents: async () => {
            return await this.getProfileEventTabPaginatedFeed(
              userPid,
              feedType,
              BigInt(0),
              totalRecords,
            )
          },
        }
      }
      return undefined
    } catch (e) {
      console.log(
        `KonectA service - getProfileEventTabPaginatedFeed - feed type: ${feedType} err`,
        e,
      )
      return undefined
    }
  }

  async transferAmountFromUserToEventSubAccount(
    token: Token,
    eventId: string,
    fee: bigint,
    amount: bigint,
  ): Promise<undefined | any> {
    const transferReq: TransferRequestPayload = {
      fee: [fee],
      eventId,
      memo: [],
      priceToken: token,
      amount,
    }
    console.log('transferReq - konectaService111', token, transferReq)
    const transferResp =
      await this.konectaActor?.transferAmountFromUserToEventSubAccount(
        transferReq,
      )
    console.log(
      'eventResp - transferAmountFromUserToEventSubAccount - konectaService111',
      transferResp,
    )

    if (
      !transferResp ||
      (transferResp as { err: LedgerIcrc2TransferError })?.err
    ) {
      throw new Error("Error while transferring amount from user's account")
    }
    return (transferResp as { ok: string }).ok
  }

  async getListOfMissingFeedbackEvents(): Promise<Array<FeedResponsePayload>> {
    const missingFeedbackEventsResp =
      await this.konectaActor?.getListOfMissingFeedbackEvents()
    console.log(
      'missingFeedbackEventsResp - feedback - konectaService111',
      missingFeedbackEventsResp,
    )

    if (
      !missingFeedbackEventsResp ||
      (missingFeedbackEventsResp as { err: Array<string> })?.err
    ) {
      throw new Error('Error response while fetching missing feedback events')
    }
    const responsePayload = missingFeedbackEventsResp as {
      ok: Array<FeedResponsePayload>
    }
    return responsePayload.ok
  }

  async insertMultipleUserFeedback(
    userFeedbackRequestPayloads: Array<UserFeedbackRequestPayload>,
  ): Promise<CreateUserFeedbackResponsePayload[]> {
    console.log(
      'userFeedbackRequestPayloads - feedback - konectaService111',
      userFeedbackRequestPayloads,
    )
    const feedbackResps = await this.konectaActor?.insertMultipleUserFeedback(
      userFeedbackRequestPayloads,
    )

    if (!feedbackResps || (feedbackResps as { err: string })?.err) {
      throw new Error((feedbackResps as { err: string })?.err)
    }
    console.log('feedbackResp - feedback - konectaService111', feedbackResps)
    const responsePayload = feedbackResps as {
      ok: CreateUserFeedbackResponsePayload[]
    }
    return responsePayload.ok
  }

  async updateMultipleKonectaEvents(
    userCanisterId: string,
    eventRequestPayloads: Array<EventRequestPayload>,
  ): Promise<undefined | string> {
    const updateResp = await this.konectaActor?.updateMultipleKonectaEvents(
      userCanisterId,
      eventRequestPayloads,
    )

    if (!updateResp || (updateResp as { err: string })?.err) {
      throw new Error('Error response while updating multiple konecta events')
    }
    const responsePayload = updateResp as { ok: string }
    return responsePayload.ok
  }

  async checkIfUserFeedbackExistsForEvent(
    eventId: string,
  ): Promise<undefined | boolean> {
    console.log('eventId - checkIfUserFeedbackExistsForEvent ', eventId)
    const isFeedbackExist =
      await this.konectaActor?.checkIfUserFeedbackExistsForEvent(eventId)
    console.log(
      'checkIfUserFeedbackExistsForEvent - konectaService111',
      isFeedbackExist,
    )
    if (!isFeedbackExist || (isFeedbackExist as { err: string })?.err) {
      throw new Error((isFeedbackExist as { err: string })?.err)
    }
    const responsePayload = isFeedbackExist as { ok: boolean }
    return responsePayload.ok
  }

  async withdrawEventPartipication(
    removeCalendarEvent: RemoveCalendarEvent,
  ): Promise<undefined | string> {
    const withDrawResp = await this.konectaActor?.withdrawEventPartipication(
      removeCalendarEvent,
    )
    console.log('withDrawResp - konectaService111', withDrawResp)
    if (!withDrawResp || (withDrawResp as { err: string })?.err) {
      throw new Error((withDrawResp as { err: string })?.err)
    }
    const responsePayload = withDrawResp as { ok: string }
    return responsePayload.ok
  }

  async checkIfEventExistsForTheDay(
    checkEventExistsPayload: CheckEventExistsPayload,
  ): Promise<boolean> {
    const resp = await this.konectaActor?.checkIfEventExistsForTheDay(
      checkEventExistsPayload,
    )
    console.log('checkIfEventExistsForTheDay - konectaService111', resp)
    if (!resp || (resp as { err: Array<string> })?.err) {
      throw new Error(
        'Error response while checking if event exists on same day',
      )
    }
    const isEventExists = resp as { ok: boolean }
    return isEventExists.ok
  }
}

const konectaActorServiceInstance = new KonectaActorService()

export default konectaActorServiceInstance
