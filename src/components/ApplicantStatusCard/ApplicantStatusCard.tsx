import { CloseOutlined } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { Avatar, AvatarGroup } from '@mui/joy'
import {
  ApplicantDetailsPayload,
  ApplicationStatusOfMyCreatedEvents,
} from 'candid/ts/konecta.did'
import LinkToUserProfile from 'components/LinkToUserProfile/LinkToUserProfile'
import _ from 'lodash'
import { useState } from 'react'
import userActorServiceInstance from 'services/userService'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import styles from './Styles.module.css'

export type ApplicantsStatusCardProps = ApplicationStatusOfMyCreatedEvents & {
  onViewEventClick: (eventId: string) => void
}

interface ApplicantListProps {
  applicants: ApplicantDetailsPayload[]
  handleClose: () => void
}

interface ApplicantCardProps {
  applicant: ApplicantDetailsPayload
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
  const { userData, applicationTimestamp } = applicant
  const { username, firstname, lastname, profilepic, canister_id } = userData

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
          {getMomentFromNanoSeconds(BigInt(applicationTimestamp)).format(
            'MMM DD, YYYY',
          )}
          <span className={styles.lastUpdatedAtTime}>
            {getMomentFromNanoSeconds(BigInt(applicationTimestamp)).format(
              ' hh:mm A',
            )}
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
        {applicants.map((applicant, index) => (
          <li key={applicant.userData.principal_id.toString()}>
            <ApplicantCard applicant={applicant} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const ApplicantStatusCard = (props: ApplicantsStatusCardProps) => {
  const {
    event_id,
    event_name,
    applied_users_details,
    onViewEventClick,
  } = props
  const [isActive, setIsActive] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const toActive = () => setIsActive(true)
  const toInActive = () => setIsActive(false)
  const toggleActive = () => setIsActive((p) => !p)

  const visibleUsers = _.slice(applied_users_details, 0, 1)
  const moreCount = applied_users_details.length - visibleUsers.length

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
        </div>
        {applied_users_details.length > 0 ? (
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
                {visibleUsers.map(({ userData }) => {
                  return (
                    <Avatar
                      key={userData.principal_id}
                      src={userActorServiceInstance.getUserImageUrl(
                        userData.canister_id.toString(),
                        userData.profilepic,
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
          <div className="bg-[#201F34] rounded-[12px] w-[50vw] min-w-[400px] h-[80vh]">
            <ApplicantList
              applicants={applied_users_details}
              handleClose={handleCloseModal}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ApplicantStatusCard