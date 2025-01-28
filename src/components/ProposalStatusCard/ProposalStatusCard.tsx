import React, { useState } from 'react'
import styles from './Styles.module.css'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'

export type ProposalStatus = 'Applied' | 'Accepted' | 'Declined'

export interface Proposal {
  eventId: string
  eventName: string
  eventCreator: string
  lastUpdatedAt: bigint
  status: ProposalStatus
  note: string
  location: string
}

export type ProposalStatusCardProps = Proposal & {
  onViewEventClick: (eventId: string) => void
}

interface StatusTagProps {
  status: ProposalStatus
}

const StatusTagLabel: Record<ProposalStatus, string> = {
  Applied: 'Applied',
  Accepted: 'Accepted',
  Declined: 'Declined',
}

const StatusTag = (props: StatusTagProps) => {
  const { status } = props
  return (
    <div className={styles.statusTag} data-status={status}>
      {StatusTagLabel[props.status]}
    </div>
  )
}

const ViewEventButton = (props: { isActive: boolean; onClick: () => void }) => {
  return (
    <button
      className={styles.viewEventButton}
      data-active={props.isActive}
      onClick={props.onClick}
    >
      View event
    </button>
  )
}

const ProposalStatusCard = (props: ProposalStatusCardProps) => {
  const {
    eventId,
    status,
    eventName,
    eventCreator,
    note,
    lastUpdatedAt,
    onViewEventClick,
  } = props
  const [isActive, setIsActive] = useState(false)

  const toActive = () => setIsActive(true)
  const toInActive = () => setIsActive(false)
  const toggleActive = () => setIsActive((p) => !p)

  return (
    <article
      data-active={isActive}
      data-status={status}
      className={styles['proposal-status-card']}
      onMouseEnter={toActive}
      onMouseLeave={toInActive}
      onClick={toggleActive}
    >
      <div className="flex flex-row justify-between items-center gap-[12px] w-full">
        <StatusTag status={status} />
        <span className={styles.lastUpdatedAt}>
          {getMomentFromNanoSeconds(lastUpdatedAt).format('MMM DD, YYYY')}
          <span className={styles.lastUpdatedAtTime}>
            {getMomentFromNanoSeconds(lastUpdatedAt).format(' hh:mm A')}
          </span>
        </span>
      </div>
      <div className={styles.cardDetails}>
        <h2 className={styles.eventName}>{eventName}</h2>
        <p className={styles.eventCreator}>By {eventCreator}</p>
        <p className={styles.note} data-active={isActive}>
          {note}
        </p>
      </div>
      <ViewEventButton
        isActive={isActive}
        onClick={() => {
          onViewEventClick(eventId)
        }}
      />
    </article>
  )
}

export default ProposalStatusCard
