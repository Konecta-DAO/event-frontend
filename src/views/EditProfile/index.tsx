import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import Input from 'components/Input/index.tsx'
import TextArea from 'components/TextArea/index.tsx'
import ImageUploader from 'components/ImageUploader/index.tsx'
import MultiSelect from 'components/MultiSelect/index.tsx'

import { categories, countries, timezones } from 'utils/values.tsx'

import styles from './style.module.css'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks.tsx'
import SearchableSingleSelect from 'components/SearchableSingleSelect/index.tsx'
import userActorServiceInstance from 'services/userService.tsx'
import { saveUserProfile } from 'reduxStore/user/userAction.tsx'
import { setLoader } from 'reduxStore/auth/authAction.tsx'
import Notification from 'components/Modals/Notifications/index.tsx'
import { RootState } from 'reduxStore/store.tsx'
import type { UserPayload } from 'candid/ts/user.did.d.ts'

interface EditProfileInputs {
  principal_id: string
  bio: string
  categories: string[]
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

const userProfileSelector = (state: RootState) => state.user.userProfile;

export default function EditProfile() {
  console.log("EDIT_PROFILE: Component rendering...");
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(-1)
  const userProfile: UserPayload | undefined = useAppSelector(userProfileSelector)
  console.log("EDIT_PROFILE: User profile from Redux:", userProfile);

  console.log("EDIT_PROFILE: Initializing useForm...");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProfileInputs>({
    defaultValues: {
      principal_id: userProfile?.principal_id.toText() ?? '',
      bio: userProfile?.bio?.[0] ?? '',
      categories: userProfile?.categories ?? [],
      timezone: userProfile?.timezone ?? '',
      firstName: userProfile?.firstname ?? '',
      country: userProfile?.country ?? '',
      userName: userProfile?.username ?? '',
      email: userProfile?.email ?? '',
      profilepic: userProfile?.profilepic?.[0] ?? '',
      coverphoto: userProfile?.coverphoto?.[0] ?? '',
      lastName: userProfile?.lastname ?? '',
      introductionvideolink: userProfile?.introduction_video_link?.[0] ?? '',
    },
  })
  console.log("EDIT_PROFILE: useForm initialized successfully.");

  const [profileImageFile, setProfileImageFile] = useState<File | null>()
  const [coverImageFile, setCoverImageFile] = useState<File | null>()
  const [profileImageError, setProfileImageError] = useState<string>('')

  const handleCloseShowSuccess = () => {
    if (showSuccess === 1) {
      navigate('/calendar', { replace: true });
    }
    setShowSuccess(-1)
  }

  const handleUpdateProfile = useCallback(async (data: EditProfileInputs) => {
    try {
      dispatch(setLoader(true));
      const upsertPayload: any = {
        id: userProfile?.principal_id ? userProfile.principal_id : [],
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.userName,
        email: data.email,
        country: data.country,
        timezone: data.timezone,
        bio: data.bio ? [data.bio] : [],
        categories: data.categories,
        introduction_video_link: data.introductionvideolink ? [data.introductionvideolink] : [],
      };

      if (profileImageFile) {
        upsertPayload.profilepic = profileImageFile;
      }
      if (coverImageFile) {
        upsertPayload.coverphoto = coverImageFile;
      }

      const upsertResponse = await userActorServiceInstance.upsertUser(upsertPayload);
      console.log('Response from upsertUser:', upsertResponse);

      const updatedUserData = await userActorServiceInstance.getUser();
      if (updatedUserData) {
        dispatch(saveUserProfile(updatedUserData));
        setShowSuccess(1);
      } else {
        throw new Error("Failed to fetch profile after update.");
      }
    } catch (e) {
      console.error('handleUpdateProfile error', e);
      setShowSuccess(0);
    } finally {
      dispatch(setLoader(false));
    }
  }, [dispatch, userProfile?.principal_id, profileImageFile, coverImageFile, navigate, setShowSuccess]);

  const handleProfilePicFileChange = useCallback((
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
      setProfileImageFile(firstFile)
    }
  }, []);

  console.log("EDIT_PROFILE: Reaching return statement.");
  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <div>
          <h1 className="font-[700] text-[36px] text-white">Edit Profile</h1>
        </div>
        <div className={styles.actions}>
          <Link
            to={userProfile?.username ? `/profile/${userProfile.username}` : '/calendar'}
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
                        : userProfile?.profilepic?.[0]
                          ? userActorServiceInstance.getUserImageUrl(
                            userProfile.canister_id.toString(),
                            userProfile.profilepic[0],
                          )
                          : ''
                    }
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
                      className="flex flex-row items-center gap-[12px] bg-[#29283C] p-[10px_24px] rounded-[8px] text-[14px] text-white cursor-pointer"
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
                  imgFile={
                    coverImageFile ??
                    (userProfile?.coverphoto?.[0]
                      ? userActorServiceInstance.getUserImageUrl(
                        userProfile.canister_id.toString(),
                        userProfile.coverphoto[0],
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
                    defaultValue={userProfile?.country}
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
                    defaultValue={userProfile?.timezone}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {showSuccess !== -1 && (
          <Notification
            isOpen={true}
            handleClose={handleCloseShowSuccess}
            handleOk={handleCloseShowSuccess}
            iconID={showSuccess === 1 ? 2 : 1}
            boldText={showSuccess === 1 ? 'Success' : 'Error'}
            smallText={
              showSuccess === 1
                ? 'Profile updated successfully!'
                : 'Error while updating profile'
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