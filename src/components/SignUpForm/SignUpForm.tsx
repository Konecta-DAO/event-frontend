import { AddOutlined } from '@mui/icons-material'
import { Avatar, Box, SxProps, Theme, useMediaQuery } from '@mui/material'
import { HttpAgent } from '@dfinity/agent'
import { useIdentityKit } from '@nfid/identitykit/react'
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
import { countries, timezones } from 'utils/values'

interface Props {
  handleClose: () => void
  onSignUpSuccess: () => void
  style?: SxProps<Theme>
  setTargets: React.Dispatch<React.SetStateAction<string[]>>
}

interface SignUpInputs {
  id: [] | [string]
  bio: string
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

/**
 * Flow 1: For a BRAND NEW user.
 * This calls the index canister to create a user record and a new canister.
 * It only uses the username, as per your `userSignUp` function.
 */
const handleNewUserCreationAction = ({
  data,
  onSignUpSuccess,
}: {
  data: SignUpInputs
  onSignUpSuccess: () => void
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoader(true))
      console.log(
        'NEW_USER_FLOW: Starting new user creation with username:',
        data.userName,
      )

      // 1. Call userSignUp. This will return the new canister ID string on success or throw on failure.
      const newUserCanisterId = await indexActorServiceInstance.userSignUp(
        data.userName,
      )
      console.log('NEW_USER_FLOW: New user canister created:', newUserCanisterId)

      // 2. Store the new ID so the IdentityKitProvider can find it after the required page reload.
      localStorage.setItem('userCanisterId', newUserCanisterId)

      // 3. Trigger the success callback, which handles the logout/reload flow.
      onSignUpSuccess()
    } catch (e) {
      console.error('An error occurred during new user creation:', e)
      // NOTE: You can dispatch an action here to show an error modal to the user
      // with the message from 'e', which might be "Username already taken."
    } finally {
      dispatch(setLoader(false))
    }
  }
}

/**
 * Flow 2: For a user who exists in the index but has an EMPTY PROFILE.
 * This function saves the profile details to their existing user canister.
 */
const handleProfileCompletionAction = ({
  data,
  profileImageFile,
  onSignUpSuccess,
  agent,
}: {
  data: SignUpInputs
  profileImageFile: File | null
  onSignUpSuccess: () => void
  agent: HttpAgent
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoader(true))
      console.log('PROFILE_COMPLETION_FLOW: Starting profile completion...')

      const userCanisterId = indexActorServiceInstance.userCanisterId
      if (!userCanisterId) {
        throw new Error('User canister ID not found. Cannot complete profile.')
      }

      await userActorServiceInstance.initWithAgent(userCanisterId, agent)

      const upsertPayload: any = {
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.userName,
        email: data.email,
        country: data.country,
        timezone: data.timezone,
        bio: data.bio ? [data.bio] : [],
        categories: data.categories || [],
        introduction_video_link: data.introductionvideolink,
        profilepic: profileImageFile,
        coverphoto: null,
      }

      await userActorServiceInstance.upsertUser(upsertPayload)
      const updatedProfile = await userActorServiceInstance.getUser()
      if (updatedProfile) {
        dispatch(saveUserProfile(updatedProfile))
      }

      onSignUpSuccess()
    } catch (e) {
      console.error('An error occurred during profile completion:', e)
    } finally {
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
  const { agent } = useIdentityKit()
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [profileImageError, setProfileImageError] = useState<string>('')

  const handleNFIDSignUp = (data: SignUpInputs) => {
    if (!agent) {
      console.error('Agent not available.')
      return
    }

    // This is the key logic that differentiates between the two flows.
    const existingUserCanisterId = indexActorServiceInstance.userCanisterId

    if (existingUserCanisterId) {
      // Flow 2: The user exists, so we just complete their profile.
      console.log(
        'SignUpForm: Detected existing canister. Running profile completion.',
      )
      dispatch(
        handleProfileCompletionAction({
          data,
          profileImageFile: selectedImageFile,
          onSignUpSuccess,
          agent,
        }),
      )
    } else {
      // Flow 1: This is a brand new user.
      console.log('SignUpForm: No existing canister. Running new user creation.')
      dispatch(
        handleNewUserCreationAction({
          data,
          onSignUpSuccess,
        }),
      )
    }
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>({
    defaultValues: {
      id: [],
      bio: '',
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