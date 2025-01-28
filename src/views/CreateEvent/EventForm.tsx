/* eslint no-useless-escape: "error" */
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import ImageUploader from 'components/ImageUploader'
import MultiSelect from 'components/MultiSelect'
import DateSelPicker from 'components/DateSelPicker'
import TimeInput from 'components/TimeInput'
import SingleSelect from 'components/SingleSelect'
import {
  languages,
  eventTypes,
  categories,
  interests2,
  EventType,
  priceCourses,
  eventLocationLinkRegexp,
  participationTypes,
} from 'utils/values'

import styles from './style.module.css'
import { Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form'
import InfoIcon from '@mui/icons-material/Info'
import moment from 'moment'
import indexActorServiceInstance from 'services/indexService'
import { CreateEventInputs, EventRequestModel } from 'entity/EventRequestModel'
import { Principal } from '@dfinity/principal'
import eventActorServiceInstance from 'services/eventService'
import Notification from 'components/Modals/Notifications'
import { setLoader } from 'reduxStore/auth/authAction'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import {
  EventRequestState,
  resetEventRequest,
  setEventRequestStart,
  setEventRequestState,
  setEventRequestSuccess,
  setUserEventDetail,
  setUserEvents,
} from 'reduxStore/event/eventAction'
import konectaActorServiceInstance from 'services/konectaService'
import userActorServiceInstance from 'services/userService'
import { FileOutputType } from 'entity/FileOutputType'
import { getCKBTCApproval, getICPApproval } from 'services/paymentService'
import {
  getMomentFromNanoSeconds,
  getNanosecondsFromMoment,
} from 'utils/dateTimeUtils'
import {
  CheckEventExistsPayload,
  FeedDetailsPayload,
} from 'candid/ts/konecta.did'
import { useIdentityKit } from '@nfid/identitykit/react'

const EventForm = ({ handleClose }: { handleClose?: () => void }) => {
  const dispatch = useAppDispatch()
  const [selectedEventType, setEventType] = useState<EventType>('request')
  const [possibleInterests, setPossibleInterests] = useState<string[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState(-1)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { event_id } = useParams()
  // console.log('event_id - CreateEvent111 ', event_id)

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [existingCoverImageFile, setExistingCoverImageFile] =
    useState<FileOutputType | null>(null)

  const principalId = useAppSelector((state) => {
    return state.auth.pid
  })
  const userEventDetail = useAppSelector((state) => {
    return state.event.userEventDetail
  })

  const navigate = useNavigate()

  const currentTimeMomentRef = useRef(moment())

  const formDefaultValue = useMemo(
    () => ({
      name: event_id && userEventDetail ? userEventDetail.name : '',
      description:
        event_id && userEventDetail ? userEventDetail.description : '',
      categories: event_id && userEventDetail ? userEventDetail.categories : [],
      interests: event_id && userEventDetail ? userEventDetail.interests : [],
      startDate:
        event_id && userEventDetail
          ? userEventDetail.start_date
          : getNanosecondsFromMoment(currentTimeMomentRef.current),
      endDate:
        event_id && userEventDetail
          ? userEventDetail.end_date
          : getNanosecondsFromMoment(
              currentTimeMomentRef.current.add(1, 'hour'),
            ),
      priceCourse:
        event_id && userEventDetail ? userEventDetail.price_token : '',
      price: event_id && userEventDetail ? userEventDetail.token_amount : 0,
      language: event_id && userEventDetail ? userEventDetail.language : '',
      email: event_id && userEventDetail ? userEventDetail.userData.email : '',
      location: event_id && userEventDetail ? userEventDetail.location : '',
      yearsOfExperience:
        event_id && userEventDetail ? userEventDetail.expertise : '',
      consultations:
        event_id && userEventDetail
          ? userEventDetail.consultations.join(', ')
          : '',
      showcaselink:
        event_id && userEventDetail ? userEventDetail.showcase_link : '',
      participationType:
        event_id && userEventDetail
          ? userEventDetail.participation_type
          : participationTypes[0],
    }),
    [event_id, userEventDetail],
  )

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    reset,
    setValue,
    getValues,
  } = useForm<CreateEventInputs>({
    defaultValues: formDefaultValue,
  })

  const fetchEventDetails = async (eventId: string) => {
    try {
      dispatch(setLoader(true))
      dispatch(setUserEventDetail(undefined))
      const eventDetails: FeedDetailsPayload =
        await konectaActorServiceInstance.getFeedDetailsByEventId(eventId)
      console.log('eventDetails - getFeedDetailsByEventId', eventDetails)
      if (typeof eventDetails !== 'undefined') {
        dispatch(setUserEventDetail(eventDetails))
        console.log('setEvent - eventDetails.ok - CreateEvent111', eventDetails)

        if (eventDetails.event_type === 'Request') {
          setEventType('request')
        } else {
          setEventType('offer')
        }
      }
    } catch (e) {
      dispatch(setLoader(false))
      console.log('error - getFeedDetailsByEventId', e)
    }
  }

  const fetchImageDetails = async (fileId: string) => {
    if (fileId.length === 0) {
      return
    }

    const coverDetails = await eventActorServiceInstance.getFile(fileId)
    if (typeof coverDetails !== 'undefined' && coverDetails?.length > 0) {
      setExistingCoverImageFile(coverDetails[0])
    }
  }

  const fetchUserEventDetails = async () => {
    console.log(
      'event_id - userEventDetail - CreateEvent111',
      event_id,
      userEventDetail,
    )

    dispatch(setLoader(true))
    if (
      typeof userEventDetail !== 'undefined' &&
      typeof event_id !== 'undefined'
    ) {
      if (userEventDetail?.event_id !== event_id) {
        await fetchEventDetails(event_id)
      } else if (userEventDetail?.event_type === 'Offer') {
        setEventType('offer')
      } else {
        setEventType('request')
      }
      await fetchImageDetails(userEventDetail.coverphoto)
    } else if (typeof event_id !== 'undefined') {
      await fetchEventDetails(event_id)
      if (typeof userEventDetail !== 'undefined') {
        await fetchImageDetails(userEventDetail.coverphoto)
      }
    } else {
      setEventType('request')
    }
    dispatch(setLoader(false))
  }

  useEffect(() => {
    if (typeof event_id !== 'undefined') {
      fetchUserEventDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_id])

  useEffect(() => {
    if (typeof event_id !== 'undefined') {
      // console.log('useEffect resetting form to updated value', formDefaultValue)
      reset(formDefaultValue)
    }
  }, [event_id, formDefaultValue, reset])

  // if (isLoading) {
  //   return (
  //     <div className={styles.feedDetail}>
  //       {isLoading ? <Spinner size="medium" /> : ''}
  //     </div>
  //   )
  // }

  const priceCourseValue = watch('priceCourse')
  const selectedStartDate = watch('startDate')

  useEffect(() => {
    if (priceCourseValue === 'FREE') {
      setValue('price', 0)
    }
  }, [priceCourseValue, setValue])

  useEffect(() => {
    const currentEndDate = getValues('endDate')
    if (currentEndDate < selectedStartDate) {
      setValue(
        'endDate',
        getNanosecondsFromMoment(
          getMomentFromNanoSeconds(selectedStartDate).add(1, 'hour'),
        ),
      )
    }
  }, [getValues, selectedStartDate, setValue])

  const handleCloseShowSuccess = () => {
    if (showSuccess !== 0) {
      reset()
      navigate('/calendar')
    }
    setShowSuccess(-1)
  }

  const selectedCategories = watch('categories')
  useEffect(() => {
    let possInterests: string[] = []
    interests2.forEach((interest) => {
      if (selectedCategories.includes(interest.category)) {
        possInterests = [...possInterests, ...interest.values]
      }
    })
    possInterests.push('Other')
    setPossibleInterests(possInterests)
  }, [selectedCategories])

  const { agent } = useIdentityKit()

  const handleSubmitClick = async (data: CreateEventInputs) => {
    try {
      dispatch(resetEventRequest())

      const fullStartDateMoment = getMomentFromNanoSeconds(data.startDate)
      const fullEndDateMoment = getMomentFromNanoSeconds(data.endDate)

      // check the start time is not after end time
      if (fullEndDateMoment.isBefore(fullStartDateMoment)) {
        setError(
          'endDate',
          {
            message: 'End date time must be after start date time',
          },
          { shouldFocus: true },
        )
        dispatch(setLoader(false))
        return
      }

      if (typeof indexActorServiceInstance.userCanisterId === 'undefined') {
        dispatch(setLoader(false))
        throw "User Canister Id is not available. Can't create event."
      }

      const eventRequestStatus =
        typeof event_id === 'undefined' ||
        typeof userEventDetail === 'undefined'
          ? { Draft: null }
          : userEventDetail.status === 'Created'
          ? { Created: null }
          : { Draft: null }

      const eventStatus =
        data.priceCourse === 'FREE'
          ? { Created: null }
          : selectedEventType === 'request'
          ? eventRequestStatus
          : { Created: null }

      const eventCreateOrUpdateReq: EventRequestModel = {
        status: eventStatus,
        metadata: [],
        name: data.name,
        description: data.description,
        end_date: getNanosecondsFromMoment(fullEndDateMoment),
        // user_id: [Principal.fromText(indexActorServiceInstance.userCanisterId)],
        user_id: [Principal.fromText(principalId)],
        language:
          typeof data.language !== 'undefined' && data.language.length > 0
            ? [data.language]
            : [],
        start_date: getNanosecondsFromMoment(fullStartDateMoment),
        location: data.location,
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
          : existingCoverImageFile
          ? [
              {
                fileName: existingCoverImageFile.fileName,
                fileType: existingCoverImageFile.fileType,
                fileDataObject: existingCoverImageFile.fileData,
              },
            ]
          : [],
      }
      console.log('eventCreateReq - createEvent - formdata', data)
      console.log('eventCreateReq - createEvent', eventCreateOrUpdateReq)
      console.log('eventCreateReq - createEvent - principalId111', principalId)

      dispatch(setEventRequestStart(moment.now()))

      // close modal if mobile
      if (handleClose) {
        handleClose()
      }

      // then redirect
      navigate('/calendar')

      if (typeof event_id === 'undefined' || event_id === '') {
        const checkEventExistsPayload: CheckEventExistsPayload = {
          end_date: eventCreateOrUpdateReq.end_date,
          start_date: eventCreateOrUpdateReq.start_date,
          event_type:
            selectedEventType === 'request'
              ? { Request: null }
              : { Offer: null },
        }
        console.log(
          'checkEventExistsPayload - createEvent111',
          checkEventExistsPayload,
        )
        const isEventExists =
          await konectaActorServiceInstance.checkIfEventExistsForTheDay(
            checkEventExistsPayload,
          )
        console.log('isEventExists - createEvent111', isEventExists)
        if (isEventExists) {
          dispatch(setLoader(false))
          throw 'Event already exists for the selected date and time. Please select a different date and time.'
        }

        const eventCreateResp = await eventActorServiceInstance.createEvent(
          principalId,
          selectedEventType,
          indexActorServiceInstance.userCanisterId,
          eventCreateOrUpdateReq,
          data,
        )
        console.log('eventCreateResp - createEvent111', eventCreateResp)

        if (typeof eventCreateResp.createKonectaEventResp === 'undefined') {
          throw "Error while creating event. Can't proceed further."
        }
        const subAccountHex = eventCreateResp.createKonectaEventResp
        console.log('subAccountHex - createEvent111', subAccountHex)

        if (selectedEventType === 'request' && data.priceCourse !== 'FREE') {
          if (data.priceCourse === 'ICP') {
            await getICPApproval(
              principalId,
              subAccountHex,
              eventCreateResp.eventId,
              data.price,
              agent,
            )
          } else {
            await getCKBTCApproval(
              principalId,
              subAccountHex,
              eventCreateResp.eventId,
              data.price,
              agent,
            )
          }
        }
      } else {
        const eventUpdateResp = await eventActorServiceInstance.updateEvent(
          event_id,
          principalId,
          selectedEventType,
          indexActorServiceInstance.userCanisterId,
          eventCreateOrUpdateReq,
          data,
          userEventDetail,
        )
        console.log('eventUpdateResp - createEvent111', eventUpdateResp)
        await fetchEventDetails(event_id)
      }
      // check if eventCreateResp has "Failed" word in it

      // update calendar events for this user
      const userEvents =
        await userActorServiceInstance.getAllEventsMetadataForUser()
      console.log('userEvents - createEvent111', userEvents)
      if (typeof userEvents.ok !== 'undefined') {
        console.log(
          'userEvents - createEvent111 - getAllEventsMetadataForUser - storing to redux',
        )
        dispatch(setUserEvents(userEvents.ok))
      }

      // // update profile event tabs feed for this user
      // if (selectedEventType === 'request') {
      //   const userServiceRequests =
      //     await konectaActorServiceInstance.getMyServiceRequests()
      //   console.log(
      //     'createEvent111 - getMyServiceRequests',
      //     userServiceRequests,
      //   )
      //   if (typeof userServiceRequests.ok !== 'undefined') {
      //     dispatch(setUserRequests(userServiceRequests.ok, pid))
      //   }
      // } else {
      //   const userServiceOffers =
      //     await konectaActorServiceInstance.getMyServiceOffers()
      //   console.log('createEvent111 - getMyServiceOffers', userServiceOffers)
      //   if (typeof userServiceOffers.ok !== 'undefined') {
      //     dispatch(setUserOffers(userServiceOffers.ok, pid))
      //   }
      // }

      dispatch(setEventRequestSuccess())
    } catch (e) {
      console.error('handleSubmitClick - event create error', e)
      dispatch(setEventRequestState(EventRequestState.error))
    } finally {
      dispatch(setLoader(false))
    }
  }

  return (
    <>
      <div className={styles.createEvent}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            {event_id ? 'Update event' : 'Create event'}
          </h1>
          <div className={styles.actions}>
            <Link to={'/feeds'} className="bg-[#FFFFFF0D]">
              Back
            </Link>
            <button
              className="bg-[#337FF5]"
              onClick={handleSubmit(handleSubmitClick)}
            >
              {event_id ? 'Update event' : 'Create event'}
            </button>
          </div>
        </div>
        <div className={styles.formBodyWrapper}>
          <div className={styles.form}>
            <div className={styles.form}>
              <div className={styles.formSection}>
                <div className={styles.formSectionLabelContainer}>
                  <h3 className={styles.title}>Choose event type</h3>
                  <p className={styles.subtitle}>
                    Download the product you want to sell
                  </p>
                </div>
                <div className={styles.formSectionValueContainer}>
                  {eventTypes.map((item, index) => (
                    <div
                      onClick={() => {
                        setEventType(item.type)
                        if (item.type === 'request') {
                          setValue('participationType', participationTypes[0])
                        }
                      }}
                      className={`${styles.eventTypeContainer} ${
                        item.type === selectedEventType
                          ? 'bg-[#337FF5]/20 border-[#337FF5]'
                          : 'bg-[#29283C] border-[#363548]'
                      }`}
                      key={index}
                    >
                      {item.icon}
                      <div className={styles.eventTypeLabelContainer}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.subtitle}>{item.des}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formSection}>
                <div className={styles.formSectionLabelContainer}>
                  <h3 className={styles.title}>
                    {
                      eventTypes.find(
                        (item: any) => item.type === selectedEventType,
                      )?.title
                    }
                  </h3>
                  <p className={styles.subtitle}>
                    {
                      eventTypes.find(
                        (item: any) => item.type === selectedEventType,
                      )?.des
                    }
                  </p>
                </div>
                <form className={styles.formSectionValueContainer}>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>
                      {selectedEventType === 'request'
                        ? 'Request cover'
                        : 'Service offer cover'}
                    </p>
                    <ImageUploader
                      imgFile={
                        coverImageFile ??
                        (typeof event_id !== 'undefined' &&
                        typeof userEventDetail !== 'undefined' &&
                        userEventDetail?.coverphoto.length > 0
                          ? eventActorServiceInstance.getEventCoverImageUrl(
                              userEventDetail.coverphoto,
                            )
                          : '')
                      }
                      onFileChange={setCoverImageFile}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>
                      {selectedEventType === 'request'
                        ? 'Request name'
                        : 'Service offer name'}
                    </p>
                    <Input
                      control={control}
                      name="name"
                      error={errors?.name}
                      rules={{
                        required:
                          (selectedEventType === 'request'
                            ? 'Request name'
                            : 'Service offer name') + ' is required',
                      }}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>
                      {selectedEventType === 'request'
                        ? 'Request description'
                        : 'Service offer description'}
                    </p>
                    <TextArea
                      control={control}
                      name="description"
                      error={errors?.description}
                      rules={{
                        required:
                          (selectedEventType === 'request'
                            ? 'Request description'
                            : 'Service offer description') + ' is required',
                      }}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>Category</p>
                    <MultiSelect
                      items={categories.map((catObj) => catObj.caption)}
                      control={control}
                      name="categories"
                      rules={{
                        required: 'Select at least one category',
                      }}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>Topics</p>
                    <MultiSelect
                      items={possibleInterests}
                      control={control}
                      name="interests"
                      rules={{
                        required: 'Select at least one topic',
                      }}
                    />
                  </div>
                  {selectedEventType === 'offer' && (
                    <>
                      <div className={styles.inputGroup}>
                        <p className={styles.title}>Your expertise (years)</p>
                        <Input
                          control={control}
                          name="yearsOfExperience"
                          placeholder="10+"
                          error={errors?.yearsOfExperience}
                          rules={{
                            required: 'Experience is required',
                            pattern: {
                              value: /^\d+(\.\d{1,2})?\+?$/,
                              message:
                                'Mention your experience in years, use numbers only',
                            },
                          }}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <p className={styles.title}>Types of consultations</p>
                        <Input
                          control={control}
                          name="consultations"
                          error={errors?.consultations}
                          placeholder="Career, Relationship, Health"
                          rules={{
                            required:
                              'Type of consultations provided is required',
                          }}
                        />
                      </div>
                    </>
                  )}
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>Showcase link</p>
                    <Input
                      control={control}
                      name="showcaselink"
                      error={errors?.showcaselink}
                      placeholder="Leave a video link event presentation if you like"
                    />
                  </div>
                  <div className={styles.splitInputGroup}>
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>Start date</p>
                      <DateSelPicker
                        name="startDate"
                        control={control}
                        rules={{
                          required: 'Select start date',
                        }}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>Start Time</p>
                      <TimeInput control={control} name="startDate" />
                    </div>
                  </div>
                  <div className={styles.splitInputGroup}>
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>End date</p>
                      <DateSelPicker
                        name="endDate"
                        control={control}
                        rules={{
                          required: 'Select start date',
                        }}
                        minDate={selectedStartDate}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>End Time</p>
                      <TimeInput
                        control={control}
                        name="endDate"
                        error={errors.endDate}
                      />
                    </div>
                  </div>
                  <div className={styles.splitInputGroup}>
                    <div className={styles.inputGroup}>
                      {/* <p className={styles.title}>Event Price</p> */}
                      <p className={styles.title}>
                        Event Price
                        <Tooltip
                          title="Cannot modify once event is created"
                          placement="top"
                          className="ml-1 max-h-[16px]"
                        >
                          <InfoIcon style={{ color: 'white' }} />
                        </Tooltip>
                      </p>
                      <SingleSelect
                        items={priceCourses}
                        name={'priceCourse'}
                        control={control}
                        rules={{
                          required: 'Select one price event',
                        }}
                        disabled={event_id !== undefined}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>Price</p>
                      <Input
                        control={control}
                        name="price"
                        error={errors?.price}
                        rules={{
                          required: 'Price is required',
                          pattern: {
                            // eslint-disable-next-line
                            value: /^\-?[0-9]+(?:\.[0-9]{1,3})?$/,
                            message: 'Only allowed with 3 decimal points',
                          },
                        }}
                        disabled={
                          priceCourseValue === 'FREE' || event_id !== undefined
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>Language</p>
                    {/* <SearchableSingleSelect
                      items={languages}
                      name="language"
                      control={control}
                      rules={{
                        required: 'Select one language',
                      }}
                      defaultValue={userEventDetail?.language}
                    /> */}
                    <SingleSelect
                      items={languages}
                      name={'language'}
                      control={control}
                      rules={{
                        required: 'Select one language',
                      }}
                    />
                  </div>
                  {selectedEventType === 'offer' ? (
                    <div className={styles.inputGroup}>
                      <p className={styles.title}>Location</p>
                      <Input
                        control={control}
                        name="location"
                        error={errors?.location}
                        rules={{
                          required: 'Location is required',
                          pattern: {
                            value: eventLocationLinkRegexp,
                            message:
                              'Only Google Meet, Zoom or Microsoft Teams meeting link is allowed',
                          },
                        }}
                        placeholder="Google Meet, Zoom or Microsoft Teams meeting link"
                      />
                    </div>
                  ) : null}
                  <div className={styles.inputGroup}>
                    <p className={styles.title}>Type of Participation</p>
                    <SingleSelect
                      items={participationTypes}
                      name={'participationType'}
                      control={control}
                      rules={{
                        required: 'Select participation type',
                      }}
                      disabled={selectedEventType === 'request'}
                      showTooltip={true}
                    />
                  </div>
                  {/* <div className={styles.splitInputGroup}>
                <div className={styles.inputGroup}>
                  <p className={styles.title}>Who can invite users</p>
                  <SingleSelect
                    items={languages}
                    name={'inviteusers'}
                    control={control}
                    rules={{
                      required: 'Select one interests',
                    }}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <p className={styles.title}>Max number of users</p>
                  <SingleSelect
                    items={languages}
                    name={'numberofusers'}
                    control={control}
                    rules={{
                      required: 'Select one interests',
                    }}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <p className={styles.title}>Add members</p>
                <SingleSelect
                  items={languages}
                  name={'members'}
                  control={control}
                  rules={{
                    required: 'Select one interests',
                  }}
                />
              </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formFooter}>
          <button
            className="bg-[#337FF5] p-[10px_0px] rounded-[11px] w-[184px] text-[13px] text-white"
            onClick={handleSubmit(handleSubmitClick)}
          >
            {event_id ? 'Update event' : 'Create event'}
          </button>
        </div>
      </div>
      {showSuccess !== -1 && (
        <Notification
          isOpen={true}
          handleClose={handleCloseShowSuccess}
          handleOk={() => {
            console.log('OK btn clicked')
            handleCloseShowSuccess()
          }}
          iconID={showSuccess === 1 ? 2 : 1}
          boldText={showSuccess === 1 ? 'Success' : 'Error'}
          smallText={
            showSuccess === 1
              ? event_id
                ? 'Event updated successfully!'
                : 'Event created successfully!'
              : 'Error while creating event'
          }
          closeText={''}
          okText={'Ok'}
          okBtnColor={showSuccess === 1}
        />
      )}
    </>
  )
}

export default EventForm
