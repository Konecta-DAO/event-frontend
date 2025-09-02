import { Control, FieldError, useController } from 'react-hook-form'
import {
  getMomentFromNanoSeconds,
  getNanosecondsFromMoment,
} from 'utils/dateTimeUtils.ts'

interface Props {
  name: string
  control: Control<any>
  error?: FieldError
}

export default function TimeInput(props: Props) {
  const {
    field: { value, onChange, ...restField },
  } = useController(props)

  return (
    <>
      <input
        type="time"
        className="bg-[#FFFFFF0F] p-[12px] rounded-[8px] text-[16px] text-white outline-none"
        value={getMomentFromNanoSeconds(value).format('HH:mm')}
        onChange={(e) => {
          onChange(
            getNanosecondsFromMoment(
              getMomentFromNanoSeconds(value).set({
                hours: parseInt(e.target.value.split(':')[0]),
                minutes: parseInt(e.target.value.split(':')[1]),
              }),
            ),
          )
        }}
        {...restField}
      />
      {props.error?.message ? (
        <em className="text-red-500">{props.error.message}</em>
      ) : null}
    </>
  )
}
