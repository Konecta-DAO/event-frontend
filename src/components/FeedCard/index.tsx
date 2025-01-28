import { useMediaQuery } from '@mui/material'
import Tags from 'components/Tags'
import {
  CalendarIcon,
  ClipShapeLeft,
  ClipShapeRight,
  ClockIcon,
} from 'utils/svg-icons'
import FeedCoverImg from 'assets/img/feed-cover.png'

import styles from './style.module.css'

import eventActorServiceInstance from 'services/eventService'
import { FeedResponsePayload } from 'candid/ts/konecta.did'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import { VideocamOutlined } from '@mui/icons-material'

interface FeedCardProps {
  event: FeedResponsePayload
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const FeedCard = ({ event, onClick }: FeedCardProps) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const categoryClass = event.categories?.[0]?.toLowerCase()
  const isRecordingAvailable = event.is_recording_available

  return (
    <div
      className={`${styles.feedCard} ${styles[categoryClass]}`}
      onClick={onClick}
    >
      <div className="relative flex mb-[16px] w-full max-w-[436px] h-[239px] max-md:h-[126px]">
        {/* Content Container */}
        <div className="flex-1 p-[10px] bg-[#2E2D43] text-white rounded-bl-[8px]">
          <div>
            {isRecordingAvailable && (
              <div
                className={`mb-[10px] pl-[1px] pr-[1px] border ${
                  styles[`border-${categoryClass}`]
                } inline-block`}
              >
                <p className="text-white max-md:mb-[8px] max-md:text-[10px] text-[12px]">
                  <VideocamOutlined /> Recording available
                </p>
              </div>
            )}
            <p className="mb-[20px] max-md:mb-[8px] max-md:text-[10px]">
              {event.userData.firstname} {event.userData.lastname}
            </p>
            <p className="w-[90%] font-[600] text-[28px] max-md:text-[14px] line-clamp-2">
              {event.name}
            </p>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 h-full overflow-hidden rounded-br-[8px]">
          <img
            src={
              event.coverphoto.length > 0
                ? eventActorServiceInstance.getEventCoverImageUrl(
                    event.coverphoto,
                  )
                : FeedCoverImg
            }
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[20px] max-md:gap-[8px]">
        <div className="flex max-md:flex-col gap-[20px] max-md:gap-[5px]">
          <p className="flex items-center gap-[6px] text-[14px] text-white max-md:text-[12px]">
            <span>
              <CalendarIcon
                width={`${isonTabletOrMobile ? 16 : 18}`}
                height={`${isonTabletOrMobile ? 16 : 18}`}
              />
            </span>
            {getMomentFromNanoSeconds(event.start_date).format('MMM Do, YYYY')}
          </p>
          <p className="flex items-center gap-[6px] text-[14px] text-white max-md:text-[12px]">
            <span>
              <ClockIcon
                width={`${isonTabletOrMobile ? 16 : 18}`}
                height={`${isonTabletOrMobile ? 16 : 18}`}
              />
            </span>
            {getMomentFromNanoSeconds(event.start_date).format('hh:mm A') +
              ' - ' +
              getMomentFromNanoSeconds(event.end_date).format('hh:mm A')}
          </p>
        </div>
        {!isonTabletOrMobile && (
          <>
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-[600] text-[20px] text-white max-md:text-[13px]">
                {event.name}
              </h1>
              {event.consultations.length > 0 ? (
                <p className="font-[400] text-[#FFFFFF99] max-md:text-[12px]">
                  {event.consultations.join(', ')}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[8px] gap-text-[16px]">
                <p className="text-[#A6A5AE] max-md:text-[13px]">Price </p>
                <p className="text-white max-md:text-[12px]">
                  {event.token_amount} {event.price_token}
                </p>
              </div>
              <div className="flex gap-[8px] gap-text-[16px]">
                <p className="text-[#A6A5AE] max-md:text-[13px]">Idioma </p>
                <p className="text-white max-md:text-[12px]">
                  {event.language}
                </p>
              </div>
              {/* <div className="flex gap-[8px] gap-text-[16px]">
                <p className="text-[#A6A5AE] max-md:text-[13px]">
                  Max number of users{' '}
                </p>
                <p className="text-white max-md:text-[12px]">(02/25)</p>
              </div> */}
            </div>
            <div className="flex flex-row flex-wrap justify-start items-start gap-[8px]">
              {event.categories.map((category, index) => (
                <Tags
                  text={category}
                  color={category.toLowerCase()}
                  size={`${isonTabletOrMobile ? 'small' : 'medium'}`}
                  key={index}
                />
              ))}
              {event.interests.map((interest, index) => (
                <Tags
                  text={interest}
                  color={interest.toLowerCase()}
                  size={`${isonTabletOrMobile ? 'small' : 'medium'}`}
                  key={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FeedCard
