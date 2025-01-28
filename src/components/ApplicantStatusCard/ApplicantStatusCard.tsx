/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import styles from './Styles.module.css'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import { UserPayload } from 'candid/ts/index.did'
import { Modal } from '@mui/material'
import _ from 'lodash'
import userActorServiceInstance from 'services/userService'
import { CloseOutlined } from '@mui/icons-material'
import LinkToUserProfile from 'components/LinkToUserProfile/LinkToUserProfile'
import { Avatar, AvatarGroup } from '@mui/joy'

type UserPayloadData = UserPayload & {
  timestamp: bigint
}

export interface UserApplicants {
  event_id: string
  event_name: string
  event_description: string
  users: UserPayloadData[]
}

export type ApplicantsStatusCardProps = UserApplicants & {
  onViewEventClick: (eventId: string) => void
}

interface ApplicantListProps {
  applicants: UserPayloadData[]
  handleClose: () => void
}

interface ApplicantCardProps {
  applicant: UserPayloadData
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

const ApplicantCard = ({ applicant }: ApplicantCardProps) => {
  const { username, firstname, lastname, profilepic, canister_id, timestamp } =
    applicant

  return (
    <div className="flex flex-row justify-start items-center gap-[10px] md:px-[10px]">
      <LinkToUserProfile username={username} openInNewTab={true}>
        <Avatar
          src={userActorServiceInstance.getUserImageUrl(
            canister_id.toString(),
            profilepic,
          )}
        />
      </LinkToUserProfile>
      <span className="flex flex-1">
        {firstname} {lastname}
      </span>
      <span className="flex flex-1">
        <span className={styles.lastUpdatedAt}>
          {getMomentFromNanoSeconds(BigInt(timestamp)).format('MMM DD, YYYY')}
          <span className={styles.lastUpdatedAtTime}>
            {getMomentFromNanoSeconds(BigInt(timestamp)).format(' hh:mm A')}
          </span>
        </span>
      </span>
    </div>
  )
}

const ApplicantList = ({ applicants, handleClose }: ApplicantListProps) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full text-white">
      <div
        className={
          'flex flex-row justify-between items-start gap-[32px] text-center md:text-left mx-[24px] md:mx-[32px] pb-[16px] pt-[20px] border-b-[1px] border-b-[white]/5'
        }
      >
        <div className="flex flex-col flex-1 gap-[4px] md:gap-[0px]">
          <h2 className={'ty-title'}>Applicants</h2>
          <p className="text-[#BCBCC2] ty-text-3">
            These are the users who have applied for your event.
          </p>
        </div>
        <button
          className="md:flex hidden btn-icon btn-secondary"
          onClick={handleClose}
        >
          <CloseOutlined />
        </button>
      </div>
      <h3 className="my-[16px] px-[24px] md:px-[32px] text-[#FFFFFF]/70 ty-text-3">
        Applicants{' '}
        <span className="bg-[#337FF51A]/10 px-[6px] rounded-[2px] font-[500] text-[#337FF5CC]/80 text-[12px] leading-[18px]">
          {applicants.length}
        </span>
      </h3>
      <ul className="flex flex-col flex-1 gap-[10px] md:gap-[12px] px-[24px] md:px-[32px] pb-[24px] md:pb-[32px] overflow-y-scroll scrollbar">
        {applicants.map((applicant, index) => {
          const { id, firstname, lastname, profilepic } = applicant
          return (
            <li key={id}>
              <ApplicantCard applicant={applicant} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const ApplicantStatusCard = (props: ApplicantsStatusCardProps) => {
  const { event_id, event_name, event_description, users, onViewEventClick } =
    props
  const [isActive, setIsActive] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const toActive = () => setIsActive(true)
  const toInActive = () => setIsActive(false)
  const toggleActive = () => setIsActive((p) => !p)

  const visibleUsers = _.slice(users, 0, 1)
  const moreCount = users.length - visibleUsers.length

  const handleShowModal = () => {
    setIsModalVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <article
        data-active={isActive}
        className={styles['applicant-status-card']}
        onMouseEnter={toActive}
        onMouseLeave={toInActive}
        onClick={toggleActive}
      >
        <div className="flex flex-row justify-between items-center gap-[12px] w-full">
          <h2 className={styles.eventName}>{event_name}</h2>
          {/* <span className={styles.lastUpdatedAt}>
            {getMomentFromNanoSeconds(BigInt(1731688788000000000)).format(
              'MMM DD, YYYY',
            )}
            <span className={styles.lastUpdatedAtTime}>
              {getMomentFromNanoSeconds(BigInt(1731688788000000000)).format(
                ' hh:mm A',
              )}
            </span>
          </span> */}
        </div>
        {/* <div className={styles.cardDetails}> */}
        {/* <p className={styles.eventCreator}>By {eventCreator}</p> */}
        {/* <p className={styles.note} data-active={isActive}>
          {note}
        </p> */}
        {/* </div> */}
        {users.length > 0 ? (
          <div className="flex flex-row justify-between items-center gap-[12px] w-full">
            <button
              className="flex flex-row justify-start items-center bg-[white]/5 hover:bg-[white]/10 py-[2px] rounded-[28px] cursor-pointer"
              onClick={handleShowModal}
            >
              <AvatarGroup
                size="sm"
                sx={{
                  '--Avatar-size': '28px',
                  '--Avatar-ringSize': '0px',
                  borderWidth: 0,
                }}
              >
                {visibleUsers.map(({ id, canister_id, profilepic }) => {
                  return (
                    <Avatar
                      key={id}
                      src={userActorServiceInstance.getUserImageUrl(
                        canister_id.toString(),
                        profilepic,
                      )}
                    />
                  )
                })}
              </AvatarGroup>
              {moreCount > 0 ? (
                <span className="px-[8px] text-[#FFFFFF99] text-[14px]">
                  +{moreCount}
                </span>
              ) : null}
            </button>
          </div>
        ) : (
          // </div>
          <p className={styles.noApplicants}>No applicants</p>
        )}
        <ViewEventButton
          isActive={isActive}
          onClick={() => {
            onViewEventClick(event_id)
          }}
        />
      </article>
      <Modal open={isModalVisible} onClose={handleCloseModal}>
        <div className="top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%]">
          {/* {isLoading ? (
              <div className="z-[20000] absolute-center">
                <Spinner size="small" />
              </div>
            ) : null} */}
          <div className="bg-[#201F34] rounded-[12px] w-[50vW] min-w-[400px] h-[80vh]">
            <ApplicantList applicants={users} handleClose={handleCloseModal} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ApplicantStatusCard
