import { AnyAction } from 'redux'
import { UPDATE_USER_PROFILE } from './userActionTypes'
import { UserPayload } from 'entity/UserModel'
import update from 'immutability-helper'

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
