import { Avatar, AvatarGroup } from '@mui/joy'
import { Drawer, Modal, Skeleton, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'

import styles from './style.module.css'

import { CloseOutlined } from '@mui/icons-material'
import UserIcon1 from 'assets/svg/user1.svg'

import LinkToUserProfile from 'components/LinkToUserProfile'
import Notification from 'components/Modals/Notifications'
import Spinner from 'components/Spinner'
import { useNavigate } from 'react-router'
import konectaActorServiceInstance from 'services/konectaService'
import userActorServiceInstance from 'services/userService'
import {
  ApplicantsWithUserDataPayload,
  FeedResponsePayload,
} from 'candid/ts/konecta.did'
import Emitter, { EventParams } from 'services/emitter'

interface AppliedUsersProp {
  event: FeedResponsePayload
}

type ProposalStatus = 'Accepted' | 'Applied' | 'Declined'

type ProposalWithStatus = ApplicantsWithUserDataPayload & {
  status: ProposalStatus
}

interface ProposalCardProps {
  proposal: ProposalWithStatus
  onAcceptProposal: (proposal: ProposalWithStatus) => void
  onDeclineProposal: (proposal: ProposalWithStatus) => void
  readOnlyMode: boolean
}

interface ProposalListProps {
  proposals: ProposalWithStatus[]
  handleClose: () => void
  onAcceptProposal: (proposal: ProposalWithStatus) => void
  onDeclineProposal: (proposal: ProposalWithStatus) => void
  hasBeenAccepted: boolean
}

interface NotificationProps {
  boldText: string
  smallText: (
    event: FeedResponsePayload,
    proposal: ProposalWithStatus,
  ) => string
  okText: string
  closeText: undefined | string
}

const NotificationConfig: Record<'APPLIED' | 'DECLINED', NotificationProps> = {
  APPLIED: {
    boldText: 'Proposal accepted',
    smallText: (event: FeedResponsePayload, proposal: ProposalWithStatus) =>
      `Congrats! You have accepted ${proposal.userData.firstname} ${proposal.userData.lastname} proposal for the “${event.name}” event`,
    okText: 'View Calendar',
    closeText: undefined,
  },
  DECLINED: {
    boldText: 'Declined proposal',
    smallText: (event: FeedResponsePayload, proposal: ProposalWithStatus) =>
      `You have declined ${proposal.userData.firstname} ${proposal.userData.lastname} proposal for the “${event.name}” event`,
    okText: 'View Calendar',
    closeText: 'Applied users',
  },
}

const ProposalCard = ({
  proposal,
  onAcceptProposal,
  onDeclineProposal,
  readOnlyMode,
}: ProposalCardProps) => {
  const { note, userData, status } = proposal

  const handleAcceptClick = () => {
    onAcceptProposal(proposal)
  }
  const handleDeclineClick = () => {
    onDeclineProposal(proposal)
  }

  return (
    <div className="flex flex-row justify-start items-start gap-[10px] md:px-[10px]">
      <LinkToUserProfile username={userData.username} openInNewTab={true}>
        <Avatar
          src={userActorServiceInstance.getUserImageUrl(
            userData.canister_id,
            userData.profilepic,
          )}
        />
      </LinkToUserProfile>
      <div className="flex flex-col flex-1 justify-start items-start gap-[10px] pb-[10px] md:pl-[10px]">
        <div className="flex flex-row gap-[5px] w-full">
          <div className="flex flex-col flex-1 gap-[5px]">
            <p className="flex flex-row font-[400] text-[18px] text-white leading-[18px]">
              <span className="flex flex-1">
                {userData.firstname} {userData.lastname}
              </span>
              {status !== 'Applied' || readOnlyMode ? (
                <span
                  data-status={status}
                  data-type={'proposal-card-status'}
                  className={styles.proposalCardStatusText}
                >
                  {status}
                </span>
              ) : null}
            </p>
            <p className="font-[400] text-[14px] text-[white]/60 leading-[22px]">
              {note}
            </p>
          </div>
          <p className="font-[400] text-[12px] text-[white]/60 leading-[20px]">
            {/* {moment().diff(getMomentFromNanoSeconds(proposal.appliedAt), 'weeks')} w */}
          </p>
        </div>
        {status === 'Applied' && !readOnlyMode ? (
          <div className="flex flex-row gap-[8px]">
            <button className="btn-primary btn-sm" onClick={handleAcceptClick}>
              Accept
            </button>
            <button
              className="btn-secondary btn-sm"
              onClick={handleDeclineClick}
            >
              Decline
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const ProposalList = ({
  proposals,
  handleClose,
  onAcceptProposal,
  onDeclineProposal,
  hasBeenAccepted,
}: ProposalListProps) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full text-white">
      <div
        className={
          'flex flex-row justify-between items-start gap-[32px] text-center md:text-left mx-[24px] md:mx-[32px] pb-[16px] pt-[20px] border-b-[1px] border-b-[white]/5'
        }
      >
        <div className="flex flex-col flex-1 gap-[4px] md:gap-[0px]">
          <h2 className={'ty-title'}>Applied users</h2>
          <p className="text-[#BCBCC2] ty-text-3">
            These are the users who have applied for your event. You can see
            their avatars, names, and descriptions of why they would be the best
            choice.
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
        Applied Users{' '}
        <span className="bg-[#337FF51A]/10 px-[6px] rounded-[2px] font-[500] text-[#337FF5CC]/80 text-[12px] leading-[18px]">
          {proposals.length}
        </span>
      </h3>
      <ul className="flex flex-col flex-1 gap-[10px] md:gap-[12px] px-[24px] md:px-[32px] pb-[24px] md:pb-[32px] overflow-y-scroll scrollbar">
        {proposals.map((item, index) => {
          // const { id, message, user, appliedAt } = item
          const { note, userData } = item
          return (
            <li key={userData.id}>
              <ProposalCard
                proposal={item}
                onAcceptProposal={onAcceptProposal}
                onDeclineProposal={onDeclineProposal}
                readOnlyMode={hasBeenAccepted}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const AppliedUsers = ({ event }: AppliedUsersProp) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [proposals, setProposals] = useState<ProposalWithStatus[] | undefined>(
    [],
  )
  const [isLoadingProposals, setIsLoadingProposals] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState<
    '' | 'APPLIED' | 'DECLINED'
  >('')

  const selectedProposal = useRef<ProposalWithStatus | undefined>()

  const navigate = useNavigate()

  const fetchProposals = useCallback(async () => {
    try {
      setIsLoadingProposals(true)
      const [appliedResponse, acceptedResponse, declinedResponse] =
        await Promise.all([
          konectaActorServiceInstance.getAppliedUsersByActionWithUserData(
            event.event_id,
            [{ Applied: null }],
          ),
          konectaActorServiceInstance.getAppliedUsersByActionWithUserData(
            event.event_id,
            [{ Accepted: null }],
          ),
          konectaActorServiceInstance.getAppliedUsersByActionWithUserData(
            event.event_id,
            [{ Declined: null }],
          ),
        ])
      console.log(
        'proposals - event - AppliedUsers111',
        event.event_id,
        appliedResponse,
        acceptedResponse,
        declinedResponse,
      )

      let allProposals: ProposalWithStatus[] = []
      if (typeof appliedResponse !== 'undefined') {
        console.log(
          'proposals - AppliedUsers111 - getAppliedUsersByActionWithUserData - applied proposals',
          appliedResponse,
        )
        const appliedProposals: ProposalWithStatus[] = _.map(
          appliedResponse,
          (obj) => ({ ...obj, status: 'Applied' }),
        )
        allProposals = _.concat(allProposals, appliedProposals)
      }
      if (typeof acceptedResponse !== 'undefined') {
        console.log(
          'proposals - AppliedUsers111 - getAppliedUsersByActionWithUserData - accepted proposals',
          acceptedResponse,
        )
        const acceptedProposals: ProposalWithStatus[] = _.map(
          acceptedResponse,
          (obj) => ({ ...obj, status: 'Accepted' }),
        )

        allProposals = _.concat(allProposals, acceptedProposals)
      }
      if (typeof declinedResponse !== 'undefined') {
        console.log(
          'proposals - AppliedUsers111 - getAppliedUsersByActionWithUserData - declined proposals',
          declinedResponse,
        )
        const declinedProposals: ProposalWithStatus[] = _.map(
          declinedResponse,
          (obj) => ({ ...obj, status: 'Declined' }),
        )
        allProposals = _.concat(allProposals, declinedProposals)
      }

      setProposals(allProposals)

      setIsLoadingProposals(false)
    } catch (e) {
      console.log('Error in fetching proposals - AppliedUsers111', e)
      setIsLoadingProposals(false)
    }
  }, [event.event_id])

  useEffect(() => {
    fetchProposals()
  }, [fetchProposals])

  useEffect(() => {
    const refreshProposalList = (params: EventParams) => {
      if (params.eventName === 'REFRESH_EVENT') {
        if (params.payload.eventId === event.event_id) {
          fetchProposals()
        }
      }
    }
    Emitter.on('REFRESH_EVENT', refreshProposalList)

    return () => {
      Emitter.off('REFRESH_EVENT', refreshProposalList)
    }
  }, [event.event_id, fetchProposals])

  const handleShowModal = () => {
    setIsModalVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const renderNotification = () => {
    return showSuccessNotification !== '' ? (
      <Notification
        isOpen={true}
        handleClose={(type) => {
          setShowSuccessNotification('')
          if (type === 'secondary-btn-click') {
            handleShowModal()
          }
        }}
        handleOk={() => {
          setShowSuccessNotification('')
          navigate('/calendar')
        }}
        iconID={2}
        okBtnColor={true}
        showCloseButton={true}
        boldText={NotificationConfig[showSuccessNotification].boldText}
        smallText={NotificationConfig[showSuccessNotification].smallText(
          event,
          selectedProposal.current as ProposalWithStatus,
        )}
        okText={NotificationConfig[showSuccessNotification].okText}
        closeText={NotificationConfig[showSuccessNotification].closeText}
        isFooterColumn={true}
      />
    ) : null
  }

  const triggerEventRefresh = useCallback(() => {
    Emitter.emit('REFRESH_EVENT', {
      eventName: 'REFRESH_EVENT',
      payload: { eventId: event.event_id },
    })
  }, [event.event_id])

  if (proposals === undefined) {
    return <>{renderNotification()}</>
  }

  const onAcceptProposal = async (proposal: ProposalWithStatus) => {
    try {
      console.log('Accepting proposal - AppliedUsers111', proposal)
      selectedProposal.current = proposal
      setIsLoading(true)

      const resp = await konectaActorServiceInstance.acceptUserApplication(
        proposal.userData.principal_id,
        event.event_id,
      )
      console.log('Accepting proposal resp - AppliedUsers111', resp)
      handleCloseModal()
      setIsLoading(false)
      setShowSuccessNotification('APPLIED')
      setProposals((prev) => {
        if (!prev) {
          return prev
        }

        const proposalIndex = _.findIndex(
          prev,
          ({ userData }) => userData.id === proposal.userData.id,
        )
        const updatedList = update(prev, {
          $apply: (prevArray: ProposalWithStatus[]) => {
            return _.map(prevArray, (prevObj, index) =>
              index === proposalIndex
                ? { ...prevObj, status: 'Accepted' as ProposalStatus }
                : { ...prevObj, status: 'Declined' as ProposalStatus },
            )
          },
        })
        return updatedList
      })
      triggerEventRefresh()
    } catch (e) {
      console.log('Error in accepting proposal - AppliedUsers111', e)
      setIsLoading(false)
    }
  }

  const onDeclineProposal = async (proposal: ProposalWithStatus) => {
    try {
      console.log('Declining proposal - AppliedUsers111', proposal)
      selectedProposal.current = proposal
      setIsLoading(true)

      const resp = await konectaActorServiceInstance.declineUserApplication(
        proposal.userData.principal_id,
        event.event_id,
      )
      console.log('Declining proposal resp - AppliedUsers111', resp)

      setProposals((prev) => {
        if (!prev) {
          return prev
        }

        const index = _.findIndex(
          prev,
          ({ userData }) => userData.id === proposal.userData.id,
        )
        const updatedList = update(prev, {
          [index]: { $merge: { status: 'Declined' } },
        })
        return updatedList
      })
      handleCloseModal()
      setIsLoading(false)
      setShowSuccessNotification('DECLINED')

      triggerEventRefresh()
    } catch (e) {
      console.log('Error in declining proposal - AppliedUsers111', e)
      setIsLoading(false)
    }
  }

  const visibleProposals = _.slice(proposals, 0, 3)
  const moreCount = proposals.length - visibleProposals.length

  return (
    <>
      <div className="flex flex-col items-start gap-[8px] md:gap-[12px] text-white">
        <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
          Applied users
        </p>

        {isLoadingProposals ? (
          <div className="flex flex-row">
            {Array(4)
              .fill({})
              .map((item, index) => (
                <Skeleton key={index} variant="circular" className="mx-[-5px]">
                  <Avatar />
                </Skeleton>
              ))}
          </div>
        ) : proposals.length > 0 ? (
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
              {visibleProposals.map(
                ({ userData: { profilepic, id, canister_id: canisterId } }) => {
                  return (
                    <Avatar
                      key={id}
                      src={userActorServiceInstance.getUserImageUrl(
                        canisterId,
                        profilepic,
                      )}
                    />
                  )
                },
              )}
            </AvatarGroup>
            {moreCount > 0 ? (
              <span className="px-[8px] text-[#FFFFFF99] text-[14px]">
                +{moreCount}
              </span>
            ) : null}
          </button>
        ) : (
          <p className="text-[13px] text-white md:text-[18px]">
            No one has applied so far
          </p>
        )}
      </div>
      {isonTabletOrMobile ? (
        <Drawer
          open={isModalVisible}
          onClose={handleCloseModal}
          sx={{
            '& .MuiDrawer-paper': {
              background: '#201F34',
              marginTop: '20px',
            },
          }}
          anchor="bottom"
        >
          <div className="flex flex-col rounded-t-[12px] max-h-[90vh]">
            {isLoading ? (
              <div className="z-[20000] absolute-center">
                <Spinner size="small" />
              </div>
            ) : null}
            <div className="flex flex-row justify-center h-[35px]">
              <div className="bg-[#29283C] mt-[10px] rounded-full w-[50px] h-[5px]" />
            </div>
            <ProposalList
              proposals={proposals}
              handleClose={handleCloseModal}
              onAcceptProposal={onAcceptProposal}
              onDeclineProposal={onDeclineProposal}
              hasBeenAccepted={_.some(
                proposals,
                ({ status }) => status === 'Accepted',
              )}
            />
          </div>
        </Drawer>
      ) : (
        <Modal open={isModalVisible} onClose={handleCloseModal}>
          <div className="top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%]">
            {isLoading ? (
              <div className="z-[20000] absolute-center">
                <Spinner size="small" />
              </div>
            ) : null}
            <div className="bg-[#201F34] rounded-[12px] w-[50vW] min-w-[400px] h-[80vh]">
              <ProposalList
                proposals={proposals}
                handleClose={handleCloseModal}
                onAcceptProposal={onAcceptProposal}
                onDeclineProposal={onDeclineProposal}
                hasBeenAccepted={_.some(
                  proposals,
                  ({ status }) => status === 'Accepted',
                )}
              />
            </div>
          </div>
        </Modal>
      )}
      {renderNotification()}
    </>
  )
}

export default AppliedUsers
