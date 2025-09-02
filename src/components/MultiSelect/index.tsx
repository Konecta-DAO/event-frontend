import { useEffect, useRef, useState } from 'react'
import { Control, FieldError, useController, RegisterOptions } from 'react-hook-form'
import { Close, KeyboardArrowDown } from '@mui/icons-material'
import Tags from 'components/Tags/index.tsx'

interface InputProps {
  items: any[]
  onSelectStaysOpen?: boolean
  name: string
  error?: FieldError
  placeholder?: string
  value?: string
  control: Control<any>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

export default function MultiSelect({
  items,
  onSelectStaysOpen = true,
  ...props
}: InputProps) {
  const [isItemsShow, setIsItemsShow] = useState(false)
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props)

  const dropdownRef = useRef<any>(null)
  const selectRef = useRef<any>(null)

  const fieldRef = useRef<HTMLDivElement>(null)

  const errorClasses = ' border-[1px] border-solid border-[red]'
  const handleItemSel = (item: any) => {
    if (!onSelectStaysOpen) {
      setIsItemsShow(false)
    }
    if (!value.find((current: any) => current === item)) {
      onChange([...value, item])
    }
  }
  const handleItemDeSel = (item: any) => {
    if (!onSelectStaysOpen) {
      setIsItemsShow(false)
    }
    const newArr = [...value].filter((current) => current !== item)
    onChange(newArr)
  }

  useEffect(() => {
    if (isItemsShow) {
      fieldRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }

    function handleOutsideClick(event: any) {
      if (
        isItemsShow &&
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
      <div
        className="flex flex-col gap-[8px] select-none max-md:text-[13px]"
        ref={fieldRef}
      >
        <div
          className={`flex items-center justify-between bg-[#FFFFFF0F] p-[12px] min-h-[48pcx] text-white rounded-[8px]${error ? errorClasses : ''
            }`}
          onClick={() => {
            setIsItemsShow(!isItemsShow)
          }}
          ref={selectRef}
        >
          <div className="flex gap-[8px] flex-wrap">
            {value?.map((item: string, index: number) => (
              <Tags
                text={item}
                onClose={(e) => {
                  e.stopPropagation()
                  handleItemDeSel(item)
                }}
                color={item.toLowerCase()}
                size="small"
                icon={
                  <Close
                    sx={{
                      width: '14px',
                      height: '14px',
                    }}
                  />
                }
                key={index}
              />
            ))}
          </div>
          <span className="justify-self-end top-[12px] right-[16px]">
            <KeyboardArrowDown />
          </span>
        </div>
        {isItemsShow && (
          <div
            className="flex flex-col bg-[#FFFFFF0F] rounded-[8px] text-white"
            ref={dropdownRef}
          >
            {items
              .sort((a, b) => b.value - a.value)
              .filter((item) => !value.includes(item))
              .map((item: any, index: any) => (
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
