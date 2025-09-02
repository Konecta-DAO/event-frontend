import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/authReducer.tsx'
import { userReducer } from './user/userReducer.tsx'
import { eventReducer } from './event/eventReducer.tsx'
import { appStateReducer } from './appState/appStateReducer.tsx'

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
