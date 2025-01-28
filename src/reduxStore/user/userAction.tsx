import { UserPayload } from 'entity/UserModel'
import { UPDATE_USER_PROFILE } from './userActionTypes'

export const saveUserProfile = (userProfile: UserPayload) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: {
      userProfile,
    },
  }
}
