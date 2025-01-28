import { Info, KeyboardArrowDown } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Control, FieldError, useController } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { participationTooltip, participationTypes } from 'utils/values'

interface InputProps {
  items: any[]
  name: string
  error?: FieldError
  placeholder?: string
  value?: string
  control: Control<any>
  disabled?: boolean
  showTooltip?: boolean
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

export default function SingleSelect({
  items,
  disabled,
  showTooltip,
  ...props
}: InputProps) {
  const [isItemsShow, setIsItemsShow] = useState(false)
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props)
  const [selectedItem, setSelectedItem] = useState<any>(value)
  const dropdownRef = useRef<any>(null)
  const selectRef = useRef<any>(null)

  const errorClasses = ' border-[1px] border-solid border-[red]'
  const handleItemSel = (item: any) => {
    setIsItemsShow(false)
    if (item) {
      setSelectedItem(item)
      onChange(item)
    }
  }

  useEffect(() => {
    setSelectedItem(value)
  }, [value])

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (
        isItemsShow &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !selectRef.current.contains(event.target)
      ) {
        setIsItemsShow(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isItemsShow])

  return (
    <>
      <div className="flex flex-col gap-[8px] select-none max-md:!text-[13px]">
        <div
          className={`flex items-center justify-between bg-[#FFFFFF0F] p-[12px] min-h-[48pcx] text-white rounded-[8px]${
            error ? errorClasses : ''
          }`}
          onClick={() => {
            setIsItemsShow(!isItemsShow)
          }}
          ref={selectRef}
        >
          <div className="flex gap-[8px]">
            {selectedItem && <>{selectedItem}</>}
          </div>
          <span className="justify-self-end top-[12px] right-[16px]">
            <KeyboardArrowDown />
            {selectedItem && showTooltip && (
              <Tooltip
                id="tooltip"
                placement="bottom"
                title={
                  selectedItem === participationTypes[0]
                    ? participationTooltip[0]
                    : participationTooltip[1]
                }
              >
                <Info data-tip data-for="tooltip" />
              </Tooltip>
            )}
          </span>
        </div>
        {isItemsShow && !disabled && (
          <div
            className="flex flex-col bg-[#FFFFFF0F] rounded-[8px] text-white"
            ref={dropdownRef}
          >
            {items.map((item: any, index: any) => (
              <p
                className={'cursor-pointer hover:bg-white/20 p-[10px_28px]'}
                key={index}
                onClick={() => {
                  handleItemSel(item)
                }}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      <em className="text-red-500">{error?.message}</em>
    </>
  )
}
