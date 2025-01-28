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

// eslint-disable-next-line no-extend-native
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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
