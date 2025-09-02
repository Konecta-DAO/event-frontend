import {
  Controller,
  FieldError,
  Control,
  RegisterOptions,
} from 'react-hook-form'
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment'
import dayjs from 'dayjs'
import {
  getMomentFromNanoSeconds,
  getNanosecondsFromMoment,
} from 'utils/dateTimeUtils.ts'

interface InputProps {
  name: string
  error?: FieldError
  value?: bigint
  minDate?: bigint
  control: Control<any>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

const DateSelPicker = ({ control, error, minDate, ...props }: InputProps) => {
  return (
    // LocalizationProvider is required by MUI X Date Pickers.
    // It's best to place this at the root of your app (e.g., in App.tsx)
    // but works here for a self-contained component.
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={props.name}
        control={control}
        defaultValue={null}
        render={({ field }) => {
          const { onChange, value } = field

          // Convert bigint from react-hook-form to a dayjs object for the picker
          const selectedDate = value ? dayjs(getMomentFromNanoSeconds(value).toDate()) : null

          return (
            <div className="w-full">
              <DatePicker
                value={selectedDate}
                onChange={(newDate) => {
                  // On change, convert the new dayjs object back to a bigint
                  if (newDate) {
                    const newValue = getNanosecondsFromMoment(moment(newDate.toDate()))
                    onChange(newValue)
                  } else {
                    onChange(null)
                  }
                }}
                minDate={
                  minDate
                    ? dayjs(getMomentFromNanoSeconds(minDate).toDate())
                    : dayjs() // Default minDate to today if not provided
                }
                slotProps={{
                  textField: {
                    placeholder: 'Enter your birth date',
                    fullWidth: true,
                    sx: {
                      // Applying your custom styles here
                      '& .MuiInputBase-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        color: 'white',
                        '& input': {
                          color: 'white',
                          padding: '12px',
                          fontSize: '16px',
                          '@media (max-width: 768px)': {
                            fontSize: '13px',
                          },
                        },
                        '& fieldset': {
                          border: 'none', // Removes the default outline
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white', // Style for the calendar icon
                      },
                    },
                  },
                }}
              />
              <em className="text-red-500">{error?.message}</em>
            </div>
          )
        }}
        rules={props.rules}
      />
    </LocalizationProvider>
  )
}

export default DateSelPicker