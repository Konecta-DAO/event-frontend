import { Avatar, AvatarGroup } from '@mui/joy'
import { Drawer, Modal, Skeleton, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'

import { CloseOutlined } from '@mui/icons-material'

import LinkToUserProfile from 'components/LinkToUserProfile'
import eventActorServiceInstance from 'services/eventService'
import userActorServiceInstance from 'services/userService'
import {
  EventWithUserDataPayload,
  UserResponsePayload,
} from 'candid/ts/event.did'
import Emitter, { EventParams } from 'services/emitter'
import { setEventAttendees } from 'reduxStore/event/eventAction'
import { useAppDispatch } from 'reduxStore/hooks'

interface AttendeesProp {
  event: EventWithUserDataPayload
}

interface AttendeeCardProps {
  attendee: UserResponsePayload
}

interface AttendeeListProps {
  attendees: UserResponsePayload[]
  handleClose: () => void
}

const AttendeeCard = ({ attendee }: AttendeeCardProps) => {
  const {
    firstname,
    lastname,
    profilepic,
    username,
    canister_id: canisterId,
  } = attendee

  return (
    <LinkToUserProfile username={username} openInNewTab={true}>
      <div className="flex flex-row justify-start items-center gap-[10px] md:px-[10px]">
        <Avatar
          src={userActorServiceInstance.getUserImageUrl(canisterId, profilepic)}
        />
        <div className="flex flex-col justify-center items-start gap-[10px] md:pl-[10px]">
          <div className="flex flex-row gap-[5px]">
            <div className="flex flex-col flex-1 justify-center gap-[5px]">
              <p className="font-[400] text-[18px] text-white leading-[18px]">
                {firstname} {lastname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LinkToUserProfile>
  )
}

const AttendeeList = ({ attendees, handleClose }: AttendeeListProps) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full text-white">
      <div
        className={
          'flex flex-row justify-between items-start gap-[32px] text-center md:text-left mx-[24px] md:mx-[32px] pb-[16px] pt-[20px] border-b-[1px] border-b-[white]/5'
        }
      >
        <div className="flex flex-col flex-1 gap-[4px] md:gap-[0px]">
          <h2 className={'ty-title'}>Attendees</h2>
          <p className="text-[#BCBCC2] ty-text-3">
            These are the users who are attending this event.
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
        Attendees{' '}
        <span className="bg-[#337FF51A]/10 px-[6px] rounded-[2px] font-[500] text-[#337FF5CC]/80 text-[12px] leading-[18px]">
          {attendees.length}
        </span>
      </h3>
      <ul className="flex flex-col flex-1 gap-[10px] md:gap-[12px] px-[24px] md:px-[32px] pb-[24px] md:pb-[32px] overflow-y-scroll scrollbar">
        {attendees.map((item) => {
          const { principal_id } = item
          return (
            <li key={principal_id}>
              <AttendeeCard attendee={item} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const Attendees = ({ event }: AttendeesProp) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [attendees, setAttendees] = useState<UserResponsePayload[] | undefined>(
    [],
  )
  const [isLoadingAttendees, setIsLoadingAttendees] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const fetchAttendees = useCallback(async () => {
    try {
      setIsLoadingAttendees(true)
      const action =
        event.event_type === 'Request' ? { Accepted: null } : { Joined: null }

      const allAttendees =
        await eventActorServiceInstance.getAttendeesByActionWithUserDetails(
          event.event_id,
          action,
        )

      if ('ok' in allAttendees) {
        setAttendees(allAttendees.ok)
        dispatch(setEventAttendees(allAttendees.ok))
      } else {
        console.error('Failed to fetch attendees:', allAttendees.err)
        setAttendees([])
      }

      setIsLoadingAttendees(false)
    } catch (e) {
      console.error('An exception occurred while fetching attendees:', e)
      setIsLoadingAttendees(false)
    }
  }, [event.event_id, event.event_type, dispatch])

  useEffect(() => {
    fetchAttendees()
  }, [fetchAttendees])

  useEffect(() => {
    const refreshAttendees = (params: EventParams) => {
      if (
        params.eventName === 'REFRESH_EVENT' &&
        params.payload.eventId === event.event_id
      ) {
        fetchAttendees()
      }
    }
    Emitter.on('REFRESH_EVENT', refreshAttendees)
    return () => {
      Emitter.off('REFRESH_EVENT', refreshAttendees)
    }
  }, [fetchAttendees, event.event_id])

  const handleShowModal = () => {
    setIsModalVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  if (attendees === undefined) {
    return null
  }

  const visibleAttendees = _.slice(attendees, 0, 3)
  const moreCount = attendees.length - visibleAttendees.length

  const titleLabel =
    event.event_type === 'Request' ? 'Accepted user' : 'Attendees'
  const emptyListLabel =
    event.event_type === 'Request'
      ? 'No proposal accepted yet'
      : 'No one is attending so far'

  return (
    <>
      <div className="flex flex-col items-start gap-[8px] md:gap-[12px] text-white">
        <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
          {titleLabel}
        </p>

        {isLoadingAttendees ? (
          <div className="flex flex-row">
            {Array(4)
              .fill({})
              .map((item, index) => (
                <Skeleton key={index} variant="circular" className="mx-[-5px]">
                  <Avatar />
                </Skeleton>
              ))}
          </div>
        ) : attendees.length > 0 ? (
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
              {visibleAttendees.map(
                ({ profilepic, canister_id: canisterId, principal_id }) => {
                  return (
                    <Avatar
                      key={principal_id}
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
            {emptyListLabel}
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
            <div className="flex flex-row justify-center h-[35px]">
              <div className="bg-[#29283C] mt-[10px] rounded-full w-[50px] h-[5px]" />
            </div>
            <AttendeeList
              attendees={attendees}
              handleClose={handleCloseModal}
            />
          </div>
        </Drawer>
      ) : (
        <Modal open={isModalVisible} onClose={handleCloseModal}>
          <div className="top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%]">
            <div className="bg-[#201F34] rounded-[12px] w-[50vW] min-w-[400px] h-[80vh]">
              <AttendeeList
                attendees={attendees}
                handleClose={handleCloseModal}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Attendees