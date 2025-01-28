import React from 'react'

import styles from './styles.module.css'

interface StarRatingInputProps {
  value: number
  numOfStars?: number
  size?: 'sm' | 'md' | 'lg'
  onChange: (value: number) => void
}

const StarRatingInput: React.FC<StarRatingInputProps> = (
  props: StarRatingInputProps,
) => {
  const { value, numOfStars = 5, onChange, size = 'md' } = props

  if (value > numOfStars) {
    console.error(
      'StarRatingInput value is greater than number of stars',
      value,
      numOfStars,
    )
    return null
  }

  return (
    <div className="flex flex-row gap-[4px]">
      {Array(numOfStars)
        .fill(1)
        .map((_, index) => {
          const filled = index + 1 <= value
          return (
            <i
              key={index}
              data-filled={filled}
              data-size={size}
              className={`${styles.star} ${filled ? 'fas' : 'far'} fa-star`}
              onClick={() => {
                onChange(index + 1)
              }}
            />
          )
        })}
    </div>
  )
}

export default StarRatingInput
