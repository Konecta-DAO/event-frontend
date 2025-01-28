import _ from 'lodash'
import qs from 'query-string'
import { Location } from 'react-router-dom'

type URLMetadata =
  | {
      type: 'EVENT_FEEDBACK'
      userId: string
      eventId: string
    }
  | {
      type: 'ONBOARDING' // for example to demonstrate typescript usage here
      step: number
    }

const checkUrlParamTypeValidity = (urlParams: Record<string, any>) => {
  return _.includes(['EVENT_FEEDBACK', 'ONBOARDING'], urlParams.type)
}

export const getRedirectUrl = (
  location: Location<any>,
  isAuthenticated: boolean,
): {
  redirectPath: string
  shouldRedirect: boolean
} => {
  const targetPath = location.pathname

  // urlParams will contain metadata with inbound link to determine where in our app it should navigate to
  const urlParams = qs.parse(location.search) as unknown as URLMetadata

  const hasValidUrlParamType = checkUrlParamTypeValidity(urlParams)

  const metadata: Record<string, any> = {}

  if (targetPath !== '/') {
    // if the user was intending to go to targetPath keep track of it in redirectTo
    metadata.redirectTo = targetPath
  }

  if (urlParams.type === 'EVENT_FEEDBACK') {
    metadata.redirectTo = `/event/${urlParams.eventId}?feedback`
  }

  const searchParamString = qs.stringify(metadata)

  const redirectUrlString = isAuthenticated
    ? metadata.redirectTo
    : '/login' + (searchParamString ? `?${searchParamString}` : '')

  return {
    shouldRedirect: !isAuthenticated || hasValidUrlParamType,
    redirectPath: redirectUrlString,
  }
}
