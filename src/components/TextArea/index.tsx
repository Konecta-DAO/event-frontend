import { Controller, Control, FieldError } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

interface InputProps {
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
export default function TextArea({
  name,
  error,
  control,
  rules,
  ...props
}: InputProps) {
  const errorClasses = ' border-[1px] border-solid border-[red]'
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <textarea
            rows={5}
            className={`scrollbar outline-none w-full bg-[#FFFFFF0F] text-white text-[16px] max-md:text-[13px] p-[12px] rounded-[8px]${
              error ? errorClasses : ''
            }`}
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
