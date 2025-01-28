import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LinkToUserProfileProps {
  username: string
  openInNewTab?: boolean
  children: ReactNode
}

const LinkToUserProfile: React.FC<LinkToUserProfileProps> = (
  props: LinkToUserProfileProps,
) => {
  const { username, openInNewTab = false } = props
  return (
    <Link
      to={`/profile/${username}`}
      {...(openInNewTab
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      style={{ display: 'inline-block', width: 'fit-content' }}
    >
      {props.children}
    </Link>
  )
}

export default LinkToUserProfile
