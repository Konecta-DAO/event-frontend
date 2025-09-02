import { AnyAction } from '@reduxjs/toolkit'
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
} from './eventActionTypes.tsx'
import {
  AllCategories,
  EventCategory,
  FeedTabsSubCategories,
  FeedTabsType,
} from 'utils/values.tsx'
import { EventRequestState, FeedFilterParams } from './eventAction.tsx'
import type {
  FeedResponsePayload,
  UserResponsePayload,
} from 'candid/ts/konecta.did.d.ts'
import type { EventMetadataResponsePayload } from 'candid/ts/user.did.d.ts'
import { UserProfileTabTypes } from 'views/UserProfile/UserProfile.tsx'

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

// --- Factories so nested objects aren't shared by reference ---
const makeSubCategoryParams = (): Record<
  FeedTabsSubCategories,
  FeedPageParams
> => ({
  ACTIVE: { currentPage: 0, showAll: false },
  ON_THIS_WEEK: { currentPage: 0, showAll: false },
  RECENT: { currentPage: 0, showAll: false },
  HISTORY: { currentPage: 0, showAll: false },
})

const makeInitialFeedFilters = (): EventState['feedFilters'] => ({
  SERVICE_REQUEST: makeSubCategoryParams(),
  SERVICE_OFFERS: makeSubCategoryParams(),
})

const initialState: EventState = {
  userEvents: [],
  userEventDetail: undefined,
  feedFilters: makeInitialFeedFilters(),
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

export const eventReducer = (
  state: EventState = initialState,
  action: AnyAction
): EventState => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_EVENTS: {
      const { userEvents } = payload as { userEvents: EventState['userEvents'] }
      return { ...state, userEvents }
    }

    case SET_USER_EVENT_DETAIL: {
      const { userEventDetail } = payload as {
        userEventDetail?: FeedResponsePayload
      }
      return { ...state, userEventDetail }
    }

    case SET_SEARCH_TEXT: {
      return { ...state, feedSearchText: payload as string }
    }

    case SET_USER_PROFILE_SELECTED_TAB: {
      return {
        ...state,
        userProfileSelectedTab: payload as UserProfileTabTypes,
      }
    }

    case SET_FEED_SELECTED_TAB: {
      return { ...state, feedSelectedTab: payload as FeedTabsType }
    }

    case SET_EVENT_ATTENDEES: {
      return {
        ...state,
        eventAttendees: payload as Array<UserResponsePayload>,
      }
    }

    case RESET_CATEGORY: {
      return {
        ...state,
        selectedCategories: [],
        feedFilters: makeInitialFeedFilters(),
      }
    }

    case SET_ALL_CATEGORIES: {
      return {
        ...state,
        selectedCategories: AllCategories,
        feedFilters: makeInitialFeedFilters(),
      }
    }

    case TOGGLE_CATEGORY: {
      const toggleCategories = payload as EventCategory[]
      const current = new Set(state.selectedCategories)
      for (const c of toggleCategories) {
        if (current.has(c)) current.delete(c)
        else current.add(c)
      }
      return {
        ...state,
        selectedCategories: Array.from(current),
        feedFilters: makeInitialFeedFilters(),
      }
    }

    case SET_SHOW_NEXT_PAGE: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      const curr = state.feedFilters[tabValue][subCategoryValue]
      return {
        ...state,
        feedFilters: {
          ...state.feedFilters,
          [tabValue]: {
            ...state.feedFilters[tabValue],
            [subCategoryValue]: {
              ...curr,
              currentPage: curr.currentPage + 1,
            },
          },
        },
      }
    }

    case SET_SHOW_PREV_PAGE: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      const curr = state.feedFilters[tabValue][subCategoryValue]
      return {
        ...state,
        feedFilters: {
          ...state.feedFilters,
          [tabValue]: {
            ...state.feedFilters[tabValue],
            [subCategoryValue]: {
              ...curr,
              currentPage: curr.currentPage - 1,
            },
          },
        },
      }
    }

    case TOGGLE_SHOW_ALL: {
      const { tabValue, subCategoryValue } = payload as FeedFilterParams
      const curr = state.feedFilters[tabValue][subCategoryValue]
      return {
        ...state,
        feedFilters: {
          ...state.feedFilters,
          [tabValue]: {
            ...state.feedFilters[tabValue],
            [subCategoryValue]: {
              ...curr,
              showAll: !curr.showAll,
              currentPage: 0,
            },
          },
        },
      }
    }

    case TRIGGER_FEED_SEARCH: {
      return { ...state, feedSearchTrigger: state.feedSearchTrigger + 1 }
    }

    case SET_USER_REQUESTS: {
      const { userRequests, pid } = payload as {
        userRequests: Array<FeedResponsePayload>
        pid: PID
      }
      return {
        ...state,
        userRequests: { ...state.userRequests, [pid]: userRequests },
      }
    }

    case SET_USER_OFFERS: {
      const { userOffers, pid } = payload as {
        userOffers: Array<FeedResponsePayload>
        pid: PID
      }
      return {
        ...state,
        userOffers: { ...state.userOffers, [pid]: userOffers },
      }
    }

    case SET_NON_USER_REQUESTS: {
      const { otherRequests } = payload as {
        otherRequests: Array<FeedResponsePayload>
      }
      return { ...state, otherRequests }
    }

    case SET_NON_USER_OFFERS: {
      const { otherOffers } = payload as {
        otherOffers: Array<FeedResponsePayload>
      }
      return { ...state, otherOffers }
    }

    case SET_EVENT_REQUEST_STATE: {
      const { eventRequestState } = payload as {
        eventRequestState: EventRequestState
      }
      return { ...state, eventRequestState }
    }

    case SET_EVENT_REQUEST_START: {
      const { startDate } = payload as { startDate: number }
      return {
        ...state,
        eventRequestState: EventRequestState.creating,
        eventRequestProgress: 0,
        eventRequestStartTime: startDate,
      }
    }

    case SET_EVENT_REQUEST_SUCCESS: {
      return {
        ...state,
        eventRequestState: EventRequestState.success,
        eventRequestProgress: 100,
      }
    }

    case UPDATE_EVENT_REQUEST_PROGRESS: {
      const elapsedTime = Date.now() - state.eventRequestStartTime
      const progress = Math.round(Math.min(99, (elapsedTime / 30000) * 99))
      return { ...state, eventRequestProgress: progress }
    }

    case RESET_EVENT_REQUEST: {
      return {
        ...state,
        eventRequestState: EventRequestState.idle,
        eventRequestProgress: 0,
        eventRequestStartTime: 0,
      }
    }

    default:
      return state
  }
}
