import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/authReducer'
import { userReducer } from './user/userReducer'
import { eventReducer } from './event/eventReducer'
import { appStateReducer } from './appState/appStateReducer'

const appReducer = {
  appState: appStateReducer,
  auth: authReducer,
  user: userReducer,
  event: eventReducer,
}

declare global {
  interface BigInt {
    toJSON: () => string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
