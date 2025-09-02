import { UnknownAction } from '@reduxjs/toolkit'
import { SET_LOADING } from './appStateActionTypes.tsx'

interface AuthState {
  isLoading: boolean
}
const initialState: AuthState = { isLoading: false }

export const appStateReducer = (
  state: AuthState = initialState,
  action: UnknownAction,
): AuthState => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING: {
      const { value } = payload as { value: boolean }
      return { ...state, isLoading: value }
    }
    default:
      return state
  }
}