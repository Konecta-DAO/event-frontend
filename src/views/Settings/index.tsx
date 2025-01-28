import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import SingleSelect from 'components/SingleSelect'
import Button from 'components/Button'
import AddPaymentMethod from 'components/Modals/AddPaymentMethod'
import AntSwitch from 'components/AntSwitch'
import { languages } from 'utils/values'
import { EditIcon, ProtectIcon, VisaCardIcon } from 'utils/svg-icons'

import styles from './style.module.css'
import { AddOutlined } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'
import { useForm } from 'react-hook-form'

interface EditProfileInputs {
  firstName: string
  lastName: string
  email: string
  bio: string
  categories: string[]
}

export default function Settings() {
  const [addPaymentMethod, setAddPaymentMethod] = useState(false)
  const [isEvents, setIsEvents] = useState(true)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EditProfileInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      categories: [],
    },
  })

  const handlePaymentMethodClose = () => {
    setAddPaymentMethod(false)
  }

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <div>
          <h1 className="text-white text-[36px] max-md:text-[20px] font-[700]">
            Settings
          </h1>
        </div>
      </div>
      <div className="h-[1.5px] bg-[#FFFFFF1A] mb-[40px] max-md:mb-[12px]"></div>
      <div className="flex flex-col">
        <div className="flex justify-between pb-[40px] max-md:pb-[22px] border-b border-[#FFFFFF1A] max-md:flex-col max-md:gap-[20px]">
          <div className="flex flex-col gap-[8px] w-full">
            <h3 className="text-white text-[22px] m-0 max-md:text-[13px] font-[500] max-md:font-[400]">
              Security
            </h3>
            <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
              Protect your account and personal information <br /> with robust
              security measures.
            </p>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-[12px] border-b border-[#FFFFFF1A] pb-[32px] w-full">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
                    Email adress
                  </h3>
                  <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
                    The email address associated with your account
                  </p>
                </div>
                <p className="text-[#FF5245] max-md:text-[13px]">Unverified</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  DmytroDintsen@gmail.com
                </p>
                <Button
                  icon={<EditIcon width={18} height={18} />}
                  text={'Edit'}
                  variant="outlined"
                  width="fit"
                />
              </div>
            </div>
            <div className="flex flex-col border-b border-[#FFFFFF1A] py-[24px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
                    Email authentication
                  </h3>
                  <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
                    The email address associated with your account
                  </p>
                </div>
                <div>
                  <Button text={'Enable'} />
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-[#FFFFFF1A] py-[24px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
                    Password
                  </h3>
                  <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
                    Set a inique password to protect your personal account
                  </p>
                </div>
                <div>
                  <Button
                    text={'Change passwod'}
                    icon={<ProtectIcon width={18} height={18} />}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-[#FFFFFF1A] py-[24px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
                    Language
                  </h3>
                  <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
                    Customize how your masterclasses lookson your device
                  </p>
                </div>
                <div className="w-[120px]">
                  <SingleSelect
                    items={languages}
                    name={'timezone'}
                    control={control}
                    rules={{
                      required: 'Select one interests',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col py-[24px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
                    Delete account
                  </h3>
                  <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
                    This will delete your account. Your account will be
                    permanently <br /> deleted from Konecta.
                  </p>
                </div>
                <div>
                  <Button text={'Delete'} variant="none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-[40px] border-b border-[#FFFFFF1A]">
          <div className="flex flex-col gap-[8px] w-full max-md:w-[45%]">
            <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
              Payment method
            </h3>
            <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
              Securely manage your payment methods <br /> for hassle-free
              transactions and seamless <br /> purchasing experiences.
            </p>
          </div>
          <div className="flex flex-col w-full max-md:w-fit">
            {!isonTabletOrMobile && (
              <div className="flex border-b border-[#FFFFFF1A] pb-[32px]">
                <div className="flex justify-between bg-[#FFFFFF0D] rounded-[8px] w-full p-[16px_20px]">
                  <div className="flex gap-[80px] items-center">
                    <div className="flex gap-[16px] items-center">
                      <VisaCardIcon width={58} height={40} />
                      <p className="text-white">Visa ending in 1234</p>
                    </div>
                    <p className="text-[14px] text-white/60">Expiry 06/2024</p>
                  </div>
                  <div>
                    <Button
                      text={'Edit'}
                      onClick={() => setAddPaymentMethod(true)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex py-[32px] max-md:py-0">
              <Button
                text={`${
                  isonTabletOrMobile ? 'Add Wallet' : 'Add payment method'
                }`}
                icon={<AddOutlined />}
                onClick={() => setAddPaymentMethod(true)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between py-[40px] max-md:flex-col max-md:py-[20px] max-md:gap-[20px]">
          <div className="flex flex-col gap-[8px] w-full max-md:w-full">
            <h3 className="text-white text-[22px] font-[500] max-md:text-[13px] max-md:font-[400]">
              Email notification
            </h3>
            <p className="text-white/60 text-[18px] max-md:text-[12px] font-[400]">
              Get emails to find out what’s going on when
              <br /> you’re not online. You can turn these off.
            </p>
          </div>
          <div className="flex flex-col w-full gap-[40px] max-md:gap-[10px] max-md:w-full">
            <div className="flex gap-[16px]">
              <AntSwitch
                defaultChecked={isEvents}
                inputProps={{ 'aria-label': 'ant design' }}
                value={isEvents}
                onChange={(e) => {
                  setIsEvents(!isEvents)
                }}
              />
              <div className="flex flex-col gap-[4px]">
                <h4 className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  Events & Masterclasses
                </h4>
                <p className="text-white/80 text-[16px] max-md:text-[12px]">
                  Track the events and masterclasses you are following.
                </p>
              </div>
            </div>
            <div className="flex gap-[16px]">
              <AntSwitch
                defaultChecked={isEvents}
                inputProps={{ 'aria-label': 'ant design' }}
                value={isEvents}
                onChange={(e) => {
                  setIsEvents(!isEvents)
                }}
              />
              <div className="flex flex-col gap-[4px]">
                <h4 className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  Comments
                </h4>
                <p className="text-white/80 text-[16px] max-md:text-[12px]">
                  View and interact with comments on your events and
                  masterclasses.
                </p>
              </div>
            </div>
            <div className="flex gap-[16px]">
              <AntSwitch
                defaultChecked={isEvents}
                inputProps={{ 'aria-label': 'ant design' }}
                value={isEvents}
                onChange={(e) => {
                  setIsEvents(!isEvents)
                }}
              />
              <div className="flex flex-col gap-[4px]">
                <h4 className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  Reminders
                </h4>
                <p className="text-white/80 text-[16px] max-md:text-[12px]">
                  Receive notifications to stay updated on any missed updates.
                </p>
              </div>
            </div>
            <div className="flex gap-[16px]">
              <AntSwitch
                defaultChecked={isEvents}
                inputProps={{ 'aria-label': 'ant design' }}
                value={isEvents}
                onChange={(e) => {
                  setIsEvents(!isEvents)
                }}
              />
              <div className="flex flex-col gap-[4px]">
                <h4 className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  Subscriptions
                </h4>
                <p className="text-white/80 text-[16px] max-md:text-[12px]">
                  Explore events and masterclasses created by your
                  subscriptions.
                </p>
              </div>
            </div>
            <div className="flex gap-[16px]">
              <AntSwitch
                defaultChecked={isEvents}
                inputProps={{ 'aria-label': 'ant design' }}
                value={isEvents}
                onChange={(e) => {
                  setIsEvents(!isEvents)
                }}
              />
              <div className="flex flex-col gap-[4px]">
                <h4 className="text-white text-[18px] max-md:text-[13px] font-[500]">
                  Invitations
                </h4>
                <p className="text-white/80 text-[16px] max-md:text-[12px]">
                  Discover events and masterclasses to which you have been
                  invited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddPaymentMethod
        isOpen={addPaymentMethod}
        handleClose={handlePaymentMethodClose}
      />
    </div>
  )
}
