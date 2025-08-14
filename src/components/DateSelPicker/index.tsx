import {
  Controller,
  FieldError,
  Control,
  RegisterOptions,
} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  getMomentFromNanoSeconds,
  getNanosecondsFromMoment,
} from 'utils/dateTimeUtils'

interface InputProps {
  name: string
  error?: FieldError
  value?: string
  minDate?: bigint
  control: Control<any>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

const DateSelPicker = ({ control, error, minDate, ...props }: InputProps) => {
  return (
    <>
      <Controller
        name={props.name}
        control={control}
        defaultValue={new Date()}
        render={({ field }) => {
          const { onChange, value } = field
          return (
            <div className="w-full">
              <DatePicker
                onChange={(e) => {
                  const newValue = getNanosecondsFromMoment(
                    getMomentFromNanoSeconds(value).set({
                      date: e?.getDate(),
                      month: e?.getMonth(),
                      year: e?.getFullYear(),
                    }),
                  )
                  onChange(newValue)
                }}
                selected={getMomentFromNanoSeconds(value).toDate()}
                placeholderText="Enter your birth date"
                className="bg-[#FFFFFF0F] p-[12px] rounded-[8px] w-full text-[16px] text-white outline-none"
                wrapperClassName="w-full"
                minDate={
                  minDate
                    ? getMomentFromNanoSeconds(minDate).toDate()
                    : new Date()
                }
              />
              <em className="text-red-500">{error?.message}</em>
            </div>
          )
        }}
      />
    </>
  )
}

export default DateSelPicker
