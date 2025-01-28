import { Actor, HttpAgent, HttpAgentOptions, Identity } from '@dfinity/agent'
import { idlFactory as EventFactory } from '../candid/js/event.did.js'
import { _SERVICE as EventActor } from '../candid/ts/event.did.js'
import { UserPayload } from 'entity/UserModel'
import { UserRequestModel } from 'entity/UserRequestModel.js'
import { DelegationIdentity } from '@dfinity/identity'
import {
  CreateEventInputs,
  EventRequestModel,
} from 'entity/EventRequestModel.js'
import konectaActorServiceInstance from './konectaService'
import { Principal } from '@dfinity/principal'
import { EventType } from 'utils/values.js'
import indexActorServiceInstance from './indexService'
import { FileOutputType } from 'entity/FileOutputType.js'
import { EventAttendeeActions } from 'entity/EventAttendeeActions.js'
import {
  EventRequestPayload,
  FeedResponsePayload,
} from 'candid/ts/konecta.did.js'
import { participationTypes } from './values'

class EventActorService {
  eventActor: EventActor | undefined

  constructor() {
    this.eventActor = undefined
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
      this.eventActor = Actor.createActor(EventFactory, {
        agent,
        canisterId,
      })

      return true
    } catch (e) {
      console.error('initEventActor error', e)
      return false
    }
  }

  getActor(): undefined | EventActor {
    return this.eventActor
  }

  async getEventDetailsByUserPrincipal(): Promise<undefined | any> {
    if (!this.eventActor) {
      return undefined
    }

    const userEventsResp =
      await this.eventActor?.getEventDetailsByUserPrincipal()
    // if (userEventsResponse.length === 0) {
    //   return undefined
    // }
    if (!userEventsResp || (userEventsResp as { err: Array<string> })?.err) {
      throw new Error(
        'Error response while fetching event details by user principal',
      )
    }
    return userEventsResp
  }

  async createEvent(
    principalId: string,
    eventType: EventType,
    userCanisterId: string,
    eventReq: EventRequestModel,
    data: CreateEventInputs,
  ): Promise<undefined | any> {
    if (!this.eventActor) {
      return
    }
    console.log(
      'eventType - userCanisterId - data - eventReq - createEvent - eventService111',
      eventType,
      userCanisterId,
      data,
      eventReq,
    )

    const eventId = await this.eventActor.createEvent(userCanisterId, eventReq)
    console.log('eventId - createEvent - eventService111', eventId)

    const consultationsData =
      data.consultations.length > 0
        ? data.consultations.split(',').map((text) => text.trim())
        : []

    const konectaEventReq: EventRequestPayload = {
      event_name: eventReq.name,
      event_description: eventReq.description,
      status: eventReq.status,
      categories: data.categories,
      token_amount: [Number(data.price)],
      price_token:
        data.priceCourse === 'ICP'
          ? [{ ICP: null }]
          : data.priceCourse === 'FREE'
          ? [{ FREE: null }]
          : [{ CKBTC: null }],
      interests: data.interests.length > 0 ? [data.interests] : [],
      metadata: [],
      end_date: eventReq.end_date,
      start_date: eventReq.start_date,
      user_id: [principalId],
      consultations: consultationsData.length > 0 ? [consultationsData] : [],
      expertise:
        data.yearsOfExperience.length > 0
          ? [data.yearsOfExperience.trim()]
          : [],
      event_id: eventId,
      event_type: eventType === 'request' ? { Request: null } : { Offer: null },
      showcase_link:
        typeof data.showcaselink !== 'undefined' ? [data.showcaselink] : [],
      recording_visibility:
        data.priceCourse === 'FREE' ? [{ Public: null }] : [],
      is_recording_available: [false],
      participation_type:
        data.participationType === participationTypes[0]
          ? [{ PersonToPerson: null }]
          : [{ PersonToMultiplePersons: null }],
    }
    console.log(
      'konectaEventReq - createKonectaEvent - eventService111',
      konectaEventReq,
    )

    const createKonectaEventResp =
      await konectaActorServiceInstance.createKonectaEvent(
        userCanisterId,
        konectaEventReq,
      )
    console.log(
      'createKonectaEventResp - createEvent - eventService111',
      createKonectaEventResp,
    )

    return { eventId, createKonectaEventResp }
  }

  async updateEvent(
    eventId: string,
    principalId: string,
    eventType: EventType,
    userCanisterId: string,
    eventReq: EventRequestModel,
    data: CreateEventInputs,
    userEventDetail: FeedResponsePayload | undefined,
  ): Promise<undefined | string> {
    if (!this.eventActor) {
      return
    }
    console.log(
      'eventType - userCanisterId - data - eventReq - updateEvent - userEventDetail - eventService111',
      eventType,
      userCanisterId,
      data,
      eventReq,
      userEventDetail,
    )

    const updateResp = await this.eventActor.updateEvent(
      userCanisterId,
      eventId,
      eventReq,
    )
    console.log('eventId - updateEvent - eventService111', eventId)

    if (!updateResp || (updateResp as { err: string })?.err) {
      throw new Error('Error response while updating event')
    }

    const consultationsData =
      data.consultations.length > 0
        ? data.consultations.split(',').map((text) => text.trim())
        : []

    const konectaEventReq: EventRequestPayload = {
      event_name: eventReq.name,
      event_description: eventReq.description,
      status: eventReq.status,
      categories: data.categories,
      token_amount: [Number(data.price)],
      price_token:
        data.priceCourse === 'ICP'
          ? [{ ICP: null }]
          : data.priceCourse === 'FREE'
          ? [{ FREE: null }]
          : [{ CKBTC: null }],
      interests: data.interests.length > 0 ? [data.interests] : [],
      metadata: [],
      end_date: eventReq.end_date,
      start_date: eventReq.start_date,
      user_id: [principalId],
      consultations: consultationsData.length > 0 ? [consultationsData] : [],
      expertise:
        data.yearsOfExperience.length > 0
          ? [data.yearsOfExperience.trim()]
          : [],
      event_id: eventId,
      event_type: eventType === 'request' ? { Request: null } : { Offer: null },
      showcase_link:
        typeof data.showcaselink !== 'undefined' ? [data.showcaselink] : [],
      recording_visibility:
        typeof userEventDetail !== 'undefined'
          ? userEventDetail.recording_visibility === 'Public'
            ? [{ Public: null }]
            : [{ Private: null }]
          : [],
      is_recording_available:
        typeof userEventDetail !== 'undefined'
          ? [userEventDetail.is_recording_available]
          : [],
      participation_type:
        data.participationType === 'PersonToPerson'
          ? [{ PersonToPerson: null }]
          : [{ PersonToMultiplePersons: null }],
    }
    console.log(
      'konectaEventReq - updateKonectaEvent - eventService111',
      konectaEventReq,
    )

    const updateEventResp =
      await konectaActorServiceInstance.updateKonectaEvent(
        userCanisterId,
        konectaEventReq,
      )
    console.log(
      'updateEventResp - updateEvent - eventService111',
      updateEventResp,
    )

    return eventId
  }

  async getFile(fileId: string): Promise<undefined | any> {
    const fileDetails = await this.eventActor?.getFile(fileId)
    console.log(
      'fileDetails - getFile - fileId -  eventService111',
      fileId,
      fileDetails,
    )
    return fileDetails
  }

  getEventCoverImageUrl(fileId: string): string {
    const eventCanisterId = indexActorServiceInstance.eventCanisterId
    return `https://${eventCanisterId}.raw.icp0.io/d3?file_id=${fileId}`
  }

  async getAttendeesByActionWithUserDetails(
    evendId: string,
    action: EventAttendeeActions,
  ): Promise<undefined | any> {
    if (!this.eventActor) {
      return undefined
    }
    console.log(
      'getAttendeesByActionWithUserDetails - eventService - eventId',
      evendId,
    )
    const attendeesIds =
      await this.eventActor?.getAttendeesByActionWithUserDetails(
        evendId,
        action,
      )

    if (!attendeesIds || (attendeesIds as { err: Array<string> })?.err) {
      throw new Error('Error response while fetching attendees by action')
    }
    return attendeesIds
  }
}

const eventActorServiceInstance = new EventActorService()

export default eventActorServiceInstance
