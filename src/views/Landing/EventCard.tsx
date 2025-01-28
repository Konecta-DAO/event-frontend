import React from 'react'

import Tags from 'components/Tags'

interface EventCardProps {
  img: string
  cardCreator: string
  cardTitle: string
  time: string
  title: string
  creator: string
  price: string
  categories: string[]
}

export default function EventCard({
  img,
  cardCreator,
  cardTitle,
  time,
  title,
  creator,
  price,
  categories,
}: EventCardProps) {
  const category = categories[0].toLowerCase()
  return (
    <article className="flex flex-col gap-[26px] justify-start items-start text-white">
      <div
        className="flex flex-col items-start justify-center h-[234px] w-[416px] relative border-t-[4px] rounded-b-[8px]"
        style={{
          borderTopColor: `var(--color-${category})`,
          background: `
        linear-gradient(
          to right,
          #0A0118 0%,
          #0A0118 70%,
          var(--color-${category}) 70%,
          var(--color-${category}) 100%
        )
        `,
        }}
      >
        <img
          src={img}
          className="text-white h-full w-full event-card-image-clip absolute object-cover top-0 right-0"
        />
        <span className="absolute top-[12px] right-[12px] flex flex-row rounded-[4px] font-[500] text-[14px] leading-[22px] px-[12px] py-[3px] gap-[8px] bg-[#FF5243] text-white">
          • Live
        </span>
        <div className="max-w-[200px] flex flex-col gap-[16px] py-[8px] text-white text-left ml-[20px]">
          <p className="text-[16px]">{cardCreator}</p>
          <p className="font-[600] text-[26px] leading-[30px]">{cardTitle}</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-[7px]">
        <div className="text-left">
          <p className="text-[#807B87]">{time}</p>
          <p className="text-[20px] font-[600] mb-[4px]">{title}</p>
          <p className="text-[#807B87] text-[16px] leading-[20px] font-[500]">
            by {creator}
          </p>
        </div>
        <p className="font-[600] text-[20px]">{price}</p>
        <div className="flex flex-row gap-[4px] flex-wrap">
          {categories.map((ct) => {
            return (
              <Tags
                key={ct}
                text={ct}
                color={ct?.toLowerCase()}
                size={'small'}
              />
            )
          })}
        </div>
      </div>
    </article>
  )
}
