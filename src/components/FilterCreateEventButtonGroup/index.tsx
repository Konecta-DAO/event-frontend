import { AddOutlined, FilterAltOutlined } from '@mui/icons-material'
import Filters from 'components/Modals/Filters'
import { Link, useLocation } from 'react-router-dom'

import styles from './styles.module.css'
import { useState } from 'react'
import MobileActions from 'components/Modals/MobileActions'

interface FilterEventCreateButtonGroupProps {
  isMobile?: boolean
}

const FilterEventCreateButtonGroup = ({
  isMobile,
}: FilterEventCreateButtonGroupProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [
    isMobileFloatingButtonActionVisible,
    setIsMobileFloatingButtonActionVisible,
  ] = useState(false)

  const location = useLocation()

  const handleMobileActionClose = () => {
    setIsMobileFloatingButtonActionVisible(false)
  }

  const handleFiltersClose = () => {
    setIsFilterVisible(false)
  }
  const showFilter = () => {
    setIsFilterVisible(true)
  }

  const hideFilterButton = location.pathname.startsWith('/calendar')

  if (isMobile) {
    return (
      <>
        <button
          className="fixed bottom-[24px] right-[24px] bg-[#337FF5] text-center text-white border-none w-[40px] h-[40px] rounded-[10px] z-3"
          onClick={() => setIsMobileFloatingButtonActionVisible(true)}
        >
          <AddOutlined />
        </button>
        <MobileActions
          isOpen={isMobileFloatingButtonActionVisible}
          setFiltersShow={setIsFilterVisible}
          handleClose={handleMobileActionClose}
        />
        <Filters isOpen={isFilterVisible} handleClose={handleFiltersClose} />
      </>
    )
  }

  return (
    <>
      <div className={styles.actions}>
        {!hideFilterButton ? (
          <button className="btn-secondary" onClick={showFilter}>
            <FilterAltOutlined /> Filter
          </button>
        ) : null}
        <Link to={'/create-event'} className="btn-primary">
          <AddOutlined />
          Create event
        </Link>
      </div>
      <Filters isOpen={isFilterVisible} handleClose={handleFiltersClose} />
    </>
  )
}

export default FilterEventCreateButtonGroup
