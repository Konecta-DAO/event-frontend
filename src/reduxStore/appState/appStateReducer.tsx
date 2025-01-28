import { UnknownAction } from '@reduxjs/toolkit'
import update from 'immutability-helper'
import { SET_LOADING } from './appStateActionTypes'

interface AuthState {
  isLoading: boolean
}

const initialState: AuthState = {
  isLoading: false,
}

export const appStateReducer = (
  state = initialState,
  action: UnknownAction,
) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING: {
      const { value } = payload as { value: boolean }
      return update(state, { isLoading: { $set: value } })
    }
    default:
      return state
  }
}
