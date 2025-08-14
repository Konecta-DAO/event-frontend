import { AnyAction } from '@reduxjs/toolkit'
import update from 'immutability-helper'
import {
  RESET_CATEGORY,
  SET_ALL_CATEGORIES,
  SET_SEARCH_TEXT,
  SET_USER_PROFILE_SELECTED_TAB,
  SET_FEED_SELECTED_TAB,
  SET_EVENT_ATTENDEES,
  SET_SHOW_NEXT_PAGE,
  SET_SHOW_PREV_PAGE,
  SET_USER_EVENTS,
  TOGGLE_CATEGORY,
  TOGGLE_SHOW_ALL,
  SET_NON_USER_OFFERS,
  SET_NON_USER_REQUESTS,
  SET_USER_OFFERS,
  SET_USER_REQUESTS,
  SET_USER_EVENT_DETAIL,
  SET_EVENT_REQUEST_STATE,
  SET_EVENT_REQUEST_START,
  UPDATE_EVENT_REQUEST_PROGRESS,
  RESET_EVENT_REQUEST,
  SET_EVENT_REQUEST_SUCCESS,
  TRIGGER_FEED_SEARCH,
} from './eventActionTypes'
import {
  AllCategories,
  EventCategory,
  FeedTabsSubCategories,
  FeedTabsType,
} from 'utils/values'
import { EventRequestState, FeedFilterParams } from './eventAction'
import _ from 'lodash'
import { FeedResponsePayload, UserResponsePayload } from 'candid/ts/konecta.did'
import { EventMetadataResponsePayload } from 'candid/ts/user.did'
import { UserProfileTabTypes } from 'views/UserProfile/UserProfile'

interface FeedPageParams {
  currentPage: number
  showAll: boolean
}

type PID = string
interface EventState {
  userEvents: Array<EventMetadataResponsePayload>
  userEventDetail?: FeedResponsePayload
  userRequests: Record<PID, Array<FeedResponsePayload>>
  userOffers: Record<PID, Array<FeedResponsePayload>>
  otherRequests: Array<FeedResponsePayload>
  otherOffers: Array<FeedResponsePayload>
  feedFilters: Record<
    FeedTabsType,
    Record<FeedTabsSubCategories, FeedPageParams>
  >
  userProfileSelectedTab: UserProfileTabTypes
  feedSelectedTab: FeedTabsType
  eventAttendees: Array<UserResponsePayload>
  feedSearchText: string
  selectedCategories: Array<EventCategory>
  eventRequestState: EventRequestState
  eventRequestProgress: number
  eventRequestStartTime: number
  feedSearchTrigger: number
}

const initialSubCategoryParams = {
  ACTIVE: {
    currentPage: 0,
    showAll: false,
  },
  ON_THIS_WEEK: {
    currentPage: 0,
    showAll: false,
  },
  RECENT: {
    currentPage: 0,
    showAll: false,
  },
  HISTORY: {
    currentPage: 0,
    showAll: false,
  },
}

const initialState: EventState = {
  userEvents: [],
  userEventDetail: undefined,
  feedFilters: {
    SERVICE_REQUEST: initialSubCategoryParams,
    SERVICE_OFFERS: initialSubCategoryParams,
    // MY_REQUESTS: initialSubCategoryParams,
    // MY_OFFERS: initialSubCategoryParams,
  },
  feedSearchText: '',
  userProfileSelectedTab: 'MY_OFFERS',
  feedSelectedTab: 'SERVICE_REQUEST',
  eventAttendees: [],
  selectedCategories: [],
  userRequests: {},
  userOffers: {},
  otherRequests: [],
  otherOffers: [],
  eventRequestState: EventRequestState.idle,
  eventRequestProgress: 0,
  eventRequestStartTime: 0,
  feedSearchTrigger: 0,
}

export const eventReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_EVENTS: {
      const { userEvents } = payload
      return update(state, { userEvents: { $set: userEvents } })
    }

    case SET_USER_EVENT_DETAIL: {
      const { userEventDetail } = payload
      return update(state, { userEventDetail: { $set: userEventDetail } })
    }

    case SET_SEARCH_TEXT: {
      return update(state, { feedSearchText: { $set: payload } })
    }

    case SET_USER_PROFILE_SELECTED_TAB: {
      return update(state, { userProfileSelectedTab: { $set: payload } })
    }

    case SET_FEED_SELECTED_TAB: {
      return update(state, { feedSelectedTab: { $set: payload } })
    }

    case SET_EVENT_ATTENDEES: {
      return update(state, { eventAttendees: { $set: payload } })
    }

    case RESET_CATEGORY: {
      return update(state, {
        selectedCategories: { $set: [] },
        feedFilters: { $set: initialState.feedFilters },
      })
    }
    case SET_ALL_CATEGORIES: {
      return update(state, {
        selectedCategories: { $set: AllCategories },
        feedFilters: { $set: initialState.feedFilters },
      })
    }

    case TOGGLE_CATEGORY: {
      const toggleCategories = payload as EventCategory[]
      return update(state, {
        selectedCategories: {
          $apply: (categories: EventCategory[]) => {
            let newCategories = [...categories]
            toggleCategories.forEach((category) => {
              if (newCategories.includes(category)) {
                newCategories = newCategories.filter((c) => c !== category)
              } else {
                newCategories = [...newCategories, category]
              }
            })
            return newCategories
          },
        },
        feedFilters: { $set: initialState.feedFilters },
      })
    }

    case SET_SHOW_NEXT_PAGE: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      return update(state, {
        feedFilters: {
          [tabValue]: {
            [subCategoryValue]: {
              currentPage: { $apply: (v: number) => v + 1 },
            },
          },
        },
      })
    }

    case SET_SHOW_PREV_PAGE: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      return update(state, {
        feedFilters: {
          [tabValue]: {
            [subCategoryValue]: {
              currentPage: { $apply: (v: number) => v - 1 },
            },
          },
        },
      })
    }

    case TOGGLE_SHOW_ALL: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      return update(state, {
        feedFilters: {
          [tabValue]: {
            [subCategoryValue]: {
              showAll: { $apply: (v: boolean) => !v },
              currentPage: { $set: 0 },
            },
          },
        },
      })
    }

    case TRIGGER_FEED_SEARCH: {
      return update(state, {
        feedSearchTrigger: { $apply: (v: number) => v + 1 },
      })
    }

    case SET_USER_REQUESTS: {
      const { userRequests, pid } = payload
      return update(state, { userRequests: { [pid]: { $set: userRequests } } })
    }

    case SET_USER_OFFERS: {
      const { userOffers, pid } = payload
      return update(state, { userOffers: { [pid]: { $set: userOffers } } })
    }

    case SET_NON_USER_REQUESTS: {
      const { otherRequests } = payload
      return update(state, { otherRequests: { $set: otherRequests } })
    }

    case SET_NON_USER_OFFERS: {
      const { otherOffers } = payload
      return update(state, { otherOffers: { $set: otherOffers } })
    }

    case SET_EVENT_REQUEST_STATE: {
      const { eventRequestState } = payload
      return update(state, { eventRequestState: { $set: eventRequestState } })
    }

    case SET_EVENT_REQUEST_START: {
      const { startDate } = payload
      return update(state, {
        eventRequestState: { $set: EventRequestState.creating },
        eventRequestProgress: { $set: 0 },
        eventRequestStartTime: { $set: startDate },
      })
    }

    case SET_EVENT_REQUEST_SUCCESS: {
      return update(state, {
        eventRequestState: { $set: EventRequestState.success },
        eventRequestProgress: { $set: 100 },
      })
    }

    case UPDATE_EVENT_REQUEST_PROGRESS: {
      const elapsedTime = Date.now() - state.eventRequestStartTime
      const progress = Math.round(Math.min(99, (elapsedTime / 30000) * 99))

      return update(state, {
        eventRequestProgress: { $set: progress },
      })
    }

    case RESET_EVENT_REQUEST: {
      return update(state, {
        eventRequestState: { $set: EventRequestState.idle },
        eventRequestProgress: { $set: 0 },
        eventRequestStartTime: { $set: 0 },
      })
    }

    default:
      return state
  }
}