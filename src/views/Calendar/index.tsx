import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import _ from 'lodash';

import { BackArrowIcon } from 'utils/svg-icons';
import EventsCard from 'components/EventsCard';
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup';
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import { RootState } from 'reduxStore/store';
import { setUserEvents } from 'reduxStore/event/eventAction';
import { useIdentityKit } from '@nfid/identitykit/react';

import eventActorServiceInstance from 'services/eventService';

import { EventMetadataResponsePayload } from 'candid/ts/user.did';
import { EventWithUserDataPayload } from 'candid/ts/event.did';

import './calendarStyle.scss';
import styles from './style.module.css';

const localizer = momentLocalizer(moment);

// --- Custom Toolbar Component ---
const CalendarToolBar = ({ onNavigate, label }: any) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)');
  const iconSize = isonTabletOrMobile ? 11 : 14;

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
  );
};

// --- Redux Selector ---
const userEventsSelector = (state: RootState) => state.event.userEvents;

// --- Main Calendar Component ---
const MyCalendar = () => {
  const userEventsFromStore: Array<EventMetadataResponsePayload> = useAppSelector(userEventsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { identity, user } = useIdentityKit();
  const principalId = useAppSelector((state) => state.auth.pid);
  const isAuthenticated = identity && user?.principal && user.principal.toText() !== '2vxsx-fae';
  const calendarRef = useRef(null);

  const scrollTime = useRef(new Date()).current;

  const fetchUserEvents = useCallback(async () => {
    if (!principalId) return;

    try {
      const paginatedResult = await eventActorServiceInstance.getPaginatedEventsForAttendee(
        principalId,
        100n,
        undefined,
      );

      console.log('Fetched calendar events from Event canister:', paginatedResult);

      if (paginatedResult && 'ok' in paginatedResult) {
        const fetchedEvents: EventWithUserDataPayload[] = paginatedResult.ok.items;

        const formattedEvents = fetchedEvents.map((event) => {
          return {
            event_metadata_id: event.event_id,
            calendar_id: '',
            event_id: event.event_id,
            name: event.name,
            categories: event.categories,
            interests: event.interests,
            start_date: event.start_date,
            end_date: event.end_date,
            status: event.status,
            created_by: event.user_id,
          };
        });

        dispatch(setUserEvents(formattedEvents));
      } else {
        console.error("Failed to fetch user events:", paginatedResult?.err);
      }
    } catch (e) {
      console.error('Error in fetchUserEvents:', e);
    }
  }, [dispatch, principalId]);

  // Fetch events when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserEvents();
    }
  }, [isAuthenticated, fetchUserEvents]);

  const calendarEvents: CalendarEvent[] = useMemo(() =>
    userEventsFromStore.map(
      (event: EventMetadataResponsePayload) => {
        return {
          title: event.name,
          start: getMomentFromNanoSeconds(event.start_date).toDate(),
          end: getMomentFromNanoSeconds(event.end_date).toDate(),
          resource: event,
        };
      },
    ), [userEventsFromStore]);

  // --- Stabilized format and component functions ---
  const dayRangeHeaderFormat = useCallback(({ start, end }: { start: Date, end: Date }) => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    if (startMoment.month() === endMoment.month()) {
      return `${startMoment.format('MMM DD')} - ${endMoment.format('DD, YYYY')}`;
    }
    return `${moment(start).format('MMM DD')} - ${moment(end).format('DD MMM, YYYY')}`;
  }, []);

  const eventTimeRangeFormat = useCallback(() => '', []);

  const calendarHeader = useCallback(({ date }: { date: Date }) => (
    <div>
      <h1 className="text-[14px]">{date.getDate()}</h1>
      <h2 className="font-[400] text-[10px]">
        {moment(date).format('ddd')}
      </h2>
    </div>
  ), []);

  const dayHeader = useCallback(({ date }: { date: Date }) => (
    <h1
      className="text-[14px]"
      onClick={() => {
        (calendarRef.current as any)?.handleViewChange?.('week');
      }}
    >
      {moment(date).format('D MMM YYYY, dddd')}
    </h1>
  ), [calendarRef]);

  const weekEvent = useCallback(({ event }: { event: CalendarEvent }) => <EventsCard data={event.resource} />, []);
  const dayEvent = useCallback(({ event }: { event: CalendarEvent }) => <EventsCard data={event.resource} />, []);

  const monthEvent = useCallback(({ event }: { event: CalendarEvent }) => (
    <div className="bg-[#FFFFFF0D] px-[4px] rounded-[4px]">
      {event.title}
    </div>
  ), []);

  const calendarToolbar = useCallback(({ onNavigate, label }: any) => (
    <CalendarToolBar onNavigate={onNavigate} label={label} />
  ), []);

  const handleDoubleClickEvent = useCallback((event: CalendarEvent) => {
    const originalEvent = event.resource as EventMetadataResponsePayload;
    navigate(`../event/${originalEvent.event_id}`);
  }, [navigate]);

  return (
    <>
      <Calendar
        ref={calendarRef}
        localizer={localizer}
        events={calendarEvents}
        timeslots={2}
        defaultView="week"
        scrollToTime={scrollTime}
        formats={{
          timeGutterFormat: 'h A',
          eventTimeRangeFormat: eventTimeRangeFormat,
          dayRangeHeaderFormat: dayRangeHeaderFormat,
        }}
        components={{
          header: calendarHeader,
          week: {
            event: weekEvent,
          },
          day: {
            event: dayEvent,
            header: dayHeader,
          },
          month: {
            event: monthEvent,
          },
          toolbar: calendarToolbar,
        }}
        onDoubleClickEvent={handleDoubleClickEvent}
      />
    </>
  );
};

export default MyCalendar;