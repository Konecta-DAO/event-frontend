import { useNavigate, Link } from 'react-router-dom'
import { ArrowBackOutlined } from '@mui/icons-material'

import styles from './style.module.css'
export default function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.notFound}>
      <div className={styles.gradient1}></div>
      <div className={styles.gradient2}></div>
      <div className="fixed top-0 left-0 z-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="1209"
          viewBox="0 0 1209 1209"
          fill="none"
        >
          <g filter="url(#filter0_f_431_49048)">
            <path
              d="M833.116 524.956C974.2 560.683 1204.91 605.261 1348.17 629.527C1490.14 597.26 1564.83 931.714 1706.47 965.558C1837.35 996.832 2046 794.035 2046 794.035V-186L-112.861 -157.944L-58.9956 299.873C-58.9956 299.873 44.0985 701.301 121.969 714.969C319.258 749.599 343.87 815.48 543.815 820.815C651.411 823.687 728.466 498.455 833.116 524.956Z"
              fill="#14162C"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_431_49048"
              x="-352.861"
              y="-426"
              width="2638.86"
              height="1634.84"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="120"
                result="effect1_foregroundBlur_431_49048"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className={styles.mainContent}>
        <p className="text-[#337FF5] text-[18px] max-md:text-[12px] font-[500] mb-[12px]">
          404 error
        </p>
        <h1 className="text-white text-[36px] max-md:text-[20px] font-[700] mb-[24px]">
          Page not found
        </h1>
        <p className="text-[#A6A5AE] text-[22px] max-md:text-[12px] max-md:w-[280px] self-center font-[400] mb-[48px] leading-[36px] max-md:leading-[20px]">
          We searched high and low, but couldn’t find what you’re looking for.
          <br />
          Let’s find a better place for you to go.
        </p>
        <div className="flex gap-[12px] self-center">
          <button
            onClick={() => {
              navigate(-1)
            }}
            className="flex gap-[8px] items-center p-[14px_20px] max-md:py-[10px] max-md:rounded-[11px] bg-[#FFFFFF0D] text-white text-[16px] max-md:text-[13px] font-[400] rounded-[8px]"
          >
            <ArrowBackOutlined
              sx={{
                width: { xs: '16px', md: '18px' },
                height: { xs: '16px', md: '18px' },
              }}
            />
            Go back
          </button>
          <Link
            className="flex text-center items-center p-[14px_20px] max-md:py-[10px] bg-[#337FF5] text-white text-[16px] max-md:text-[13px] font-[400] rounded-[8px]"
            to="/calendar"
          >
            Take me to Calendar
          </Link>
        </div>
      </div>
    </div>
  )
}
