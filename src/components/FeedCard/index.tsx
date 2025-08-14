import React from 'react'
import {
  CalendarIcon,
  ClipShapeLeft,
  ClipShapeRight,
  ClockIcon,
} from 'utils/svg-icons'
import Tags from 'components/Tags'
import UserIcon from 'assets/img/user.png'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import { FeedResponsePayload } from 'candid/ts/konecta.did'
import userActorServiceInstance from 'services/userService'
import { getEventCoverImageUrl } from 'utils/common/common'

interface FeedCardProps {
  event: FeedResponsePayload
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function FeedCard({ event, onClick }: FeedCardProps) {
  const {
    name,
    start_date: startDate,
    categories,
    userData,
    coverphoto,
  } = event

  const imageUrl = getEventCoverImageUrl(coverphoto)

  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col w-full md:w-[420px] rounded-[8px] border-[1px] border-[#363548] bg-[#29283C] text-left cursor-pointer transition-transform ease-in-out hover:scale-[1.02]`}
    >
      <div
        className={`w-full h-[172px] rounded-t-[8px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div
          className={`flex flex-col relative w-full h-full p-[16px] justify-between`}
        >
          <div className="flex flex-row self-stretch justify-between">
            <div
              className={`flex items-center gap-[6px] backdrop-blur-[2px] bg-[#FFFFFF14] p-[4px_8px] rounded-[4px] text-white ty-caption`}
            >
              <span>
                <CalendarIcon width={13} height={13} />
              </span>
              <p>{getMomentFromNanoSeconds(startDate).format('MMM Do, YYYY')}</p>
            </div>
            <div
              className={`flex items-center gap-[6px] backdrop-blur-[2px] bg-[#FFFFFF14] p-[4px_8px] rounded-[4px] text-white ty-caption`}
            >
              <span>
                <ClockIcon width={13} height={13} />
              </span>
              <p>{getMomentFromNanoSeconds(startDate).format('hh:mm A')}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-[-22px] bottom-[-22px]">
              <ClipShapeLeft />
            </div>
            <div className="absolute right-[-22px] bottom-[-22px]">
              <ClipShapeRight />
            </div>
            <div
              className={`relative flex items-center gap-[12px] bg-[#FFFFFF0A] backdrop-blur-[2px] pr-[20px] rounded-full w-fit h-[40px]`}
            >
              <img
                src={
                  userData.profilepic
                    ? userActorServiceInstance.getUserImageUrl(
                      userData.canister_id,
                      userData.profilepic,
                    )
                    : UserIcon
                }
                className="w-[40px] h-[40px] border-[4px] border-[#28292D] rounded-full object-cover"
              />
              <p className="text-[#FFFFFF99] ty-caption">
                Hosted by{' '}
                <span className="text-white">
                  {userData.firstname} {userData.lastname}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] p-[16px] items-start text-white">
        <h2 className="ty-title line-clamp-2">{name}</h2>
        <div className="flex flex-row flex-wrap gap-[4px]">
          {categories.map((item, index) => {
            return (
              <Tags
                text={item}
                color={item?.toLowerCase()}
                size={'small'}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}