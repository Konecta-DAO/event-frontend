import { Close, KeyboardArrowUpOutlined } from '@mui/icons-material'
import { Drawer, Modal, styled, useMediaQuery } from '@mui/material'
import CheckBox from 'components/CheckBox/index.tsx'
import {
  resetFilterCategories,
  setAllFilterCategories,
  toggleCategory,
} from 'reduxStore/event/eventAction.tsx'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks.tsx'
import { RootState } from 'reduxStore/store.tsx'
import { categories } from 'utils/values.tsx'

interface FilterWrapperProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<HTMLButtonElement>
}

interface FilterProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>
}

const selectedCategoriesSelector = (state: RootState) =>
  state.event.selectedCategories

const Filters = ({ handleClose }: FilterProps) => {
  const selectedCategories = useAppSelector(selectedCategoriesSelector)
  const dispatch = useAppDispatch()

  const onReset = () => {
    dispatch(resetFilterCategories())
  }
  const onApplyAll = () => {
    dispatch(setAllFilterCategories())
  }

  return (
    <div className="flex flex-col w-full md:w-[400px] rounded-t-[12px] md:rounded-[12px] p-[20px_32px] bg-[#201F34] relative text-white items-center select-none text-center">
      <div className="flex items-center justify-center md:justify-between w-full mb-[24px]">
        <h1 className="text-[20px] md:text-[22px] font-[500] text-[#fff] md:text-[#FFFFFFCC] text-center md:text-start">
          Filter
        </h1>
        <button
          onClick={handleClose}
          className="hidden md:block btn-secondary btn-icon"
        >
          <Close />
        </button>
      </div>
      <div className="w-full h-[1.5px] bg-[#29283C] mx-[-24px] mb-[20px] md:mb-[32px]" />
      <div className="flex flex-col w-full mb-[20px] md:mb-[32px]">
        <div className="flex items-center justify-between w-full mb-[20px]">
          <h1 className="text-[13px] md:text-[18px] font-[500] text-[#FFFFFFCC] text-start">
            Categories
          </h1>
          <span>
            <KeyboardArrowUpOutlined />
          </span>
        </div>
        <div className="flex flex-col w-full gap-[16px]">
          {categories.map((category, index) => (
            <div
              className="flex justify-between items-center w-full text-[17px]"
              key={index}
            >
              <CheckBox
                color={category.caption.toLowerCase()}
                caption={category.caption}
                checked={selectedCategories.includes(category.caption)}
                onChange={() => {
                  dispatch(toggleCategory([category.caption]))
                }}
              />
              <p className="p-[6px] rounded-[5px] bg-[#FFFFFF0A] text-[#FFFFFFCC] !text-[13px]">
                {category.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1.5px] bg-[#29283C] mx-[-24px] mb-[20px] md:mb-[32px]" />
      <div className="flex flex-col md:flex-row w-full gap-[12px] text-[16px] font-[400] items-center">
        <button className="w-[184px] md:w-full btn-secondary" onClick={onReset}>
          Reset filter
        </button>
        <button
          className="w-[184px] md:w-full btn-primary"
          onClick={onApplyAll}
        >
          Apply all
        </button>
      </div>
    </div>
  )
}

const FilterWrapper = ({ isOpen, handleClose }: FilterWrapperProps) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const MobileFilters = styled(Drawer)<{ component?: React.ElementType }>({
    '& .MuiDrawer-paper': {
      background: 'none',
    },
  })

  return (
    <>
      {isonTabletOrMobile ? (
        <MobileFilters open={isOpen} onClose={handleClose} anchor="bottom">
          <Filters handleClose={handleClose} />
        </MobileFilters>
      ) : (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute top-[24px] right-[32px] w-fit">
            <Filters handleClose={handleClose} />
          </div>
        </Modal>
      )}
    </>
  )
}

export default FilterWrapper
