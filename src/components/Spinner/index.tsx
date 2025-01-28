import React from 'react'
import styles from './index.module.css'

interface Props {
  size: 'default' | 'medium' | 'small'
}

export default function Spinner({ size = 'default' }: Props) {
  return (
    <div className={styles.spinner}>
      {size === 'default' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="156"
          height="156"
          viewBox="0 0 156 156"
          fill="none"
        >
          <ellipse
            cx="78"
            cy="78"
            rx="57.0181"
            ry="57.0181"
            stroke="#337FF5"
            strokeOpacity="0.25"
            strokeWidth="14"
          />
          <path
            d="M77.6052 20.9834C92.727 20.8787 107.271 26.7854 118.038 37.404C128.805 48.0227 134.912 62.4836 135.017 77.6053"
            stroke="url(#paint0_linear_623_78419)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <defs>
            <linearGradient
              id="paint0_linear_623_78419"
              x1="127.224"
              y1="106.776"
              x2="28.776"
              y2="49.2242"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#337FF5" />
              <stop offset="0.755208" stopColor="#337FF5" stopOpacity="0.01" />
              <stop offset="1" stopColor="#337FF5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {size === 'medium' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="78"
          viewBox="0 0 156 156"
          fill="none"
        >
          <ellipse
            cx="78"
            cy="78"
            rx="57.0181"
            ry="57.0181"
            stroke="#337FF5"
            strokeOpacity="0.25"
            strokeWidth="14"
          />
          <path
            d="M77.6052 20.9834C92.727 20.8787 107.271 26.7854 118.038 37.404C128.805 48.0227 134.912 62.4836 135.017 77.6053"
            stroke="url(#paint0_linear_623_78419)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <defs>
            <linearGradient
              id="paint0_linear_623_78419"
              x1="127.224"
              y1="106.776"
              x2="28.776"
              y2="49.2242"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#337FF5" />
              <stop offset="0.755208" stopColor="#337FF5" stopOpacity="0.01" />
              <stop offset="1" stopColor="#337FF5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {size === 'small' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 156 156"
          fill="none"
        >
          <ellipse
            cx="78"
            cy="78"
            rx="57.0181"
            ry="57.0181"
            stroke="#337FF5"
            strokeOpacity="0.25"
            strokeWidth="14"
          />
          <path
            d="M77.6052 20.9834C92.727 20.8787 107.271 26.7854 118.038 37.404C128.805 48.0227 134.912 62.4836 135.017 77.6053"
            stroke="url(#paint0_linear_623_78419)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <defs>
            <linearGradient
              id="paint0_linear_623_78419"
              x1="127.224"
              y1="106.776"
              x2="28.776"
              y2="49.2242"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#337FF5" />
              <stop offset="0.755208" stopColor="#337FF5" stopOpacity="0.01" />
              <stop offset="1" stopColor="#337FF5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  )
}
