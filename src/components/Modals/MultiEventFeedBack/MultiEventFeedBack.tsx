import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import StarRatingInput from 'components/StarRatingInput/StarRatingInput.tsx'
import _ from 'lodash'
import type { EventWithUserDataPayload } from 'candid/ts/event.did.d.ts'
import { checkIsUrl } from 'utils/values.tsx'

type EventId = string

type FormUid =
  | 'EMAIL_EVENT_COMPLETE_CONFIRMATION'
  | 'EVENT_COMPLETE_CONFIRMATION'
  | 'EVENT_POST_RECORDING'
type FormFieldUid =
  | 'isCompleted'
  | 'feedback'
  | 'reason'
  | 'rating'
  | 'recordingLink'
  | 'recordingVisibility'
type FormFieldValue = boolean | string | number | undefined

type EventFeedback = Record<FormFieldUid, FormFieldValue>
type EventFeedbackFormState = Record<EventId, EventFeedback>
type EventFeedbackFormErrorState = Record<EventId, FormFieldUid[]>

interface MultiEventFeedBackModalProps {
  isOpen: boolean
  onClose: () => void
  events: EventWithUserDataPayload[]
  onSubmit: (eventFeedBackForm: EventFeedbackFormState) => void
  formUid: FormUid
}

interface FormControlProps {
  onFieldChange: (fieldName: FormFieldUid, fieldValue: FormFieldValue) => void
  formValue: EventFeedback | undefined
  formUid: FormUid
  formErrors: FormFieldUid[]
}

type FormFieldProps = FormControlProps & {
  fieldUid: FormFieldUid
  isEventPToP: boolean
}

type EventFormProps = FormControlProps & {
  eventId: EventId
  isEventPToP: boolean
}

interface FormConfig {
  getShownFieldList: (formValue: EventFeedback | undefined) => FormFieldUid[]
  fieldLabelMap: Partial<Record<FormFieldUid, string>>
  fieldValidatorMap: Record<FormFieldUid, (value: FormFieldValue) => boolean>
  requiredFieldsUids: FormFieldUid[]
  fieldErrorLabelMap: Record<FormFieldUid, string>
}

const FieldUidDefaultValueMap: Record<FormFieldUid, FormFieldValue> = {
  isCompleted: undefined,
  feedback: '',
  rating: 3,
  reason: '',
  recordingLink: '',
  recordingVisibility: undefined,
}

const FormConfigs: Record<FormUid, FormConfig> = {
  EMAIL_EVENT_COMPLETE_CONFIRMATION: {
    getShownFieldList: (
      formValue: EventFeedback | undefined,
    ): FormFieldUid[] => {
      const list: FormFieldUid[] = []
      list.push('isCompleted')
      if (formValue === undefined) {
        return list
      }

      if (_.get(formValue, 'isCompleted') === 'YES') {
        list.push('rating')
      }
      if (_.get(formValue, 'isCompleted') === 'NO') {
        list.push('reason')
      }
      return list
    },
    fieldLabelMap: {
      isCompleted: 'Did the event happen?',
      feedback: '',
      reason: 'What was the reason?',
      rating: 'Please rate your experience',
      recordingLink: '',
      recordingVisibility: '',
    },
    fieldValidatorMap: {
      isCompleted: (v) => v === 'YES' || v === 'NO',
      feedback: (v) => _.trim(v as string).length > 0,
      rating: (v) => typeof v === 'number',
      reason: (v) => _.trim(v as string).length > 0,
      recordingLink: (v) => checkIsUrl(v as string),
      recordingVisibility: (v) => v === 'PUBLIC' || v === 'PRIVATE',
    },
    fieldErrorLabelMap: {
      isCompleted: 'Required',
      feedback: '',
      rating: 'Required',
      reason: 'Required',
      recordingLink: '',
      recordingVisibility: '',
    },
    requiredFieldsUids: ['isCompleted', 'reason', 'rating'],
  },
  EVENT_COMPLETE_CONFIRMATION: {
    getShownFieldList: (
      formValue: EventFeedback | undefined,
    ): FormFieldUid[] => {
      const list: FormFieldUid[] = []
      list.push('isCompleted')
      if (formValue === undefined) {
        return list
      }

      if (_.get(formValue, 'isCompleted') === 'YES') {
        list.push('recordingLink')
        list.push('recordingVisibility')
      }
      return list
    },
    fieldLabelMap: {
      isCompleted: 'Did the event happen?',
      feedback: '',
      reason: '',
      rating: '',
      recordingLink: 'Please enter the link to the recording.',
      recordingVisibility: 'Recording visibility',
    },
    fieldValidatorMap: {
      isCompleted: (v) => v === 'YES' || v === 'NO',
      feedback: (v) => _.trim(v as string).length > 0,
      rating: (v) => typeof v === 'number',
      reason: (v) => _.trim(v as string).length > 0,
      recordingLink: (v) => checkIsUrl(v as string),
      recordingVisibility: (v) => v === 'PUBLIC' || v === 'PRIVATE',
    },
    fieldErrorLabelMap: {
      isCompleted: 'Required',
      feedback: '',
      rating: '',
      reason: '',
      recordingLink: 'Valid recording link is required',
      recordingVisibility: 'Required',
    },
    requiredFieldsUids: ['isCompleted', 'recordingLink', 'recordingVisibility'],
  },
  EVENT_POST_RECORDING: {
    getShownFieldList: (
      formValue: EventFeedback | undefined,
    ): FormFieldUid[] => {
      const list: FormFieldUid[] = []
      list.push('recordingLink')
      list.push('recordingVisibility')
      if (formValue === undefined) {
        return list
      }
      return list
    },
    fieldLabelMap: {
      isCompleted: '',
      feedback: '',
      reason: '',
      rating: '',
      recordingLink: 'Link to the event recording',
      recordingVisibility: 'Recording visibility',
    },
    fieldValidatorMap: {
      isCompleted: (v) => v === 'YES' || v === 'NO',
      feedback: (v) => _.trim(v as string).length > 0,
      rating: (v) => typeof v === 'number',
      reason: (v) => _.trim(v as string).length > 0,
      recordingLink: (v) => checkIsUrl(v as string),
      recordingVisibility: (v) => v === 'PUBLIC' || v === 'PRIVATE',
    },
    fieldErrorLabelMap: {
      isCompleted: '',
      feedback: '',
      rating: '',
      reason: '',
      recordingLink: 'Valid recording link is required',
      recordingVisibility: 'Required',
    },
    requiredFieldsUids: ['recordingLink', 'recordingVisibility'],
  },
}

const RadioFormField: React.FC<FormFieldProps> = (props: FormFieldProps) => {
  const { onFieldChange, formValue, formUid, fieldUid, formErrors } = props

  const options = {
    YES: {
      id: 'YES',
      label: 'Yes',
    },
    NO: {
      id: 'NO',
      label: 'No',
    },
  }

  const labelText = FormConfigs[formUid].fieldLabelMap[fieldUid]
  const errorLabel = formErrors.includes(fieldUid)
    ? _.get(FormConfigs[formUid].fieldErrorLabelMap, fieldUid)
    : ''

  return (
    <div className="flex flex-col gap-[8px]">
      {labelText ? (
        <p className="text-[white]/[0.8] ty-text-2">{labelText}</p>
      ) : null}
      {errorLabel ? <em className="text-red-500">{errorLabel}</em> : null}
      <div className="flex flex-col justify-start items-start gap-[4px]">
        {_.map(_.values(options), (opt) => {
          const inputElementId = `RadioFormField-${fieldUid}-${opt.id}`
          return (
            <div
              key={inputElementId}
              className="flex flex-row justify-start items-center gap-[24px]"
            >
              <div className="flex flex-row gap-[8px]">
                <input
                  type="radio"
                  value={opt.id}
                  name={fieldUid}
                  checked={_.get(formValue, fieldUid) === opt.id}
                  onChange={(e) => {
                    onFieldChange(fieldUid, opt.id)
                  }}
                  id={inputElementId}
                />
                <label htmlFor={inputElementId}>{opt.label}</label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SingleSelectCheckboxFormField: React.FC<FormFieldProps> = (
  props: FormFieldProps,
) => {
  const {
    onFieldChange,
    formValue,
    formUid,
    fieldUid,
    formErrors,
    isEventPToP,
  } = props

  const options = {
    PUBLIC: {
      id: 'PUBLIC',
      label: 'Public',
    },
    PRIVATE: {
      id: 'PRIVATE',
      label: 'Private',
    },
  }

  const labelText = FormConfigs[formUid].fieldLabelMap[fieldUid]
  const errorLabel = formErrors.includes(fieldUid)
    ? _.get(FormConfigs[formUid].fieldErrorLabelMap, fieldUid)
    : ''
  useEffect(() => {
    if (isEventPToP) {
      onFieldChange(fieldUid, 'PRIVATE')
    }
  }, [isEventPToP, fieldUid, onFieldChange])

  return (
    <div className="flex flex-col gap-[8px]">
      {labelText ? (
        <p className="text-[white]/[0.8] ty-text-2">{labelText}</p>
      ) : null}
      {errorLabel ? <em className="text-red-500">{errorLabel}</em> : null}
      <div className="flex flex-col justify-start items-start gap-[4px]">
        {_.map(_.values(options), (opt) => {
          const inputElementId = `SingleSelectCheckboxFormField-${fieldUid}-${opt.id}`
          return (
            <div
              key={inputElementId}
              className="flex flex-row justify-start items-center gap-[24px]"
            >
              <div className="flex flex-row gap-[8px]">
                <input
                  type="checkbox"
                  value={opt.id}
                  name={fieldUid}
                  checked={_.get(formValue, fieldUid) === opt.id}
                  onChange={(e) => {
                    onFieldChange(
                      fieldUid,
                      e.target.checked ? opt.id : undefined,
                    )
                  }}
                  id={inputElementId}
                  disabled={isEventPToP}
                />
                <label htmlFor={inputElementId}>{opt.label}</label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const TextInputFormField: React.FC<FormFieldProps> = (
  props: FormFieldProps,
) => {
  const { onFieldChange, formValue, formUid, fieldUid, formErrors } = props

  const labelText = FormConfigs[formUid].fieldLabelMap[fieldUid]
  const inputElementId = `text-area-${fieldUid}`
  const errorLabel = formErrors.includes(fieldUid)
    ? _.get(FormConfigs[formUid].fieldErrorLabelMap, fieldUid)
    : ''

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {labelText ? (
        <label
          className="text-[white]/[0.8] ty-text-2"
          htmlFor={inputElementId}
        >
          {labelText}
        </label>
      ) : null}
      <input
        value={_.get(formValue, fieldUid, '') as string}
        onChange={(e) => {
          onFieldChange(fieldUid, e.target.value)
        }}
        className="bg-[white]/[0.05] p-[4px] rounded-md"
        id={inputElementId}
      />
      {errorLabel ? <em className="text-red-500">{errorLabel}</em> : null}
    </div>
  )
}

const TextAreaFormField: React.FC<FormFieldProps> = (props: FormFieldProps) => {
  const { onFieldChange, formValue, formUid, fieldUid, formErrors } = props

  const labelText = FormConfigs[formUid].fieldLabelMap[fieldUid]
  const inputElementId = `text-area-${fieldUid}`
  const errorLabel = formErrors.includes(fieldUid)
    ? _.get(FormConfigs[formUid].fieldErrorLabelMap, fieldUid)
    : ''

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {labelText ? (
        <label
          className="text-[white]/[0.8] ty-text-2"
          htmlFor={inputElementId}
        >
          {labelText}
        </label>
      ) : null}
      <textarea
        value={_.get(formValue, fieldUid, '') as string}
        onChange={(e) => {
          onFieldChange(fieldUid, e.target.value)
        }}
        className="bg-[white]/[0.05] p-[4px] rounded-md"
        rows={6}
        id={inputElementId}
      />
      {errorLabel ? <em className="text-red-500">{errorLabel}</em> : null}
    </div>
  )
}

const RatingFormField: React.FC<FormFieldProps> = (props: FormFieldProps) => {
  const { formUid, formValue, fieldUid, onFieldChange, formErrors } = props

  const labelText = FormConfigs[formUid].fieldLabelMap[fieldUid]
  const errorLabel = formErrors.includes(fieldUid)
    ? _.get(FormConfigs[formUid].fieldErrorLabelMap, fieldUid)
    : ''

  return (
    <div className="flex flex-col items-center gap-[8px]">
      {labelText ? (
        <label className="text-[white]/[0.8] ty-text-2">{labelText}</label>
      ) : null}
      <StarRatingInput
        onChange={(value) => {
          onFieldChange(fieldUid, value)
        }}
        value={_.get(formValue, fieldUid, 3) as number}
        size="md"
      />
    </div>
  )
}

const FieldUIDComponentMap: Record<FormFieldUid, React.FC<FormFieldProps>> = {
  isCompleted: RadioFormField,
  feedback: TextAreaFormField,
  reason: TextAreaFormField,
  rating: RatingFormField,
  recordingLink: TextInputFormField,
  recordingVisibility: SingleSelectCheckboxFormField,
}

const EventForm = (props: EventFormProps) => {
  const {
    eventId,
    isEventPToP,
    formUid,
    onFieldChange,
    formValue,
    formErrors,
  } = props

  const shownFieldList = FormConfigs[formUid].getShownFieldList(formValue)

  return (
    <div className="flex flex-col justify-start gap-[16px] px-[24px] py-[16px] w-full">
      {shownFieldList.map((uid) => {
        const FieldComponent = FieldUIDComponentMap[uid]
        return (
          <FieldComponent
            key={uid}
            onFieldChange={onFieldChange}
            formValue={formValue}
            formUid={formUid}
            fieldUid={uid}
            formErrors={formErrors}
            isEventPToP={isEventPToP}
          />
        )
      })}
    </div>
  )
}

const getInitialValue = (
  formUid: FormUid,
  events: EventWithUserDataPayload[],
) => {
  const requiredFields = FormConfigs[formUid].requiredFieldsUids
  const requiredFieldObj = _.reduce(
    requiredFields,
    (acc, curr) => {
      return {
        ...acc,
        [curr]: FieldUidDefaultValueMap[curr],
      }
    },
    {},
  )
  return _.reduce(
    events,
    (acc, curr) => {
      return {
        ...acc,
        [curr.event_id]: requiredFieldObj,
      }
    },
    {},
  )
}

const MultiEventFeedBack = (props: MultiEventFeedBackModalProps) => {
  const { isOpen, onClose, events = [], onSubmit, formUid } = props

  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0)

  const [formValue, setFormValue] = useState<EventFeedbackFormState>(
    getInitialValue(formUid, events),
  )
  const [formErrorValue, setFormErrorValue] =
    useState<EventFeedbackFormErrorState>({})

  const currentEvent = events[currentEventIndex]

  const handleFormFieldUpdate = useCallback(
    (fieldName: FormFieldUid, fieldValue: FormFieldValue) => {
      setFormErrorValue((prev) => {
        const { [currentEvent.event_id]: _removed, ...rest } = prev
        return rest
      })
      setFormValue((prev) => {
        const id = currentEvent.event_id
        const prevEntry = prev[id] ?? {}
        return {
          ...prev,
          [id]: { ...prevEntry, [fieldName]: fieldValue },
        }
      })
    },
    [currentEvent],
  )

  const validateFormSubmission = (formValueInput: EventFeedbackFormState) => {
    const errorsMap: EventFeedbackFormErrorState = {}
    let hasError = false
    _.forEach(_.entries(formValueInput), ([eventId, eventFormValues]) => {
      _.forEach(eventFormValues, (fieldValue, fieldUid) => {
        if (
          !FormConfigs[formUid].fieldValidatorMap[fieldUid as FormFieldUid](
            fieldValue,
          )
        ) {
          hasError = true
          errorsMap[eventId] = [
            ...(errorsMap[eventId] ?? []),
            fieldUid as FormFieldUid,
          ]
        }
      })
    })
    return { hasError, errorsMap }
  }

  const handleSubmit = () => {
    const sanitizedFormValue = _.mapValues(formValue, (v, key) => {
      const allowedField = FormConfigs[formUid].getShownFieldList(v)
      return _.pick(v, allowedField)
    })
    const { hasError, errorsMap } = validateFormSubmission(sanitizedFormValue)
    if (!hasError) {
      onSubmit?.(sanitizedFormValue)
    } else {
      setFormErrorValue(errorsMap)
    }
  }

  if (events.length < 1) {
    console.log('MultiEventFeedBack - non empty events array is required')
    return null
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="relative flex flex-col justify-center items-center"
    >
      <div className="flex flex-col bg-[#201F34] rounded-lg w-full max-w-[560px] max-h-[580px] text-white">
        <div className="flex flex-row justify-between items-center px-[24px] py-[16px] border-b-[1px] border-b-[white]/[0.1]">
          <h2 className="ty-title">
            {formUid === 'EVENT_POST_RECORDING'
              ? 'Post Recording'
              : `Feedback - ${currentEvent.name}`}
          </h2>
        </div>
        <div className="flex flex-1">
          <EventForm
            eventId={currentEvent.event_id}
            isEventPToP={currentEvent.participation_type === 'PersonToPerson'}
            onFieldChange={handleFormFieldUpdate}
            formValue={_.get(formValue, [currentEvent.event_id])}
            formUid={formUid}
            formErrors={_.get(formErrorValue, [currentEvent.event_id], [])}
          />
        </div>
        <div className="flex flex-row justify-between items-center px-[24px] py-[16px] border-t-[1px] border-t-[white]/[0.1]">
          {events.length > 1 ? (
            <div className="text-[white]/[0.8] ty-text-2">{`${currentEventIndex + 1
              } out of ${events.length}`}</div>
          ) : (
            <div />
          )}
          <div className="flex flex-row justify-start items-center gap-[12px]">
            {events.length > 1 ? (
              <button
                className="btn-secondary btn-sm"
                disabled={currentEventIndex === 0}
                onClick={() => {
                  setCurrentEventIndex((i) => i - 1)
                }}
              >
                Previous
              </button>
            ) : null}
            {currentEventIndex === events.length - 1 ? (
              <button className="btn-primary btn-sm" onClick={handleSubmit}>
                {formUid === 'EVENT_POST_RECORDING' ? 'Publish' : 'Submit'}
              </button>
            ) : (
              <button
                className="btn-secondary btn-sm"
                onClick={() => {
                  setCurrentEventIndex((i) => i + 1)
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MultiEventFeedBack