import type { ActorMethod } from '@dfinity/agent'
import type { IDL } from '@dfinity/candid'
import type { Principal } from '@dfinity/principal'

export interface AddAttributeInputType {
  databaseName: string
  tableName: string
  attribute: AttributeMetadata
}
export type AddAttributeOutputType =
  | {
      ok: {
        attributeName: string
        databaseName: string
        tableName: string
      }
    }
  | { err: Array<string> }
export interface ApplicantsWithUserDataPayload {
  userData: UserResponsePayload
  note: string
  location: string
}
export interface ApplicationStatusOfMyCreatedEvents {
  event_description: string
  event_id: string
  applied_users_details: Array<AppplicantIdsResponsePayload>
  event_name: string
}
export interface ApplyToServiceRequestPayload {
  note: string
  event_id: string
  location: string
}
export interface AppplicantIdsResponsePayload {
  id: string
  action: string
  note: string
  timestamp: bigint
  applied_user_id: string
  location: string
}
export type AttributeDataType =
  | { int: null }
  | { map: null }
  | { nat: null }
  | { float: null }
  | { principal: null }
  | { blob: null }
  | { bool: null }
  | { char: null }
  | { int8: null }
  | { list: null }
  | { nat8: null }
  | { text: null }
  | { nat16: null }
  | { nat32: null }
  | { nat64: null }
  | { default: null }
  | { int16: null }
  | { int32: null }
  | { int64: null }
export type AttributeDataType__1 =
  | { int: null }
  | { map: null }
  | { nat: null }
  | { float: null }
  | { principal: null }
  | { blob: null }
  | { bool: null }
  | { char: null }
  | { int8: null }
  | { list: null }
  | { nat8: null }
  | { text: null }
  | { nat16: null }
  | { nat32: null }
  | { nat64: null }
  | { default: null }
  | { int16: null }
  | { int32: null }
  | { int64: null }
export type AttributeDataValue =
  | { int: bigint }
  | {
      map: Array<
        [
          string,
          (
            | { int: bigint }
            | { nat: bigint }
            | { float: number }
            | { char: number }
            | { int8: number }
            | {
                list: Array<
                  | { int: bigint }
                  | { nat: bigint }
                  | { float: number }
                  | { char: number }
                  | { int8: number }
                  | { nat8: number }
                  | { text: string }
                  | { nat16: number }
                  | { nat32: number }
                  | { nat64: bigint }
                  | { int16: number }
                  | { int32: number }
                  | { int64: bigint }
                >
              }
            | { nat8: number }
            | { text: string }
            | { nat16: number }
            | { nat32: number }
            | { nat64: bigint }
            | { int16: number }
            | { int32: number }
            | { int64: bigint }
          ),
        ]
      >
    }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | {
      list: Array<
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      >
    }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { default: null }
  | { int16: number }
  | { int32: number }
  | { int64: bigint }
export type AttributeDataValue__1 =
  | { int: bigint }
  | {
      map: Array<
        [
          string,
          (
            | { int: bigint }
            | { nat: bigint }
            | { float: number }
            | { char: number }
            | { int8: number }
            | {
                list: Array<
                  | { int: bigint }
                  | { nat: bigint }
                  | { float: number }
                  | { char: number }
                  | { int8: number }
                  | { nat8: number }
                  | { text: string }
                  | { nat16: number }
                  | { nat32: number }
                  | { nat64: bigint }
                  | { int16: number }
                  | { int32: number }
                  | { int64: bigint }
                >
              }
            | { nat8: number }
            | { text: string }
            | { nat16: number }
            | { nat32: number }
            | { nat64: bigint }
            | { int16: number }
            | { int32: number }
            | { int64: bigint }
          ),
        ]
      >
    }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | {
      list: Array<
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      >
    }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { default: null }
  | { int16: number }
  | { int32: number }
  | { int64: bigint }
export interface AttributeMetadata {
  name: AttributeName
  unique: boolean
  dataType: AttributeDataType
  required: boolean
  defaultValue: AttributeDataValue
}
export type AttributeName = string
export interface BatchGetItemByIdInputType {
  ids: Array<string>
  databaseName: string
  tableName: string
}
export type BatchGetItemByIdOutputType =
  | {
      ok: { notFoundIds: Array<string>; items: Array<ItemOutputType> }
    }
  | { err: Array<string> }
export type CanisterCyclesAggregatedData = BigUint64Array | bigint[]
export type CanisterHeapMemoryAggregatedData = BigUint64Array | bigint[]
export type CanisterLogFeature =
  | { filterMessageByContains: null }
  | { filterMessageByRegex: null }
export interface CanisterLogMessages {
  data: Array<LogMessagesData>
  lastAnalyzedMessageTimeNanos: [] | [Nanos]
}
export interface CanisterLogMessagesInfo {
  features: Array<[] | [CanisterLogFeature]>
  lastTimeNanos: [] | [Nanos]
  count: number
  firstTimeNanos: [] | [Nanos]
}
export type CanisterLogRequest =
  | { getMessagesInfo: null }
  | { getMessages: GetLogMessagesParameters }
  | { getLatestMessages: GetLatestLogMessagesParameters }
export type CanisterLogResponse =
  | { messagesInfo: CanisterLogMessagesInfo }
  | { messages: CanisterLogMessages }
export type CanisterMemoryAggregatedData = BigUint64Array | bigint[]
export interface CanisterMetrics {
  data: CanisterMetricsData
}
export type CanisterMetricsData =
  | { hourly: Array<HourlyMetricsData> }
  | { daily: Array<DailyMetricsData> }
export interface CheckEventExistsPayload {
  end_date: bigint
  start_date: bigint
  event_type: EventType
}
export type CollectMetricsRequestType = { force: null } | { normal: null }
export type ContaintmentExpressionAttributeDataValue =
  | { char: number }
  | {
      list: Array<
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      >
    }
  | { text: string }
export interface CreateDatabaseInputType {
  name: string
}
export type CreateDatabaseOutputType = { ok: {} } | { err: Array<string> }
export interface CreateItemInputType {
  databaseName: string
  attributeDataValues: Array<[string, AttributeDataValue__1]>
  tableName: string
}
export type CreateItemOutputType =
  | {
      ok: { id: string; item: Array<[string, AttributeDataValue__1]> }
    }
  | { err: Array<string> }
export interface CreateTableInputType {
  name: string
  databaseName: string
  attributes: Array<AttributeMetadata>
  indexes: Array<TableIndexMetadata>
}
export type CreateTableOutputType = { ok: {} } | { err: Array<string> }
export interface CreateUserFeedbackResponsePayload {
  konectaEventData: EventResponsePayload
  feedbackId: string
}
export interface DailyMetricsData {
  updateCalls: bigint
  canisterHeapMemorySize: NumericEntity
  canisterCycles: NumericEntity
  canisterMemorySize: NumericEntity
  timeMillis: bigint
}
export interface DropAttributeInputType {
  attributeName: string
  databaseName: string
  tableName: string
}
export type DropAttributeOutputType =
  | {
      ok: {
        attributeName: string
        databaseName: string
        tableName: string
      }
    }
  | { err: Array<string> }
export interface EmailResponse {
  message_id: string
  idempotency_key: string
}
export interface EventApplicationStatus {
  applied_users: Array<EventApplicationStatusWithCanister>
  event_id: string
}
export interface EventApplicationStatusWithCanister {
  action: string
  user_canister_id: string
  applied_user_id: string
}
export type EventAttendeeActions =
  | { Invited: null }
  | { Applied: null }
  | { Withdrawn: null }
  | { Accepted: null }
  | { Declined: null }
  | { Joined: null }
export interface EventCanisterResponseWithoutUser {
  status: string
  metadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  name: string
  description: string
  end_date: bigint
  user_id: string
  language: string
  start_date: bigint
  event_id: string
  location: string
  coverphoto: string
}
export interface EventCompletionResponsePayload {
  id: string
  to: string
  user_type: string
  from: string
  template_name: string
  user_id: string
  notification_type: string
  event_id: string
  message_id: string
  idempotency_key: string
  recipient_type: string
}
export interface EventProtocolCanisterPayload {
  userData: UserResponsePayload
  status: string
  metadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  name: string
  description: string
  end_date: bigint
  user_id: string
  language: string
  start_date: bigint
  event_id: string
  location: string
  coverphoto: string
}
export interface EventRequestPayload {
  categories: Array<string>
  status: EventStatus
  token_amount: [] | [number]
  price_token: [] | [Token]
  interests: [] | [Array<string>]
  metadata:
    | []
    | [
        Array<
          [
            string,
            (
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | {
                  list: Array<
                    | { int: bigint }
                    | { nat: bigint }
                    | { float: number }
                    | { char: number }
                    | { int8: number }
                    | { nat8: number }
                    | { text: string }
                    | { nat16: number }
                    | { nat32: number }
                    | { nat64: bigint }
                    | { int16: number }
                    | { int32: number }
                    | { int64: bigint }
                  >
                }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            ),
          ]
        >,
      ]
  event_description: string
  recording_visibility: [] | [RecordingVisibility]
  end_date: bigint
  user_id: [] | [string]
  consultations: [] | [Array<string>]
  start_date: bigint
  expertise: [] | [string]
  showcase_link: [] | [string]
  event_id: string
  is_recording_available: [] | [boolean]
  event_name: string
  event_type: EventType
  participation_type: [] | [ParticipationType]
}
export interface EventResponsePayload {
  categories: Array<string>
  status: string
  token_amount: number
  price_token: string
  interests: Array<string>
  metadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  event_description: string
  recording_visibility: string
  end_date: bigint
  user_id: string
  consultations: Array<string>
  start_date: bigint
  expertise: string
  showcase_link: string
  subaccount_id_hex: string
  subaccount_id_index: bigint
  konecta_event_id: string
  event_id: string
  is_recording_available: boolean
  event_name: string
  event_type: string
  participation_type: string
}
export type EventStatus =
  | { Draft: null }
  | { Created: null }
  | { Canceled: null }
export type EventType = { Request: null } | { Offer: null }
export type EventWithUserDataTupleArray = Array<
  [string, EventProtocolCanisterPayload]
>
export interface ExpertFeedbackRequestPayload {
  agreeWithUserFeedback: [] | [FeedbackActions]
  remitter_feedback_missing: boolean
  transfer_or_refund: [] | [MoneyTransferActions]
  user_id: [] | [string]
  event_id: string
  event_recording_link: [] | [string]
  reason: [] | [string]
  user_feedback_id: [] | [string]
}
export interface ExpertFeedbackResponsePayload {
  agreeWithUserFeedback: string
  remitter_feedback_missing: boolean
  transfer_or_refund: string
  user_id: string
  user_feedback: [] | [UserFeedbackResponsePayload]
  event_id: string
  event_recording_link: string
  reason: string
  user_feedback_id: string
}
export interface FeedDetailsPayload {
  categories: Array<string>
  userData: UserResponsePayload
  status: string
  recording_link: string
  token_amount: number
  price_token: string
  interests: Array<string>
  name: string
  recording_visibility: string
  description: string
  end_date: bigint
  user_id: string
  consultations: Array<string>
  language: string
  start_date: bigint
  expertise: string
  konectaMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  showcase_link: string
  subaccount_id_hex: string
  subaccount_id_index: bigint
  konecta_event_id: string
  event_id: string
  is_recording_available: boolean
  location: string
  event_type: string
  coverphoto: string
  participation_type: string
  eventMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
}
export interface FeedRequestPayload {
  categories: Array<string>
  timezone: [] | [string]
  recordingType: Array<boolean>
  offset: bigint
  limit: bigint
  searchValue: [] | [string]
  currentTimestamp: bigint
}
export interface FeedResponsePayload {
  categories: Array<string>
  userData: UserResponsePayload
  status: string
  token_amount: number
  price_token: string
  interests: Array<string>
  name: string
  recording_visibility: string
  description: string
  end_date: bigint
  user_id: string
  consultations: Array<string>
  language: string
  start_date: bigint
  expertise: string
  konectaMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  showcase_link: string
  subaccount_id_hex: string
  subaccount_id_index: bigint
  konecta_event_id: string
  event_id: string
  is_recording_available: boolean
  location: string
  event_type: string
  coverphoto: string
  participation_type: string
  eventMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
}
export interface FeedResponsePayloadWithoutUser {
  categories: Array<string>
  status: string
  token_amount: number
  price_token: string
  interests: Array<string>
  name: string
  recording_visibility: string
  description: string
  end_date: bigint
  user_id: string
  consultations: Array<string>
  language: string
  start_date: bigint
  expertise: string
  konectaMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
  showcase_link: string
  subaccount_id_hex: string
  subaccount_id_index: bigint
  konecta_event_id: string
  event_id: string
  is_recording_available: boolean
  location: string
  event_type: string
  coverphoto: string
  participation_type: string
  eventMetadata: Array<
    [
      string,
      (
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | {
            list: Array<
              | { int: bigint }
              | { nat: bigint }
              | { float: number }
              | { char: number }
              | { int8: number }
              | { nat8: number }
              | { text: string }
              | { nat16: number }
              | { nat32: number }
              | { nat64: bigint }
              | { int16: number }
              | { int32: number }
              | { int64: bigint }
            >
          }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      ),
    ]
  >
}
export type FeedbackActions = { No: null } | { Yes: null }
export type FilterExpressionConditionType =
  | {
      EQ: RelationalExpressionAttributeDataValue
    }
  | { GT: RelationalExpressionAttributeDataValue }
  | { IN: Array<RelationalExpressionAttributeDataValue> }
  | { LT: RelationalExpressionAttributeDataValue }
  | { GTE: RelationalExpressionAttributeDataValue }
  | { LTE: RelationalExpressionAttributeDataValue }
  | { NEQ: RelationalExpressionAttributeDataValue }
  | { LIKE: Array<RelationalExpressionAttributeDataValue> }
  | { NOT_EXISTS: null }
  | { EXISTS: null }
  | { CONTAINS: ContaintmentExpressionAttributeDataValue }
  | { BEGINS_WITH: StringAttributeDataValue }
  | { NOT_CONTAINS: ContaintmentExpressionAttributeDataValue }
  | {
      BETWEEN: [
        RelationalExpressionAttributeDataValue,
        RelationalExpressionAttributeDataValue,
      ]
    }
  | {
      NOT_BETWEEN: [
        RelationalExpressionAttributeDataValue,
        RelationalExpressionAttributeDataValue,
      ]
    }
export interface FilterExpressionType {
  filterExpressionCondition: FilterExpressionConditionType
  attributeName: string
}
export interface ForeignKeyInputType {
  primaryKeyTableName: string
  foreignKeyName: string
}
export interface ForwardToExpertResponsePayload {
  id: string
  to: string
  from: string
  template_name: string
  event_id: string
  message_id: string
  idempotency_key: string
  user_feedback_id: string
}
export type GetDatabasesInputType = {}
export interface GetDatabasesOutputType {
  databases: Array<{ name: string; tables: Array<string> }>
}
export interface GetInformationRequest {
  status: [] | [StatusRequest]
  metrics: [] | [MetricsRequest]
  logs: [] | [CanisterLogRequest]
  version: boolean
}
export interface GetInformationResponse {
  status: [] | [StatusResponse]
  metrics: [] | [MetricsResponse]
  logs: [] | [CanisterLogResponse]
  version: [] | [bigint]
}
export interface GetItemByIdInputType {
  id: string
  databaseName: string
  tableName: string
}
export type GetItemByIdOutputType =
  | { ok: ItemOutputType }
  | { err: Array<string> }
export interface GetItemCountInputType {
  databaseName: string
  tableName: string
}
export type GetItemCountOutputType =
  | { ok: { count: bigint } }
  | { err: Array<string> }
export interface GetLatestLogMessagesParameters {
  upToTimeNanos: [] | [Nanos]
  count: number
  filter: [] | [GetLogMessagesFilter]
}
export interface GetLogMessagesFilter {
  analyzeCount: number
  messageRegex: [] | [string]
  messageContains: [] | [string]
}
export interface GetLogMessagesParameters {
  count: number
  filter: [] | [GetLogMessagesFilter]
  fromTimeNanos: [] | [Nanos]
}
export interface GetMetricsParameters {
  dateToMillis: bigint
  granularity: MetricsGranularity
  dateFromMillis: bigint
}
export interface GetTableMetadataInputType {
  databaseName: string
  tableName: string
}
export type GetTableMetadataOutputType =
  | []
  | [
      {
        metadata: TableMetadataOutputType
        databaseName: string
        tableName: string
      },
    ]
export type GetTableMetadataOutputType__1 =
  | []
  | [
      {
        metadata: TableMetadataOutputType
        databaseName: string
        tableName: string
      },
    ]
export interface HourlyMetricsData {
  updateCalls: UpdateCallsAggregatedData
  canisterHeapMemorySize: CanisterHeapMemoryAggregatedData
  canisterCycles: CanisterCyclesAggregatedData
  canisterMemorySize: CanisterMemoryAggregatedData
  timeMillis: bigint
}
export interface HttpHeader {
  value: string
  name: string
}
export interface HttpResponsePayload {
  status: bigint
  body: Uint8Array | number[]
  headers: Array<HttpHeader>
}
export type IndexName = string
export interface ItemOutputType {
  id: string
  item: Array<[string, AttributeDataValue__1]>
  createdAt: bigint
  updatedAt: bigint
}
export type LedgerIcrc1TransferError =
  | {
      GenericError: { message: string; error_code: bigint }
    }
  | { FetchTxHistoryError: { message: string } }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { GetAcceptedUserError: { message: string } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { FetchEventDetailsError: { message: string } }
  | { TooOld: null }
  | { SendEmailError: { message: string } }
  | { AddTxHistoryError: { message: string } }
  | { FreeEventError: { message: string } }
  | { InsufficientFunds: { balance: bigint } }
export type LedgerIcrc2TransferError =
  | {
      GenericError: { message: string; error_code: bigint }
    }
  | { FetchTxHistoryError: { message: string } }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: bigint } }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { CreateEventMetadataError: { message: string } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { FetchEventDetailsError: { message: string } }
  | { TooOld: null }
  | { AddTxHistoryError: { message: string } }
  | { InsufficientFunds: { balance: bigint } }
export interface LogMessagesData {
  timeNanos: Nanos
  message: string
}
export type MetricsGranularity = { hourly: null } | { daily: null }
export interface MetricsRequest {
  parameters: GetMetricsParameters
}
export interface MetricsResponse {
  metrics: [] | [CanisterMetrics]
}
export interface MissingFeedbackEvent {
  name: string
  end_date: bigint
  start_date: bigint
  event_id: string
}
export type MoneyTransferActions =
  | { RefundToRemitter: null }
  | { TransferToBeneficiary: null }
export type Nanos = bigint
export interface NumericEntity {
  avg: bigint
  max: bigint
  min: bigint
  first: bigint
  last: bigint
}
export interface PaginatedApplicationStatusOfMyCreatedEvents {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<ApplicationStatusOfMyCreatedEvents>
  totalRecords: bigint
  scannedItemCount: bigint
}
export interface PaginatedEventResponsePayload {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<EventResponsePayload>
  totalRecords: bigint
  scannedItemCount: bigint
}
export interface PaginatedFeedResponsePayload {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<FeedResponsePayload>
  totalRecords: bigint
  scannedItemCount: bigint
}
export interface PaginatedProposalResponsePayload {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<ProposalResponsePayload>
  totalRecords: bigint
  scannedItemCount: bigint
}
export interface PaginatedScanInputType {
  filterExpressions: Array<FilterExpressionType>
  offset: bigint
  sortObject: [] | [SortMultipleInputType]
  limit: bigint
  searchObject: [] | [SearchInputType]
  databaseName: string
  tableName: string
}
export type PaginatedScanOutputType =
  | {
      ok: {
        offset: bigint
        limit: bigint
        nonScannedItemCount: bigint
        items: Array<ItemOutputType>
        scannedItemCount: bigint
      }
    }
  | { err: Array<string> }
export interface PaginatedTransactionResponsePayload {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<TransactionResponsePayload>
  totalRecords: bigint
  scannedItemCount: bigint
}
export interface PaginatedTransactionWithUserDataResponse {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: Array<TransactionWithUserDataResponse>
  totalRecords: bigint
  scannedItemCount: bigint
}
export type ParticipationType =
  | { PersonToMultiplePersons: null }
  | { PersonToPerson: null }
export interface ProposalResponsePayload {
  userData: UserResponsePayload
  updated_at: bigint
  action: string
  event_description: string
  note: string
  event_id: string
  event_name: string
  location: string
}
export type QueryOpsInputType =
  | {
      PaginatedScanInput: PaginatedScanInputType
    }
  | { GetDatabasesInput: GetDatabasesInputType }
  | { GetItemByIdInput: GetItemByIdInputType }
  | { GetTableMetadataInput: GetTableMetadataInputType }
  | { ScanAndGetIdsInput: ScanAndGetIdsInputType }
  | { BatchGetItemByIdInput: BatchGetItemByIdInputType }
  | { ScanInput: ScanInputType }
  | { GetItemCountInput: GetItemCountInputType }
export type QueryOpsOutputType =
  | {
      GetTableMetadataOutput: GetTableMetadataOutputType__1
    }
  | { PaginatedScanOutput: PaginatedScanOutputType }
  | { ScanAndGetIdsOutput: ScanAndGetIdsOutputType }
  | { GetDatabasesOutput: GetDatabasesOutputType }
  | { GetItemCountOutput: GetItemCountOutputType }
  | { GetItemByIdOutput: GetItemByIdOutputType }
  | { BatchGetItemByIdOutput: BatchGetItemByIdOutputType }
  | { ScanOutput: ScanOutputType }
export type RecordingVisibility = { Private: null } | { Public: null }
export type RelationalExpressionAttributeDataValue =
  | { int: bigint }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { int16: number }
  | { int32: number }
  | { int64: bigint }
export type RelationalExpressionAttributeDataValue__1 =
  | { int: bigint }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { int16: number }
  | { int32: number }
  | { int64: bigint }
export interface RemoveCalendarEvent {
  event_id: string
}
export type Result = { ok: string } | { err: string }
export type Result_1 = { ok: string } | { err: LedgerIcrc2TransferError }
export type Result_10 =
  | { ok: PaginatedProposalResponsePayload }
  | { err: string }
export type Result_11 = { ok: bigint } | { err: string }
export type Result_12 =
  | { ok: Array<UserFeedbackResponsePayload> }
  | { err: Array<string> }
export type Result_13 =
  | { ok: Array<ForwardToExpertResponsePayload> }
  | { err: Array<string> }
export type Result_14 =
  | { ok: Array<UserActionEmailResponse> }
  | { err: Array<string> }
export type Result_15 =
  | { ok: Array<ExpertFeedbackResponsePayload> }
  | { err: Array<string> }
export type Result_16 =
  | { ok: Array<EventCompletionResponsePayload> }
  | { err: Array<string> }
export type Result_17 = { ok: EventResponsePayload } | { err: Array<string> }
export type Result_18 =
  | { ok: UserFeedbackResponsePayload }
  | { err: Array<string> }
export type Result_19 = { ok: FeedDetailsPayload } | { err: Array<string> }
export type Result_2 = { ok: string } | { err: Array<LedgerIcrc1TransferError> }
export type Result_20 =
  | { ok: Array<ApplicantsWithUserDataPayload> }
  | { err: Array<string> }
export type Result_21 =
  | { ok: Array<AppplicantIdsResponsePayload> }
  | { err: Array<string> }
export type Result_22 =
  | { ok: PaginatedApplicationStatusOfMyCreatedEvents }
  | { err: Array<string> }
export type Result_23 =
  | { ok: Array<EventApplicationStatus> }
  | { err: Array<string> }
export type Result_24 =
  | { ok: Array<TransactionResponsePayload> }
  | { err: string }
export type Result_25 =
  | { ok: Array<EventResponsePayload> }
  | { err: Array<string> }
export type Result_26 =
  | { ok: PaginatedTransactionResponsePayload }
  | { err: string }
export type Result_27 =
  | { ok: PaginatedEventResponsePayload }
  | { err: Array<string> }
export type Result_28 = { ok: boolean } | { err: string }
export type Result_29 = { ok: boolean } | { err: Array<string> }
export type Result_3 =
  | { ok: CreateUserFeedbackResponsePayload }
  | { err: string }
export type Result_4 =
  | { ok: Array<CreateUserFeedbackResponsePayload> }
  | { err: string }
export type Result_5 =
  | { ok: PaginatedTransactionWithUserDataResponse }
  | { err: Array<string> }
export type Result_6 = { ok: Array<FeedResponsePayload> } | { err: string }
export type Result_7 =
  | { ok: Array<FeedResponsePayload> }
  | { err: Array<string> }
export type Result_8 =
  | { ok: PaginatedFeedResponsePayload }
  | { err: Array<string> }
export type Result_9 = { ok: Array<ProposalResponsePayload> } | { err: string }
export interface ScanAndGetIdsInputType {
  filterExpressions: Array<FilterExpressionType>
  databaseName: string
  tableName: string
}
export type ScanAndGetIdsOutputType =
  | { ok: { ids: Array<string> } }
  | { err: Array<string> }
export interface ScanInputType {
  filterExpressions: Array<FilterExpressionType>
  databaseName: string
  tableName: string
}
export type ScanOutputType =
  | { ok: Array<ItemOutputType> }
  | { err: Array<string> }
export type ScanOutputType__1 =
  | { ok: Array<ItemOutputType> }
  | { err: Array<string> }
export interface SearchInputType {
  searchValue: [] | [string]
  foreignKeys: [] | [Array<ForeignKeyInputType>]
}
export type SortDirection = { asc: null } | { desc: null }
export type SortMultipleInputType = Array<{
  sortKey: [] | [string]
  sortDirection: [] | [SortDirection]
  sortKeyDataType: [] | [AttributeDataType__1]
}>
export interface StatusRequest {
  memory_size: boolean
  cycles: boolean
  heap_memory_size: boolean
}
export interface StatusResponse {
  memory_size: [] | [bigint]
  cycles: [] | [bigint]
  heap_memory_size: [] | [bigint]
}
export type StringAttributeDataValue = { char: number } | { text: string }
export interface TableIndexMetadata {
  name: IndexName
  attributeName: AttributeName
}
export interface TableMetadataOutputType {
  attributes: Array<AttributeMetadata>
  indexes: Array<TableIndexMetadata>
}
export type Timestamp = bigint
export type Token = { ICP: null } | { FREE: null } | { CKBTC: null }
export interface TransactionResponsePayload {
  fee: bigint
  transaction_id: string
  beneficiary_user_id: string
  transferred_to_type: string
  block_index: bigint
  memo: Uint8Array | number[]
  source_account_id_hex: string
  narration: string
  remitter_user_id: string
  event_id: string
  created_at_time: bigint
  destination_account_id_hex: string
  amount: bigint
}
export interface TransactionUser {
  firstname: string
  username: string
  email: string
  lastname: string
}
export interface TransactionWithUserDataResponse {
  fee: bigint
  url: string
  transaction_id: string
  beneficiary_user_id: string
  transferred_to_type: string
  block_index: bigint
  beneficiary_user_data: [] | [TransactionUser]
  memo: Uint8Array | number[]
  source_account_id_hex: string
  narration: string
  remitter_user_id: string
  event_id: string
  created_at_time: bigint
  destination_account_id_hex: string
  amount: bigint
  eventData: FeedResponsePayloadWithoutUser
}
export interface TransferRequestPayload {
  fee: [] | [bigint]
  eventId: string
  memo: [] | [Uint8Array | number[]]
  priceToken: Token
  amount: bigint
}
export interface TransformArgs {
  context: Uint8Array | number[]
  response: HttpResponsePayload
}
export type UpdateCallsAggregatedData = BigUint64Array | bigint[]
export interface UpdateInformationRequest {
  metrics: [] | [CollectMetricsRequestType]
}
export interface UpdateItemInputType {
  id: string
  databaseName: string
  attributeDataValues: Array<[string, AttributeDataValue__1]>
  tableName: string
}
export type UpdateItemOutputType =
  | {
      ok: { id: string; item: Array<[string, AttributeDataValue__1]> }
    }
  | { err: Array<string> }
export type UpdateOpsInputType =
  | {
      DropAttributeInput: DropAttributeInputType
    }
  | { UpdateItemInput: UpdateItemInputType }
  | { CreateDatabaseInput: CreateDatabaseInputType }
  | { CreateTableInput: CreateTableInputType }
  | { CreateItemInput: CreateItemInputType }
  | { AddAttributeInput: AddAttributeInputType }
export type UpdateOpsOutputType =
  | {
      AddAttributeOutput: AddAttributeOutputType
    }
  | { CreateItemOutput: CreateItemOutputType }
  | { UpdateItemOutput: UpdateItemOutputType }
  | { CreateDatabaseOutput: CreateDatabaseOutputType }
  | { CreateTableOutput: CreateTableOutputType }
  | { DropAttributeOutput: DropAttributeOutputType }
export interface UserActionEmailResponse {
  to: string
  action: string
  to_user_id: string
  from: string
  template_name: string
  from_user_id: string
  timestamp: bigint
  event_id: string
  message_id: string
  idempotency_key: string
}
export interface UserFeedbackRequestPayload {
  timezone: string
  recording_link: [] | [string]
  firstname: string
  username: string
  email: string
  rating: [] | [bigint]
  event_id: string
  successful: FeedbackActions
  lastname: string
  reason: [] | [string]
}
export interface UserFeedbackResponsePayload {
  id: string
  timezone: string
  recording_link: string
  firstname: string
  user_type: string
  username: string
  user_id: string
  email: string
  rating: bigint
  event_id: string
  successful: string
  lastname: string
  reason: string
}
export interface UserResponsePayload {
  id: string
  bio: string
  categories: Array<string>
  timezone: string
  firstname: string
  country: string
  username: string
  introduction_video_link: string
  canister_id: string
  email: string
  principal_id: string
  profilepic: string
  coverphoto: string
  lastname: string
}
export interface _SERVICE {
  acceptUserApplication: ActorMethod<[string, string], Result>
  applyToServiceRequest: ActorMethod<[ApplyToServiceRequestPayload], Result>
  cancelKonectaEvent: ActorMethod<[string], Result>
  cancelKonectaEventTest: ActorMethod<[string, string], Result>
  checkFeedbackByUserForEvent: ActorMethod<
    [string, string, Array<RelationalExpressionAttributeDataValue__1>],
    boolean
  >
  checkIfAcceptedUserExistsForEvent: ActorMethod<[string], boolean>
  checkIfEventExistsForTheDay: ActorMethod<[CheckEventExistsPayload], Result_29>
  checkIfEventExistsForTheDayTest: ActorMethod<
    [string, CheckEventExistsPayload],
    Result_29
  >
  checkIfEventIsCanceled: ActorMethod<[string], Result_28>
  checkIfUserFeedbackExistsForEvent: ActorMethod<[string], Result_28>
  checkIfUserFeedbackExistsForEventTest: ActorMethod<
    [string, string],
    Result_28
  >
  checkIfUserIsOfferAttendee: ActorMethod<[Principal, string], boolean>
  checkIfUserIsOfferAttendeeOrRequestAcceptedUser: ActorMethod<
    [Principal, string],
    boolean
  >
  createKonectaEvent: ActorMethod<[string, EventRequestPayload], Result>
  declineUserApplication: ActorMethod<[string, string], Result>
  eventCompletionNotificationTableMetadata: ActorMethod<
    [],
    GetTableMetadataOutputType
  >
  expertEmailTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  expertFeedbackTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  generateFeedResponse: ActorMethod<[Result_25], Result_7>
  generatePaginatedFeedResponse: ActorMethod<[Result_27], Result_8>
  generateSchema: ActorMethod<[], string>
  generateTransactionResponse: ActorMethod<[Result_26], Result_5>
  getAllFutureOffers: ActorMethod<[FeedRequestPayload], Result_8>
  getAllFutureRequests: ActorMethod<[FeedRequestPayload], Result_8>
  getAllKonectAEvents: ActorMethod<[], Result_25>
  getAllPaginatedTransactions: ActorMethod<[bigint, bigint], Result_5>
  getAllPastOffers: ActorMethod<[FeedRequestPayload], Result_8>
  getAllPastRequests: ActorMethod<[FeedRequestPayload], Result_8>
  getAllTransactions: ActorMethod<[], Result_24>
  getApplicationStatusForEvents: ActorMethod<[], Result_23>
  getApplicationStatusForEventsTest: ActorMethod<[string], Result_23>
  getApplicationStatusOfMyCreatedEvents: ActorMethod<
    [bigint, bigint],
    Result_22
  >
  getApplicationStatusOfMyCreatedEventsTest: ActorMethod<
    [string, bigint, bigint],
    Result_22
  >
  getAppliedUsersByActionForEvent: ActorMethod<
    [string, Array<EventAttendeeActions>],
    Result_21
  >
  getAppliedUsersByActionWithUserData: ActorMethod<
    [string, Array<EventAttendeeActions>],
    Result_20
  >
  getCanistergeekInformation: ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >
  getDefaultAccountIdentifier: ActorMethod<[], string>
  getDefaultAccountIdentifierTest: ActorMethod<[string], string>
  getEventArrayFromEventIdArray: ActorMethod<
    [Array<EventResponsePayload>],
    EventWithUserDataTupleArray
  >
  getEventCanisterDetailsByCompositeQuery: ActorMethod<
    [string],
    EventCanisterResponseWithoutUser
  >
  getFeedDetailsByEventId: ActorMethod<[string], Result_19>
  getFeedbackById: ActorMethod<[string], Result_18>
  getKonectaEventDetailsByEventId: ActorMethod<[string], Result_17>
  getKonectaEventTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  getLedgerAccount: ActorMethod<[string, [] | [string]], string>
  getListOfEventCompletionEmails: ActorMethod<[], Result_16>
  getListOfExpertFeedbacks: ActorMethod<[], Result_15>
  getListOfMissingFeedbackEvents: ActorMethod<[], Result_7>
  getListOfMissingFeedbackEventsTest: ActorMethod<[string], Result_7>
  getListOfUserActionEmails: ActorMethod<[], Result_14>
  getListOfUserFeedbackForwardedEmailsToExpert: ActorMethod<[], Result_13>
  getListOfUserFeedbacks: ActorMethod<[], Result_12>
  getMissingFeedbackEventArray: ActorMethod<
    [Array<string>],
    Array<MissingFeedbackEvent>
  >
  getMyJoinedEvents: ActorMethod<[], Result_7>
  getMyJoinedEventsCount: ActorMethod<[], Result_11>
  getMyPaginatedProposals: ActorMethod<[bigint, bigint], Result_10>
  getMyPaginatedProposalsTest: ActorMethod<[string, bigint, bigint], Result_10>
  getMyProposals: ActorMethod<[], Result_9>
  getMyProposalsTest: ActorMethod<[string], Result_9>
  getMyServiceOffers: ActorMethod<[], Result_7>
  getMyServiceOffersTest: ActorMethod<[string], Result_7>
  getMyServiceOffersUntransformed: ActorMethod<[string], ScanOutputType__1>
  getMyServiceRequests: ActorMethod<[], Result_7>
  getMyServiceRequestsTest: ActorMethod<[string], Result_7>
  getMyServiceRequestsUntransformed: ActorMethod<[string], ScanOutputType__1>
  getPaginatedJoinedOffersForMyProfile: ActorMethod<[bigint, bigint], Result_8>
  getPaginatedJoinedOffersForMyProfileTest: ActorMethod<
    [string, bigint, bigint],
    Result_8
  >
  getPaginatedJoinedRequestsForMyProfile: ActorMethod<
    [bigint, bigint],
    Result_8
  >
  getPaginatedJoinedRequestsForMyProfileTest: ActorMethod<
    [string, bigint, bigint],
    Result_8
  >
  getPaginatedServiceOffersForMyProfile: ActorMethod<[bigint, bigint], Result_8>
  getPaginatedServiceOffersForMyProfileTest: ActorMethod<
    [string, bigint, bigint],
    Result_8
  >
  getPaginatedServiceRequestsForMyProfile: ActorMethod<
    [bigint, bigint],
    Result_8
  >
  getPaginatedServiceRequestsForMyProfileTest: ActorMethod<
    [string, bigint, bigint],
    Result_8
  >
  getPrincipal: ActorMethod<[string], Principal>
  getServiceOffersApartFromMe: ActorMethod<[], Result_7>
  getServiceOffersApartFromMeTest: ActorMethod<[string], Result_7>
  getServiceOffersApartFromMeUntransformed: ActorMethod<
    [string],
    ScanOutputType__1
  >
  getServiceOffersForMyProfile: ActorMethod<[], Result_6>
  getServiceOffersForMyProfileTest: ActorMethod<[string], Result_6>
  getServiceRequestsApartFromMe: ActorMethod<[], Result_7>
  getServiceRequestsApartFromMeTest: ActorMethod<[string], Result_7>
  getServiceRequestsApartFromMeUntransformed: ActorMethod<
    [string],
    ScanOutputType__1
  >
  getServiceRequestsForMyProfile: ActorMethod<[], Result_6>
  getServiceRequestsForMyProfileTest: ActorMethod<[string], Result_6>
  getSubAccountIdBlobFromIndexForPrincipal: ActorMethod<
    [string, bigint],
    Uint8Array | number[]
  >
  getSubAccountIdFromIndex: ActorMethod<[bigint], string>
  getSubAccountIdFromIndexForPrincipal: ActorMethod<[string, bigint], string>
  getTransactionTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  getTransactionsForEventByType: ActorMethod<
    [bigint, bigint, string, string],
    Result_5
  >
  getTransactionsForUser: ActorMethod<[bigint, bigint], Result_5>
  getTransactionsForUserByType: ActorMethod<[bigint, bigint, string], Result_5>
  getTransactionsForUserByTypeTest: ActorMethod<
    [bigint, bigint, string, string],
    Result_5
  >
  getTransactionsForUserTest: ActorMethod<[bigint, bigint, string], Result_5>
  getUserDetailsByCompositeQuery: ActorMethod<[string], UserResponsePayload>
  getUserFeedbackTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  getUserStatusForEvent: ActorMethod<[string], string>
  getUserStatusForServiceOffers: ActorMethod<[Principal, string], string>
  getUserStatusForServiceRequests: ActorMethod<[Principal, string], string>
  get_trusted_origins: ActorMethod<[], Array<string>>
  icrc28_trusted_origins: ActorMethod<[], { trusted_origins: Array<string> }>
  insertExpertFeedback: ActorMethod<[ExpertFeedbackRequestPayload], Result>
  insertMultipleUserFeedback: ActorMethod<
    [Array<UserFeedbackRequestPayload>],
    Result_4
  >
  insertMultipleUserFeedbackTest: ActorMethod<
    [string, Array<UserFeedbackRequestPayload>],
    Result_4
  >
  insertUserFeedback: ActorMethod<[UserFeedbackRequestPayload], Result_3>
  insertUserFeedbackTest: ActorMethod<
    [string, UserFeedbackRequestPayload],
    Result_3
  >
  isWhiteListUser: ActorMethod<[string], boolean>
  joinPublicEvent: ActorMethod<[string], Result>
  queryOperation: ActorMethod<
    [{ queryOpsInput: QueryOpsInputType }],
    QueryOpsOutputType
  >
  resolutionResponseTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  runMoneyTransferJob: ActorMethod<[], Result>
  runMoneyTransferJobForHoursTest: ActorMethod<[bigint], Result>
  runMoneyTransferTestForEvent: ActorMethod<[string], Result>
  runMoneyTransferTestJob: ActorMethod<[], Result>
  sendEmail: ActorMethod<[], EmailResponse>
  sendEventCompletionEmail: ActorMethod<[], Result>
  sendEventCompletionEmailHoursTest: ActorMethod<[bigint], Result>
  sendEventCompletionEmailTest: ActorMethod<[string], Result>
  transferAmountFromSubAccountToUserForEvent: ActorMethod<[string], Result_2>
  transferAmountFromUserToEventSubAccount: ActorMethod<
    [TransferRequestPayload],
    Result_1
  >
  transferAmountFromUserToEventSubAccountTest: ActorMethod<
    [string, TransferRequestPayload],
    Result_1
  >
  transform: ActorMethod<[TransformArgs], HttpResponsePayload>
  updateCanistergeekInformation: ActorMethod<
    [UpdateInformationRequest],
    undefined
  >
  updateKonectaEvent: ActorMethod<[string, EventRequestPayload], string>
  updateMultipleKonectaEvents: ActorMethod<
    [string, Array<EventRequestPayload>],
    Result
  >
  updateOperation: ActorMethod<
    [{ updateOpsInput: UpdateOpsInputType }],
    UpdateOpsOutputType
  >
  userActionTableMetadata: ActorMethod<[], GetTableMetadataOutputType>
  withdrawEventPartipication: ActorMethod<[RemoveCalendarEvent], Result>
  withdrawEventPartipicationTest: ActorMethod<
    [string, RemoveCalendarEvent],
    Result
  >
}
export declare const idlFactory: IDL.InterfaceFactory
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[]
