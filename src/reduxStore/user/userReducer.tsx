import { AnyAction } from 'redux'
import { UPDATE_USER_PROFILE } from './userActionTypes'
import update from 'immutability-helper'
import { UserPayload } from 'candid/ts/user.did'

interface UserState {
  userProfile?: UserPayload
}
const initialState: UserState = {
  userProfile: undefined,
}

export const userReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_USER_PROFILE: {
      const { userProfile } = payload
      return update(state, { userProfile: { $set: userProfile } })
    }

    default: {
      return state
    }
  }
}
