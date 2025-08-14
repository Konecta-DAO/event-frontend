import { ChangeEvent, useRef, useState } from 'react'

interface ImageUploaderProps {
  imgFile?: File | string | null
  onFileChange: (imgFile: File | null) => void
  maxFileSizeInMB?: number
}

const ImageUploader: React.FC<ImageUploaderProps> = (
  props: ImageUploaderProps,
) => {
  const { onFileChange, imgFile = '', maxFileSizeInMB = 2 } = props

  const [error, setError] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const firstFile = e.target.files?.[0]

    if (firstFile) {
      const fileSize = firstFile.size
      const doesSizeExceed = fileSize > maxFileSizeInMB * 1024 * 1024
      if (doesSizeExceed) {
        setError(`select file of size less than ${maxFileSizeInMB} MB`)
        return
      }
      onFileChange?.(firstFile)
    }
  }

  const openPicker = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#29283C] rounded-[8px] w-full max-md:w-full max-w-[460px] h-[256px]">
        {imgFile ? (
          <img
            src={
              typeof imgFile === 'string'
                ? imgFile
                : URL.createObjectURL(imgFile)
            }
            onClick={openPicker}
            className="hover:opacity-70 w-[460px] max-md:w-full h-[256px] cursor-pointer object-contain"
          />
        ) : (
          <label
            htmlFor="image-upload"
            className="flex justify-center items-center hover:opacity-70 w-full h-full text-[#FFFFFF99] cursor-pointer"
            onClick={openPicker}
          >
            <p className="flex">PNG, JPG up to {maxFileSizeInMB}Mb</p>
          </label>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="visuallyhidden"
        onChange={handleFileChange}
      />
      {error ? <em className="text-red-500">{error}</em> : null}
    </>
  )
}

export default ImageUploader
