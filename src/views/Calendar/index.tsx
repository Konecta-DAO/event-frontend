import { Snackbar, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BackArrowIcon } from 'utils/svg-icons'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import EventsCard from 'components/EventsCard'
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import './calendarStyle.scss'
import styles from './style.module.css'
import { EventMetadataResponsePayload } from 'entity/user/EventMetadataResponsePayload'
import { RootState } from 'reduxStore/store'
import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import userActorServiceInstance from 'services/userService'
import {
  EventRequestState,
  setEventRequestState,
  setUserEvents,
  updateEventRequestProgress,
} from 'reduxStore/event/eventAction'
import nfidServiceInstance from 'services/nfidServices'
import ledgerActorServiceInstance from 'services/ledgerService'
import { setLoader, setWalletArr } from 'reduxStore/auth/authAction'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack/MultiEventFeedBack'
import konectaActorServiceInstance from 'services/konectaService'
import {
  FeedResponsePayload,
  UserFeedbackRequestPayload,
} from 'candid/ts/konecta.did'
import Notification from 'components/Modals/Notifications'
import { UserPayload } from 'entity/UserModel'
import { useIdentityKit } from '@nfid/identitykit/react'
import { WarningAmberRounded } from '@mui/icons-material'

const localizer = momentLocalizer(moment)

const CalendarToolBar = ({ onNavigate, onView, label }: any) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const iconSize = isonTabletOrMobile ? 11 : 14

  return (
    <div className={styles.header}>
      <div className="flex max-md:flex-col items-baseline gap-[14px] max-md:gap-[2px]">
        <h1 className="!m-0 font-[700] max-md:font-[500] text-[36px] text-white max-md:text-[18px]">
          My activity
        </h1>
        <p className="m-0 font-400 text-[20px] text-white max-md:text-[12px]">
          {label}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          className="btn-icon btn-secondary"
          onClick={() => onNavigate('PREV')}
        >
          <BackArrowIcon width={iconSize} height={iconSize} />
        </button>
        <button
          className="md:min-w-[100px] btn-secondary"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          className="btn-icon btn-secondary rotate-180"
          onClick={() => onNavigate('NEXT')}
        >
          <BackArrowIcon width={iconSize} height={iconSize} />
        </button>
      </div>
      {!isonTabletOrMobile && <FilterEventCreateButtonGroup />}
    </div>
  )
}

const userEventsSelector = (state: RootState) => {
  return state.event.userEvents
}

const MyCalendar = () => {
  const userEvents: Array<EventMetadataResponsePayload> =
    useAppSelector(userEventsSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { identity, user } = useIdentityKit()

  const isAuthenticated =
    identity && user?.principal && user.principal.toText() !== '2vxsx-fae'

  const principalId = useAppSelector((state) => state.auth.pid)
  const userData = useAppSelector(
    (state) => state.user.userProfile as UserPayload,
  )

  const calendarRef = useRef(null)

  const currUserEvents = userEvents.map(
    (event: EventMetadataResponsePayload) => {
      return {
        ...event,
        start: getMomentFromNanoSeconds(event.start_date).toDate(),
        end: getMomentFromNanoSeconds(event.end_date).toDate(),
      }
    },
  )

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const userCalEvents =
          await userActorServiceInstance.getAllEventsMetadataForUser()
        console.log(
          'userCalEvents - Calendar111 - getAllEventsMetadataForUser',
          userCalEvents,
        )
        if (typeof userCalEvents.ok !== 'undefined') {
          console.log(
            'userCalEvents - Calendar111 - getAllEventsMetadataForUser - storing to redux',
            userCalEvents.ok,
          )
          dispatch(setUserEvents(userCalEvents.ok))
        }

        const walletArr = await ledgerActorServiceInstance.getAllAccountBalance(
          principalId,
        )
        dispatch(setWalletArr(walletArr))
      } catch (e) {
        console.log('fetchUserEvents - Calendar111 - error', e)
      }
    }
    if (isAuthenticated) {
      fetchUserEvents()
    }
  }, [dispatch, isAuthenticated, principalId])

  // console.log(
  //   'events - Calendar111',
  //   userEvents,
  //   'calUserEvents',
  //   currUserEvents,
  // )

  return (
    <>
      <Calendar
        ref={calendarRef}
        localizer={localizer}
        events={currUserEvents}
        timeslots={2}
        defaultView="week"
        scrollToTime={new Date()}
        formats={{
          timeGutterFormat: 'h A',
          eventTimeRangeFormat: () => '',
          dayRangeHeaderFormat: ({ start, end }) => {
            const startMoment = moment(start)
            const endMoment = moment(end)
            if (startMoment.month() === endMoment.month()) {
              return `${startMoment.format('MMM DD')} - ${endMoment.format(
                'DD, YYYY',
              )}`
            }
            return `${moment(start).format('MMM DD')} - ${moment(end).format(
              'DD MMM, YYYY',
            )}`
          },
        }}
        components={{
          header: ({ date, label }) => {
            return (
              <div>
                <h1 className="text-[14px]">{date.getDate()}</h1>
                <h2 className="font-[400] text-[10px]">
                  {moment(date).format('ddd')}
                </h2>
              </div>
            )
          },
          week: {
            event: ({ event }) => {
              return <EventsCard data={event} />
            },
          },
          day: {
            event: ({ event }) => {
              return <EventsCard data={event} />
            },
            header: ({ date }) => {
              return (
                <h1
                  className="text-[14px]"
                  onClick={() => {
                    ;(calendarRef.current as any)?.handleViewChange?.('week')
                  }}
                >
                  {moment(date).format('D MMM YYYY, dddd')}
                </h1>
              )
            },
          },
          month: {
            event: ({ event }) => {
              return (
                <div className="bg-[#FFFFFF0D] px-[4px] rounded-[4px]">
                  {event.name}
                </div>
              )
            },
          },
          toolbar: ({ onNavigate, onView, label }) => {
            return (
              <CalendarToolBar
                onNavigate={onNavigate}
                onView={onView}
                label={label}
              />
            )
          },
        }}
        onDoubleClickEvent={(event) => {
          navigate(`../event/${event.event_id}`)
        }}
      />
    </>
  )
}

export default MyCalendar
