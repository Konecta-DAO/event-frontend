import { useRef } from 'react'
import { Avatar, AvatarGroup } from '@mui/joy'
import { styled, useMediaQuery } from '@mui/material'
import Tags from 'components/Tags/index.tsx'
import UserIcon1 from 'assets/svg/user1.svg'
import UserIcon2 from 'assets/svg/user2.svg'
import UserIcon3 from 'assets/svg/user3.svg'

import styles from './style.module.css'
import moment from 'moment'
import { useAppSelector } from 'reduxStore/hooks.tsx'
import { EditIcon } from 'utils/svg-icons.tsx'
import { useNavigate } from 'react-router'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils.ts'
import type { EventMetadataResponsePayload } from 'candid/ts/user.did.d.ts'

interface EventsCardProps {
  data: (EventMetadataResponsePayload & { start: Date; end: Date }) | any
  style?: string
}

const EventsCard = ({ data }: EventsCardProps) => {
  const nodeRef = useRef(null)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const pid = useAppSelector((state) => state.auth.pid)
  const navigate = useNavigate()

  const StyledAvtarG = styled(AvatarGroup)<{ component?: React.ElementType }>({
    '&': {
      flexDirection: `${isonTabletOrMobile ? 'column' : 'row'}`,
    },
  })

  const isPassed = getMomentFromNanoSeconds(data.start_date).isBefore(moment())

  const categoryClass =
    data.categories?.length > 0 ? data.categories?.[0].toLowerCase() : ''

  const isMyEvent = data.created_by === pid

  const timeSlotText =
    getMomentFromNanoSeconds(data.start_date).format('HH:mm') +
    ' - ' +
    getMomentFromNanoSeconds(data.end_date).format('HH:mm')

  const timeSlotStartTimeText = getMomentFromNanoSeconds(
    data.start_date,
  ).format('DD MMM YYYY, HH:mm')

  const timeSlotEndTimeText = getMomentFromNanoSeconds(data.end_date).format(
    'DD MMM YYYY, HH:mm',
  )

  const isMultiDayEvent = !getMomentFromNanoSeconds(data.start_date).isSame(
    getMomentFromNanoSeconds(data.end_date),
    'day',
  )

  return (
    <abbr
      ref={nodeRef}
      className={`${styles.eventsCard} ${
        isPassed ? styles.passedEventsCard : ''
      } ${styles[categoryClass]} ${
        !isPassed && isMyEvent ? styles.myEventCard : null
      } ${isMultiDayEvent ? styles.multiDayEventCard : null}`}
      title={`${
        data.name
      }\n\nTime\nFrom: ${timeSlotStartTimeText}\nTo: ${timeSlotEndTimeText} \n\nCategories:\n${data.categories.join(
        ', ',
      )}\n\nTopics:\n${data.interests.join(', ')}`}
    >
      <div className="flex flex-col gap-[12px]">
        <h1 className="line-clamp-2 font-[600] text-white max-md:text-[10px]">
          {data.name}
        </h1>
        {!isMultiDayEvent ? (
          <p className="flex flex-row justify-start items-center items-center gap-[4px] opacity-[0.6] font-[400] max-md:text-[10px] truncate">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.43555 4.41064V8.00024C7.43555 8.16114 7.51295 8.31224 7.64355 8.40624L9.05885 9.42405C9.14725 9.48755 9.2493 9.51804 9.35035 9.51804C9.50585 9.51804 9.6592 9.44579 9.75685 9.31004C9.918 9.08569 9.86695 8.77344 9.64285 8.61204L8.43555 7.74389V4.41064C8.43555 4.13454 8.21165 3.91064 7.93555 3.91064C7.6594 3.91064 7.43555 4.13454 7.43555 4.41064Z"
                  fill="white"
                  fillOpacity="0.6"
                />
                <path
                  d="M1.92651 7.99977C1.92651 11.3133 4.62206 14.0088 7.93556 14.0088C11.2491 14.0088 13.9446 11.3133 13.9446 7.99977C13.9446 4.68627 11.249 1.99072 7.93556 1.99072C4.62211 1.99072 1.92651 4.68627 1.92651 7.99977ZM12.9446 7.99977C12.9446 10.7617 10.6975 13.0088 7.93551 13.0088C5.17351 13.0088 2.92651 10.7617 2.92651 7.99977C2.92651 5.23782 5.17356 2.99072 7.93556 2.99072C10.6976 2.99072 12.9446 5.23782 12.9446 7.99977Z"
                  fill="white"
                  fillOpacity="0.6"
                />
                <path
                  d="M13.4947 4.22266C13.6226 4.22266 13.7505 4.17381 13.8482 4.07616C14.0435 3.88086 14.0435 3.56446 13.8482 3.36911L12.4844 2.00536C12.2891 1.81006 11.9727 1.81006 11.7774 2.00536C11.582 2.20066 11.5821 2.51706 11.7774 2.71241L13.1411 4.07616C13.2388 4.17386 13.3668 4.22266 13.4947 4.22266Z"
                  fill="white"
                  fillOpacity="0.6"
                />
                <path
                  d="M3.38669 2.00536L2.02294 3.36916C1.82764 3.56446 1.82764 3.88086 2.02294 4.07621C2.12059 4.17386 2.24854 4.22271 2.37644 4.22271C2.50434 4.22271 2.63229 4.17386 2.72994 4.07621L4.09369 2.71246C4.28899 2.51716 4.28899 2.20076 4.09369 2.00541C3.89839 1.81006 3.58199 1.81006 3.38669 2.00536Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
            {timeSlotText}
          </p>
        ) : null}
        {!isMultiDayEvent ? (
          <div className="flex flex-wrap gap-[4px] mb-[50px] w-full">
            {data.categories?.map((category: any, index: any) => (
              <Tags
                text={category}
                color={category.toLowerCase()}
                size={`${isonTabletOrMobile ? 'xsmall' : 'small'}`}
                key={index}
              />
            ))}
            {data.interests?.map((interest: any, index: any) => (
              <Tags
                text={interest}
                color={interest.toLowerCase()}
                size={`${isonTabletOrMobile ? 'xsmall' : 'small'}`}
                key={index}
              />
            ))}
          </div>
        ) : null}
      </div>
      {!isMultiDayEvent ? (
        <StyledAvtarG size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src={UserIcon1} />
          <Avatar src={UserIcon2} />
          <Avatar src={UserIcon3} />
        </StyledAvtarG>
      ) : null}
      {!isPassed && isMyEvent ? (
        <div
          className="right-[10px] bottom-[6px] absolute cursor-pointer"
          onClick={() => {
            navigate(`/edit-event/${data.event_id}`)
          }}
        >
          <EditIcon stroke={'white'} height={12} width={12} />
        </div>
      ) : null}
    </abbr>
  )
}

export default EventsCard
