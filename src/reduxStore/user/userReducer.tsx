import { AnyAction } from 'redux'
import { UPDATE_USER_PROFILE } from './userActionTypes.tsx'
import type { UserPayload } from 'candid/ts/user.did.d.ts'

interface UserState {
  userProfile?: UserPayload
}

const initialState: UserState = {
  userProfile: undefined,
}

export const userReducer = (
  state: UserState = initialState,
  action: AnyAction
): UserState => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_USER_PROFILE: {
      const { userProfile } = payload as { userProfile?: UserPayload }
      return { ...state, userProfile } // immutable object spread
    }
    default:
      return state
  }
}
