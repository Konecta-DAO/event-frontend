import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import Input from 'components/Input/index.tsx'
import TextArea from 'components/TextArea/index.tsx'
import ImageUploader from 'components/ImageUploader/index.tsx'
import MultiSelect from 'components/MultiSelect/index.tsx'
import DateSelPicker from 'components/DateSelPicker/index.tsx'
import TimeInput from 'components/TimeInput/index.tsx'
import SingleSelect from 'components/SingleSelect/index.tsx'
import {
  languages,
  eventTypes,
  categories,
  interests2,
  EventType,
  priceCourses,
  eventLocationLinkRegexp,
  participationTypes,
} from 'utils/values.tsx'
import styles from './style.module.css'
import { Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form'
import InfoIcon from '@mui/icons-material/Info'
import moment from 'moment'
import indexActorServiceInstance from 'services/indexService.tsx'
import eventActorServiceInstance from 'services/eventService.tsx'
import { Principal } from '@dfinity/principal'
import Notification from 'components/Modals/Notifications/index.tsx'
import { setLoader } from 'reduxStore/auth/authAction.tsx'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks.tsx'
import {
  setUserEventDetail,
} from 'reduxStore/event/eventAction.tsx'
import {
  getMomentFromNanoSeconds,
  getNanosecondsFromMoment,
} from 'utils/dateTimeUtils.ts'
import type { EventRequestPayload, EventWithUserDataPayload } from 'candid/ts/event.did.d.ts'
import type { FeedResponsePayload } from 'candid/ts/konecta.did.d.ts'
import { CreateEventInputs } from 'entity/EventRequestModel.ts'
import { getEventCoverImageUrl } from 'utils/common/common.ts'

const EventForm = ({ }: { handleClose?: () => void }) => {
  const dispatch = useAppDispatch()
  const [selectedEventType, setEventType] = useState<EventType>('request')
  const [possibleInterests, setPossibleInterests] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(-1)

  const { event_id } = useParams()

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)

  const principalId = useAppSelector((state) => {
    return state.auth.pid
  })
  const userEventDetail = useAppSelector((state): FeedResponsePayload | undefined => {
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

  useEffect(() => {
    const fetchEventDetailsForEdit = async (eventId: string) => {
      try {
        dispatch(setLoader(true));
        dispatch(setUserEventDetail(undefined));

        const eventDetails: EventWithUserDataPayload =
          await eventActorServiceInstance.getEventDetailsWithUserData(eventId);

        if (eventDetails && 'event_id' in eventDetails) {
          dispatch(setUserEventDetail(eventDetails));
        }
      } catch (e) {
        console.error("Failed to fetch event details:", e);
      } finally {
        dispatch(setLoader(false));
      }
    };

    if (event_id) {
      fetchEventDetailsForEdit(event_id);
    }
  }, [event_id, dispatch]);


  useEffect(() => {
    if (userEventDetail && event_id) {
      const defaultValues = {
        name: userEventDetail.name,
        description: userEventDetail.description,
        categories: userEventDetail.categories,
        interests: userEventDetail.interests,
        startDate: userEventDetail.start_date,
        endDate: userEventDetail.end_date,
        priceCourse: userEventDetail.price_token,
        price: userEventDetail.token_amount,
        language: userEventDetail.language,
        location: userEventDetail.location,
        yearsOfExperience: userEventDetail.expertise,
        consultations: userEventDetail.consultations.join(', '),
        showcaselink: userEventDetail.showcase_link,
        participationType: userEventDetail.participation_type,
      };
      reset(defaultValues);
    }
  }, [userEventDetail, event_id, reset]);


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

  const handleSubmitClick = async (data: CreateEventInputs) => {
    try {

      if (!principalId) {
        throw new Error("User is not authenticated. Principal ID is missing.");
      }

      dispatch(setLoader(true));

      if (data.endDate < data.startDate) {
        setError('endDate', { message: 'End date must be after start date' });
        dispatch(setLoader(false));
        return;
      }

      const userCanisterId = await indexActorServiceInstance.getUserCanister();
      if (!userCanisterId) {
        throw new Error("Could not find your user canister. Please try again.");
      }

      // 1. Handle the cover photo
      let coverPhotoPayload: [] | [{ fileDataObject: number[]; fileName: string; fileType: string; }] = [];
      if (coverImageFile) {
        coverPhotoPayload = [{
          fileName: coverImageFile.name,
          fileType: coverImageFile.type,
          fileDataObject: [...new Uint8Array(await coverImageFile.arrayBuffer())],
        }];
      }

      // 2. Build the main payload
      const eventPayload: EventRequestPayload = {
        categories: data.categories || [],
        status: { Created: null },
        token_amount: [Number(data.price) || 0],
        price_token: data.priceCourse === 'ICP' ? [{ 'ICP': null }] :
          data.priceCourse === 'CKBTC' ? [{ 'CKBTC': null }] :
            data.priceCourse === 'FREE' ? [{ 'FREE': null }] :
              [],
        interests: (data.interests && data.interests.length > 0) ? [data.interests] : [],
        metadata: [],
        name: data.name,
        recording_visibility: [],
        description: data.description,
        end_date: BigInt(data.endDate),
        user_id: [Principal.fromText(principalId)],
        consultations: data.consultations ? [data.consultations.split(',').map(s => s.trim())] : [],
        language: data.language ? [data.language] : [],
        start_date: BigInt(data.startDate),
        expertise: data.yearsOfExperience ? [data.yearsOfExperience] : [],
        showcase_link: data.showcaselink ? [data.showcaselink] : [],
        subaccount_id_hex: userEventDetail?.subaccount_id_hex || indexActorServiceInstance.userSubaccountHex || "",
        subaccount_id_index: userEventDetail?.subaccount_id_index || BigInt(0),
        is_recording_available: [],
        location: data.location,
        event_type: selectedEventType === 'request' ? { Request: null } : { Offer: null },
        coverphoto: coverPhotoPayload,
        participation_type: [data.participationType === 'PersonToPerson' ? { PersonToPerson: null } : { PersonToMultiplePersons: null }],
      };

      console.log("Payload being sent to createEvent:", JSON.stringify(eventPayload, null, 2));

      if (event_id) {
        // UPDATING an existing event
        const updateResponse = await eventActorServiceInstance.updateEvent(userCanisterId, event_id, eventPayload);
        console.log('Backend response from updateEvent:', updateResponse);
      } else {
        // CREATING a new event
        const createResponse = await eventActorServiceInstance.createEvent(userCanisterId, eventPayload);
        console.log('Backend response from createEvent:', createResponse);
      }

      // --- Success Handling ---
      setShowSuccess(1);
      navigate('/calendar');

    } catch (e) {
      console.error('Event form submission error:', e); //
      setShowSuccess(0);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <>
      <div className={styles.createEvent}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            {event_id ? 'Update event' : 'Create event'}
          </h1>
          <div className={styles.actions}>
            <Link to={'/feed'} className="bg-[#FFFFFF0D]">
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
                      className={`${styles.eventTypeContainer} ${item.type === selectedEventType
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
                          ? getEventCoverImageUrl(
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