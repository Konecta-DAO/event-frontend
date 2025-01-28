import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddOutlined } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, TextField } from '@mui/material'
import country from 'country-list-js'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import ImageUploader from 'components/ImageUploader'
import MultiSelect from 'components/MultiSelect'
import SingleSelect from 'components/SingleSelect'
import Success from 'components/Modals/Success'
import { categories, countries, timezones } from 'utils/values'

import styles from './style.module.css'
import { FieldError, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { UserPayload } from 'entity/UserModel'
import SearchableSingleSelect from 'components/SearchableSingleSelect'
import userActorServiceInstance from 'services/userService'
import { saveUserProfile } from 'reduxStore/user/userAction'
import { setLoader } from 'reduxStore/auth/authAction'
import Notification from 'components/Modals/Notifications'
import { UserRequestModel } from 'entity/UserRequestModel'
import indexActorServiceInstance from 'services/indexService'
import { RootState } from 'reduxStore/store'

interface EditProfileInputs {
  id: string
  bio: string
  categories: [] | [string[]] | any
  timezone: string
  firstName: string
  country: string
  userName: string
  email: string
  profilepic: string
  coverphoto: string
  lastName: string
  introductionvideolink: string
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const userProfileSelector = (state: RootState) => state.user.userProfile!

export default function EditProfile() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(-1)
  const userProfile: UserPayload = useAppSelector(userProfileSelector)
  console.log('userProfile - EditProfile111', userProfile)

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EditProfileInputs>({
    defaultValues: {
      id: userProfile.id,
      bio: userProfile.bio,
      categories: userProfile.categories,
      // typeof userProfile.categories !== 'undefined' &&
      // userProfile.categories.length > 0
      //   ? userProfile.categories[0]
      //   : [],
      timezone: userProfile.timezone,
      firstName: userProfile.firstname,
      country: userProfile.country,
      userName: userProfile.username,
      email: userProfile.email,
      profilepic:
        userProfile.profilepic.length > 0
          ? userProfile.profilepic[0]?.fileId
          : '',
      coverphoto:
        userProfile.coverphoto.length > 0
          ? userProfile.coverphoto[0]?.fileId
          : '',
      lastName: userProfile.lastname,
      introductionvideolink: userProfile.introduction_video_link,
    },
  })
  const [profileImageFile, setProfileImageFile] = useState<File | null>()
  // userProfile.profilepic !== undefined && userProfile.profilepic.length > 0
  //   ? userProfile.profilepic[0] !== undefined
  //     ? new File([new Uint8Array(userProfile.profilepic[0])], 'profileImage')
  //     : null
  //   : null,
  const [coverImageFile, setCoverImageFile] = useState<File | null>()
  // userProfile.coverphoto !== undefined && userProfile.coverphoto.length > 0
  //   ? userProfile.coverphoto[0] !== undefined
  //     ? new File([new Uint8Array(userProfile.coverphoto[0])], 'coverphoto')
  //     : null
  //   : null,

  const [profileImageError, setProfileImageError] = useState<string>('')

  const handleCloseShowSuccess = () => {
    setShowSuccess(-1)
  }

  const handleUpdateProfile = async (data: any) => {
    try {
      dispatch(setLoader(true))
      const userUpdateReq = {
        id: userProfile.id,
        bio: typeof data.bio === 'string' ? [data.bio] : data.bio,
        categories: [data.categories],
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
          : userProfile.profilepic.length > 0 &&
            typeof userProfile.profilepic[0] !== 'undefined'
          ? [
              {
                fileName: userProfile.profilepic[0].fileName,
                fileType: userProfile.profilepic[0].fileType,
                fileDataObject: userProfile.profilepic[0].fileData,
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
          : userProfile.coverphoto.length > 0 &&
            typeof userProfile.coverphoto[0] !== 'undefined'
          ? [
              {
                fileName: userProfile.coverphoto[0].fileName,
                fileType: userProfile.coverphoto[0].fileType,
                fileDataObject: userProfile.coverphoto[0].fileData,
              },
            ]
          : [],
        lastname: data.lastName,
        introductionvideolink:
          typeof data.introductionvideolink === 'string'
            ? [data.introductionvideolink]
            : [],
      }

      const userUpdateResp = await userActorServiceInstance.updateUser(
        userUpdateReq,
      )
      console.log('userUpdateResp', userUpdateResp)

      const userData = await userActorServiceInstance.getUser() // store
      console.log('getUserResp - after editProfile', userData)
      if (userData) {
        console.log('getUser - logIn', userData)
        dispatch(saveUserProfile(userData))
      }
      dispatch(setLoader(false))
      setShowSuccess(1)
    } catch (e) {
      console.error('handleUpdateProfile error', e)
      dispatch(setLoader(false))
      setShowSuccess(0)
    } finally {
      dispatch(setLoader(false))
    }
  }

  const handleProfilePicFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const firstFile = e.target.files?.[0]
    if (firstFile) {
      const fileSize = firstFile.size
      const doesSizeExceed = fileSize > 2 * 1024 * 1024

      if (doesSizeExceed) {
        setProfileImageError('select file of size less than 2 MB')
        return
      }

      setProfileImageError('')
      console.log('setProfileImageFile - called - handleProfilePicFileChange')
      setProfileImageFile(firstFile)
    }
  }

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <div>
          <h1 className="font-[700] text-[36px] text-white">Edit Profile</h1>
        </div>
        <div className={styles.actions}>
          <Link
            to={`/profile/${userProfile.username}`}
            className="bg-[#FFFFFF0D]"
          >
            Back to profile
          </Link>
          <button
            className="bg-[#337FF5]"
            onClick={handleSubmit(handleUpdateProfile)}
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className="bg-[#363548] h-[1.5px]"></div>
      <div className={styles.content}>
        <div className="mx-[-32px] mb-[40px]"></div>
        <div className="flex flex-col">
          <div className="flex justify-between pb-[40px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="font-[500] text-[22px] text-white">
                Personal information
              </h3>
              <p className="font-[400] text-[18px] text-white/60">
                Update your photo and personal details here
              </p>
            </div>
            <form className="flex flex-col w-[55%]">
              <div className="flex flex-col gap-[20px] border-[#363548] pb-[12px] border-b w-full">
                <h4 className="font-[500] text-[16px] text-white">
                  Profile picture
                </h4>
                <div className="flex items-center gap-[24px]">
                  <Avatar
                    alt="avatar"
                    src={
                      profileImageFile
                        ? URL.createObjectURL(profileImageFile)
                        : userProfile.profilepic.length > 0 &&
                          typeof userProfile.profilepic[0] !== 'undefined' &&
                          userProfile.profilepic[0].fileId.length > 0
                        ? userActorServiceInstance.getUserImageUrl(
                            indexActorServiceInstance.userCanisterId,
                            userProfile.profilepic[0].fileId,
                          )
                        : ''
                    }
                    // src={
                    //   userProfile.profilepic.length > 0
                    //     ? userActorServiceInstance.getUserImageUrl(
                    //         indexActorServiceInstance.userCanisterId,
                    //         userProfile.profilepic,
                    //       )
                    //     : profileImageFile
                    //     ? URL.createObjectURL(profileImageFile)
                    //     : ''
                    // }
                    sx={{
                      width: '90px',
                      height: '90px',
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
                      onChange={handleProfilePicFileChange}
                    />
                    <label
                      htmlFor="upload-button"
                      className="flex flex-row gap-[12px] bg-[#29283C] p-[10px_24px] rounded-[8px] text-[14px] text-white"
                    >
                      Upload photo
                      <span>
                        <AddOutlined />
                      </span>
                    </label>

                    {profileImageError ? (
                      <em className="text-red-500">{profileImageError}</em>
                    ) : (
                      <p className="text-[#797985] text-[14px]">
                        Max size 2 MB
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-24px"></div>
              </div>
              <div className="flex flex-col gap-[20px] border-[#363548] py-[32px] border-b w-full">
                <p className="text-[16px] text-white font0-[500]">
                  Cover photo
                </p>
                <ImageUploader
                  onFileChange={setCoverImageFile}
                  // imgFile={coverImageFile}
                  imgFile={
                    coverImageFile ??
                    (userProfile.coverphoto.length > 0 &&
                    typeof userProfile.coverphoto[0] !== 'undefined' &&
                    userProfile.coverphoto[0].fileId.length > 0
                      ? userActorServiceInstance.getUserImageUrl(
                          indexActorServiceInstance.userCanisterId,
                          userProfile.coverphoto[0].fileId,
                        )
                      : '')
                  }
                />
              </div>
              <div className="flex flex-col gap-[32px] border-[#363548] py-[32px] border-b w-full">
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="font-[500] text-[16px] text-white">User name</p>
                  <Input
                    placeholder="User Name"
                    control={control}
                    name="userName"
                    error={errors?.userName}
                    // rules={{ required: 'User Name is required' }}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="font-[500] text-[16px] text-white">
                    First name
                  </p>
                  <Input
                    placeholder="First Name"
                    control={control}
                    name="firstName"
                    error={errors?.firstName}
                    rules={{ required: 'First Name is required' }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">
                    Last name
                  </p>
                  <Input
                    placeholder="Last Name"
                    control={control}
                    name="lastName"
                    error={errors?.lastName}
                    rules={{ required: 'Last Name is required' }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="font-[500] text-[16px] text-white">Email</p>
                  <Input
                    placeholder="Email"
                    control={control}
                    name="email"
                    error={errors?.email}
                    rules={{ required: 'Email is required' }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">Bio</p>
                  <TextArea
                    placeholder="Bio"
                    control={control}
                    name="bio"
                    error={errors?.bio}
                    rules={{ required: 'Bio is required' }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">
                    Introduction Video
                  </p>
                  <Input
                    placeholder="Add link for introduction video"
                    control={control}
                    name="introductionvideolink"
                    error={errors?.introductionvideolink}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">
                    Categories you are expert an in
                  </p>
                  <MultiSelect
                    items={categories.map((catObj) => catObj.caption)}
                    control={control}
                    name="categories"
                    rules={{
                      required: 'Select at least one category',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[32px] py-[32px] w-full">
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">Country</p>
                  <SearchableSingleSelect
                    items={countries}
                    name="country"
                    control={control}
                    error={errors?.country}
                    rules={{
                      required: 'Select one country',
                    }}
                    defaultValue={userProfile.country}
                  />
                </div>
                <div className="flex flex-col gap-[14px] w-full">
                  <p className="text-[16px] text-white font0-[500]">
                    Time zone
                  </p>
                  <SearchableSingleSelect
                    items={timezones}
                    name="timezone"
                    control={control}
                    error={errors?.timezone}
                    rules={{
                      required: 'Select one timezone',
                    }}
                    defaultValue={userProfile.timezone}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <Success isOpen={showSuccess} handleClose={handleCloseShowSuccess} /> */}
        {showSuccess !== -1 && (
          <Notification
            isOpen={true}
            handleClose={handleCloseShowSuccess}
            handleOk={() => {
              console.log('OK btn clicked')
              handleCloseShowSuccess()
              navigate(-1)
            }}
            iconID={showSuccess === 1 ? 2 : 1}
            boldText={showSuccess === 1 ? 'Success' : 'Error'}
            smallText={
              showSuccess === 1
                ? 'Profile edited successfully!'
                : 'Error while editing profile'
            }
            closeText={''}
            okText={'Ok'}
            okBtnColor={showSuccess === 1}
          />
        )}
      </div>
    </div>
  )
}
