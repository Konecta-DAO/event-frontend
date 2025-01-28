import { SET_LOADING } from './appStateActionTypes'

export const setIsAppLoading = (value: boolean) => {
  return {
    type: SET_LOADING,
    payload: {
      value,
    },
  }
}
