import {
  CREATE_EVENT,
  SET_USER_EVENTS,
  UPDATE_EVENT,
  SET_SHOW_NEXT_PAGE,
  SET_SHOW_PREV_PAGE,
  TOGGLE_SHOW_ALL,
  RESET_CATEGORY,
  TOGGLE_CATEGORY,
  SET_ALL_CATEGORIES,
  SET_SEARCH_TEXT,
  SET_NON_USER_OFFERS,
  SET_NON_USER_REQUESTS,
  SET_USER_OFFERS,
  SET_USER_REQUESTS,
  SET_USER_EVENT_DETAIL,
  SET_USER_PROFILE_SELECTED_TAB,
  SET_FEED_SELECTED_TAB,
  SET_EVENT_ATTENDEES,
  SET_EVENT_REQUEST_STATE,
  SET_EVENT_REQUEST_START,
  UPDATE_EVENT_REQUEST_PROGRESS,
  SET_EVENT_REQUEST_SUCCESS,
  RESET_EVENT_REQUEST,
} from './eventActionTypes'
import {
  EventCategory,
  FeedTabsSubCategories,
  FeedTabsType,
} from 'utils/values'

import { EventMetadataResponsePayload } from 'candid/ts/user.did.js'
import {
  FeedDetailsPayload,
  FeedResponsePayload,
  UserResponsePayload,
} from 'candid/ts/konecta.did.js'
import { UserProfileTabTypes } from 'views/UserProfile/UserProfile'

type PID = string

export const setUserEvents = (
  userEvents: Array<EventMetadataResponsePayload>,
) => {
  return {
    type: SET_USER_EVENTS,
    payload: {
      userEvents,
    },
  }
}

export const setUserEventDetail = (userEventDetail?: FeedDetailsPayload) => {
  return {
    type: SET_USER_EVENT_DETAIL,
    payload: {
      userEventDetail,
    },
  }
}

export const setFeedSearchText = (searchText: string) => {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText,
  }
}

export const setUserProfileSelectedTab = (
  userProfileSelectedTab: UserProfileTabTypes,
) => {
  return {
    type: SET_USER_PROFILE_SELECTED_TAB,
    payload: userProfileSelectedTab,
  }
}

export const setFeedSelectedTab = (feedSelectedTab: FeedTabsType) => {
  return {
    type: SET_FEED_SELECTED_TAB,
    payload: feedSelectedTab,
  }
}

export const setEventAttendees = (eventAttendees: UserResponsePayload[]) => {
  return {
    type: SET_EVENT_ATTENDEES,
    payload: eventAttendees,
  }
}

export const resetFilterCategories = () => {
  return {
    type: RESET_CATEGORY,
  }
}

export const setAllFilterCategories = () => {
  return {
    type: SET_ALL_CATEGORIES,
  }
}

export const toggleCategory = (categories: EventCategory[]) => {
  return {
    type: TOGGLE_CATEGORY,
    payload: categories,
  }
}

export interface FeedFilterParams {
  tabValue: FeedTabsType
  subCategoryValue: FeedTabsSubCategories
}

export const showNextPage = (feedFiltersParams: FeedFilterParams) => {
  return {
    type: SET_SHOW_NEXT_PAGE,
    payload: feedFiltersParams,
  }
}

export const showPrevPage = (feedFiltersParams: FeedFilterParams) => {
  return {
    type: SET_SHOW_PREV_PAGE,
    payload: feedFiltersParams,
  }
}

export const toggleShowAll = (feedFiltersParams: FeedFilterParams) => {
  return {
    type: TOGGLE_SHOW_ALL,
    payload: feedFiltersParams,
  }
}

export const setUserRequests = (
  userRequests: Array<FeedResponsePayload>,
  pid: PID,
) => {
  return {
    type: SET_USER_REQUESTS,
    payload: {
      userRequests,
      pid,
    },
  }
}

export const setUserOffers = (
  userOffers: Array<FeedResponsePayload>,
  pid: PID,
) => {
  return {
    type: SET_USER_OFFERS,
    payload: {
      userOffers,
      pid,
    },
  }
}

export const setUserRequestsApartFromMe = (
  otherRequests: Array<FeedResponsePayload>,
) => {
  return {
    type: SET_NON_USER_REQUESTS,
    payload: {
      otherRequests,
    },
  }
}

export const setUserOffersApartFromMe = (
  otherOffers: Array<FeedResponsePayload>,
) => {
  return {
    type: SET_NON_USER_OFFERS,
    payload: {
      otherOffers,
    },
  }
}

export enum EventRequestState {
  creating = 'creating',
  success = 'success',
  error = 'error',
  idle = 'idle',
}

export const setEventRequestState = (
  eventRequestState: EventRequestState | null,
) => {
  return {
    type: SET_EVENT_REQUEST_STATE,
    payload: {
      eventRequestState,
    },
  }
}

export const setEventRequestStart = (startDate: number) => {
  return {
    type: SET_EVENT_REQUEST_START,
    payload: {
      startDate,
    },
  }
}

export const updateEventRequestProgress = () => {
  return {
    type: UPDATE_EVENT_REQUEST_PROGRESS,
    payload: {},
  }
}

export const setEventRequestSuccess = () => {
  return {
    type: SET_EVENT_REQUEST_SUCCESS,
  }
}

export const resetEventRequest = () => {
  return {
    type: RESET_EVENT_REQUEST,
  }
}
