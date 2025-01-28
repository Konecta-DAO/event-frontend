import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as Sentry from '@sentry/react'

import './index.css'
import './assets/main.css'
import { Provider } from 'react-redux'
import store from './reduxStore/store'

// initialize the Sentry React SDK as soon as possible
Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN })
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
