import { AddOutlined } from '@mui/icons-material'
import { Avatar, Box, SxProps, Theme, useMediaQuery } from '@mui/material'
import Input from 'components/Input'
import SearchableSingleSelect from 'components/SearchableSingleSelect'
import TextArea from 'components/TextArea'
import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { setLoader } from 'reduxStore/auth/authAction'
import { useAppDispatch } from 'reduxStore/hooks'
import { saveUserProfile } from 'reduxStore/user/userAction'
import indexActorServiceInstance from 'services/indexService'
import userActorServiceInstance from 'services/userService'
import { BackArrowIcon } from 'utils/svg-icons'
import { countries, timezones } from 'utils/values'
import { useIdentityKit } from '@nfid/identitykit/react'
import { HttpAgent, Identity } from '@dfinity/agent'

interface Props {
  handleClose: () => void
  onSignUpSuccess: () => void
  style?: SxProps<Theme>
  setTargets: React.Dispatch<React.SetStateAction<string[]>>
}

interface SignUpInputs {
  id: [] | [string]
  bio: [] | [string]
  categories: []
  timezone: string
  firstName: string
  country: string
  userName: string
  email: string
  profilepic: [] | [string]
  coverphoto: [] | [string]
  lastName: string
  introductionvideolink: [] | [string]
}

const handleNFIDSignUpAction = ({
  data,
  profileImageFile,
  coverImageFile,
  onSignUpSuccess,
  agent,
  identity,
  setTargets,
}: {
  data: SignUpInputs
  profileImageFile: File | null
  coverImageFile?: File | null
  onSignUpSuccess: () => void
  agent: HttpAgent
  identity: Identity
  setTargets: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoader(true))
      console.log(
        'signUp data111 - principalId',
        data,
        identity?.getPrincipal().toText(),
      )

      const signUpResp = await indexActorServiceInstance.userSignUp(
        data.userName,
      )
      console.log('signUpResp', signUpResp)

      const userAccountInfo =
        await indexActorServiceInstance.getUserAccountInfo()
      const userCanisterId = userAccountInfo?.canister_id
      console.log(
        'signUpResp - userAccountInfo - userCanisterId',
        userCanisterId,
      )
      if (
        typeof userAccountInfo === 'undefined' ||
        userCanisterId === undefined ||
        userCanisterId?.length === 0
      ) {
        return {
          type: 'user_canister_unavailable',
          success: false,
        }
      }

      if (userCanisterId) {
        console.log('signUpResp - userCanisterId', userCanisterId)
        setTargets((targets) => {
          const arr = [...targets, userCanisterId]
          return [...new Set(arr)]
        })
      }

      await indexActorServiceInstance.updateNFIDIdentity(
        agent,
        identity,
        userAccountInfo,
      )

      const userUpdateReq = {
        id: [],
        bio: typeof data.bio === 'undefined' ? [] : [data.bio],
        categories:
          typeof data.categories === 'undefined' ? [] : [data.categories],
        timezone: data.timezone,
        firstname: data.firstName,
        country: data.country,
        username: data.userName,
        email: data.email,
        profilepic: profileImageFile
          ? [
              {
                fileName: profileImageFile.name,
                fileType: profileImageFile.type,
                fileDataObject: Array.from(
                  new Uint8Array(await profileImageFile.arrayBuffer()),
                ),
              },
            ]
          : [],
        coverphoto: coverImageFile
          ? [
              {
                fileName: coverImageFile.name,
                fileType: coverImageFile.type,
                fileDataObject: Array.from(
                  new Uint8Array(await coverImageFile.arrayBuffer()),
                ),
              },
            ]
          : [],
        lastname: data.lastName,
        introductionvideolink: data.introductionvideolink,
      }
      console.log('userUpdateReq111 - signUp', userUpdateReq)

      const userUpdateResp = await userActorServiceInstance.updateUser(
        userUpdateReq,
      )
      console.log('userUpdateResp111 - signUp', userUpdateResp)

      const userData = await userActorServiceInstance.getUser()
      console.log('getUserResp - after signUp', userData)
      if (userData) {
        console.log('getUser - signUp', userData)
        dispatch(saveUserProfile(userData))
      }
      // const allPromise = []
      // allPromise.push(indexActorServiceInstance.eventActorInit())
      // allPromise.push(indexActorServiceInstance.konectaActorInit())
      // await Promise.all(allPromise)
      onSignUpSuccess()
      dispatch(setLoader(false))
    } catch (e) {
      console.log('handleSubmitClick - signUp', e)
      dispatch(setLoader(false))
    }
  }
}

const SignUpForm = ({
  handleClose,
  onSignUpSuccess,
  style,
  setTargets,
}: Props) => {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const dispatch = useAppDispatch()
  const { identity, user, agent, disconnect } = useIdentityKit()

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)

  const [profileImageError, setProfileImageError] = useState<string>('')

  const handleNFIDSignUp = (data: SignUpInputs) => {
    // console.log(
    //   'SignUpForm - handleNFIDSignUp - identity - user?.principal',
    //   identity,
    //   user?.principal,
    // )
    // if (
    //   identity !== undefined &&
    //   user?.principal &&
    //   user.principal.toText() !== '2vxsx-fae'
    // ) {
    dispatch(
      handleNFIDSignUpAction({
        data,
        profileImageFile: selectedImageFile,
        coverImageFile: null,
        onSignUpSuccess,
        agent,
        identity,
        setTargets,
      }),
    )
    // }
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>({
    defaultValues: {
      id: [],
      bio: [],
      categories: [],
      timezone: '',
      firstName: '',
      country: '',
      userName: '',
      email: '',
      profilepic: [],
      coverphoto: [],
      lastName: '',
      introductionvideolink: [],
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileSize = file.size
      const doesSizeExceed = fileSize > 2 * 1024 * 1024

      if (doesSizeExceed) {
        setProfileImageError('select file of size less than 2 MB')
        return
      }

      setProfileImageError('')
      setSelectedImageFile(file)
    }
  }

  return (
    <Box sx={style}>
      <div className="relative flex flex-col items-center bg-[#201F34] py-[20px] max-md:py-[14px] rounded-[12px] w-[600px] max-md:w-[310px] text-white select-none">
        {/* <button
          onClick={handleClose}
          className="top-[20px] max-md:top-[14px] left-[24px] absolute flex justify-center items-center bg-[#29283C] rounded-[8px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
        >
          <BackArrowIcon
            width={isonTabletOrMobile ? 10 : 14}
            height={isonTabletOrMobile ? 12 : 14}
          />
        </button> */}
        <div className="flex items-center border-[#29283C] px-[24px] pb-[20px] max-md:pb-[14px] border-b w-full h-[60px] max-md:h-[42px] text-center max-md:text-[14px]">
          <p className="w-full font-[600] text-[28px] text-white">
            Add your personal details
          </p>
        </div>
        <div className="w-full max-h-[60vh] overflow-y-auto scrollbar">
          <form className="flex flex-col gap-[32px] max-md:gap-[19px] px-[24px] py-[20px] max-md:py-[10px] w-full">
            <div className="flex flex-col items-center gap-[24px] max-md:gap-[14px] border-[#29283C] mx-[-24px] pb-[32px] max-md:pb-[20px] border-b">
              <Avatar
                alt="avatar"
                src={
                  selectedImageFile
                    ? URL.createObjectURL(selectedImageFile)
                    : ''
                }
                sx={{
                  width: { xs: '98px', md: '140px' },
                  height: { xs: '98px', md: '140px' },
                  background: '#29283C',
                  color: '#363548',
                }}
              />
              <div className="flex flex-col items-start gap-[12px]">
                <input
                  id="upload-button"
                  type="file"
                  accept="image/*"
                  className="visuallyhidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="upload-button"
                  className="flex flex-row items-center gap-[12px] bg-[#29283C] p-[10px_24px] rounded-[8px] max-md:text-[10px]"
                >
                  Upload photo
                  <span>
                    <AddOutlined
                      sx={{
                        width: { xs: '12px', md: '16px' },
                        height: { xs: '12px', md: '16px' },
                      }}
                    />
                  </span>
                </label>

                {profileImageError ? (
                  <em className="text-red-500">{profileImageError}</em>
                ) : (
                  <p className="text-[#797985] text-[14px]">Max size 2 MB</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[32px] max-md:gap-[14px] py-[10px] w-full max-md:!text-[13px]">
              <div className="flex flex-col gap-[14px]">
                <p>Username</p>
                <Input
                  placeholder="User Name"
                  control={control}
                  name="userName"
                  error={errors?.userName}
                  rules={{ required: 'Username is required' }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>First name</p>
                <Input
                  placeholder="First Name"
                  control={control}
                  name="firstName"
                  error={errors?.firstName}
                  rules={{ required: 'First Name is required' }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>Last name</p>
                <Input
                  placeholder="Last Name"
                  control={control}
                  name="lastName"
                  error={errors?.lastName}
                  rules={{ required: 'Last Name is required' }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>Email</p>
                <Input
                  placeholder="Email"
                  control={control}
                  name="email"
                  error={errors?.email}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: 'Email format is not correct',
                    },
                  }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>Bio</p>
                <TextArea
                  placeholder="Bio"
                  control={control}
                  name="bio"
                  error={errors?.bio as FieldError | undefined}
                  rules={{ required: 'Bio is required' }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>Country</p>
                <SearchableSingleSelect
                  items={countries}
                  name="country"
                  control={control}
                  error={errors?.country}
                  rules={{
                    required: 'Select one country',
                  }}
                />
              </div>
              <div className="flex flex-col gap-[14px]">
                <p>Timezone</p>
                <SearchableSingleSelect
                  items={timezones}
                  name="timezone"
                  control={control}
                  error={errors?.timezone}
                  rules={{
                    required: 'Select one timezone',
                  }}
                />
              </div>
              {/* <div className="flex flex-col gap-[14px]">
                  <p>Categories you are expert an in</p>
                  <MultiSelect
                    items={categories.map((catObj) => catObj.caption)}
                    control={control}
                    name="categories"
                    rules={{
                      required: 'Select at least one category',
                    }}
                  />
                </div> */}
            </div>
          </form>
        </div>
        <div className="flex justify-center border-[#29283C] px-[24px] pt-[40px] max-md:pt-[20px] pb-[20px] max-md:pb-[10px] border-t w-full">
          <button
            className="bg-[#337FF5] p-[19px] max-md:p-[12px] rounded-[11px] w-full max-md:w-[184px] text-[16px] max-md:text-[13px]"
            onClick={handleSubmit(handleNFIDSignUp)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </Box>
  )
}

export default SignUpForm
