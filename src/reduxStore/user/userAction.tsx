import type { UserPayload } from 'candid/ts/user.did.d.ts'
import { UPDATE_USER_PROFILE } from './userActionTypes.tsx'

export const saveUserProfile = (userProfile: UserPayload) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: {
      userProfile,
    },
  }
}
