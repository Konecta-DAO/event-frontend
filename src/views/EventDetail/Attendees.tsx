import { Avatar, AvatarGroup } from '@mui/joy'
import { Drawer, Modal, Skeleton, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'

import _ from 'lodash'

import { CloseOutlined } from '@mui/icons-material'

import { useNavigate } from 'react-router'
import Spinner from 'components/Spinner'
import eventActorServiceInstance from 'services/eventService'
import LinkToUserProfile from 'components/LinkToUserProfile'
import userActorServiceInstance from 'services/userService'
import { FeedResponsePayload, UserResponsePayload } from 'candid/ts/konecta.did'
import Emitter, { EventParams } from 'services/emitter'
import { setEventAttendees } from 'reduxStore/event/eventAction'
import { useAppDispatch } from 'reduxStore/hooks'

interface AppliedUser {
  id: string
  firstname: string
  lastname: string
  profilepic: string
}

interface AttendeesProp {
  event: FeedResponsePayload
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
              {/* <p className="font-[400] text-[14px] text-[white]/60 leading-[22px]">
              {Math.floor(Math.random() * 100)} followers
              </p> */}
            </div>
            {/* <p className="font-[400] text-[12px] text-[white]/60 leading-[20px]"></p> */}
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
        {attendees.map((item, index) => {
          const { firstname, lastname, profilepic, id } = item
          return (
            <li key={id}>
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const fetchAttendees = useCallback(async () => {
    try {
      setIsLoadingAttendees(true)
      if (event.event_type === 'Request') {
        const allAttendees =
          await eventActorServiceInstance.getAttendeesByActionWithUserDetails(
            event.event_id,
            { Accepted: null },
          )
        if (typeof allAttendees.ok !== 'undefined') {
          console.log(
            'allAttendees - Attendees111 - getAttendeesByActionWithUserDetails - Accepted',
            allAttendees.ok,
          )
          setAttendees(allAttendees.ok)
          dispatch(setEventAttendees(allAttendees.ok))
        }
      } else {
        const allAttendees =
          await eventActorServiceInstance.getAttendeesByActionWithUserDetails(
            event.event_id,
            { Joined: null },
          )
        if (typeof allAttendees.ok !== 'undefined') {
          console.log(
            'allAttendees - Attendees111 - getAttendeesByActionWithUserDetails - Joined',
            allAttendees.ok,
          )
          setAttendees(allAttendees.ok)
          dispatch(setEventAttendees(allAttendees.ok))
        }
      }
      setIsLoadingAttendees(false)
    } catch (e) {
      console.log('Error in fetching attendees - Attendees111', e)
      setIsLoadingAttendees(false)
    }
  }, [event.event_id, event.event_type])

  useEffect(() => {
    fetchAttendees()
  }, [fetchAttendees])

  useEffect(() => {
    const refreshAttendees = (params: EventParams) => {
      if (params.eventName === 'REFRESH_EVENT') {
        if (params.payload.eventId === event.event_id) {
          fetchAttendees()
        }
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
                ({ profilepic, canister_id: canisterId, id }) => {
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
            {isLoading ? (
              <div className="z-[20000] absolute-center">
                <Spinner size="small" />
              </div>
            ) : null}
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
            {isLoading ? (
              <div className="z-[20000] absolute-center">
                <Spinner size="small" />
              </div>
            ) : null}
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
