import { KeyboardArrowDown } from '@mui/icons-material'
import { Autocomplete, Paper, TextField } from '@mui/material'

import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form'

interface InputProps {
  items: any[]
  name: string
  control: Control<any>
  onChange?: any
  renderOption?: any
  error?: FieldError
  placeholder?: string
  defaultValue?: string
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

export default function SearchableSingleSelect({
  items,
  name,
  control,
  error,
  // onChange: ignored,
  renderOption,
  rules,
  defaultValue,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-[8px] select-none max-md:!text-[13px] outline-none">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={items}
            popupIcon={<KeyboardArrowDown className="text-white" />}
            getOptionLabel={(option: string) => option}
            renderOption={(props, option, state) => (
              <li
                {...props}
                className="cursor-pointer hover:bg-white/20 p-[10px_28px]"
              >
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: 'white' } }}
                margin="normal"
                {...params}
                className="outline-none bg-[#FFFFFF0F] text-white text-[16px] max-md:text-[13px] p-[12px] rounded-[8px] w-full border-0"
              />
            )}
            PaperComponent={(props) => (
              <Paper
                sx={{
                  background: '#363548',
                  className: 'outline-none bg-[#FFFFFF0F]',
                  color: 'white',
                  fontSize: '25px',
                  '&:hover': {
                    className: 'cursor-pointer hover:bg-white/20 p-[10px_28px]',
                    color: 'white',
                  },
                }}
                {...props}
              />
            )}
            onChange={(e, data) => onChange(data)}
            defaultValue={defaultValue}
            {...props}
          />
        )}
      />
      <em className="text-red-500">{error?.message}</em>
    </div>
  )
}
