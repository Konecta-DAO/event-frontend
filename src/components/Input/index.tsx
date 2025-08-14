import { Controller, Control, FieldError } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

interface InputProps {
  name: string
  error?: FieldError
  placeholder?: string
  value?: string
  control: Control<any>
  disabled?: boolean
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}
export default function Input({
  name,
  error,
  control,
  rules,
  disabled = false,
  ...props
}: InputProps) {
  const errorClasses = ' border-[1px] border-solid border-[red]'
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <input
            type="text"
            className={`outline-none bg-[#FFFFFF0F] text-white text-[16px] max-md:text-[13px] p-[12px] rounded-[8px] w-full disabled:bg-[#FFFFFF05] disabled:cursor-not-allowed ${
              error ? errorClasses : ''
            }`}
            disabled={disabled}
            {...props}
            {...field}
          />
          <em className="text-red-500">{error?.message}</em>
        </>
      )}
      rules={rules}
    />
  )
}
