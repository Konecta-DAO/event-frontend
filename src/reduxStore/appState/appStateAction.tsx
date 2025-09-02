import { SET_LOADING } from './appStateActionTypes.tsx'

export const setIsAppLoading = (value: boolean) => {
  return {
    type: SET_LOADING,
    payload: {
      value,
    },
  }
}
