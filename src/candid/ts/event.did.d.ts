/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
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
export type EventAttendeeActions =
  | { Invited: null }
  | { Applied: null }
  | { Withdrawn: null }
  | { Accepted: null }
  | { Declined: null }
  | { Joined: null }
export interface EventAttendeeRequestPayload {
  invitee_user_id: Principal
  action: EventAttendeeActions
  event_status: string
  timestamp: bigint
  event_id: string
  event_type: string
  participation_type: string
}
export interface EventRequestPayload {
  status: EventStatus
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
  name: string
  description: string
  end_date: bigint
  user_id: [] | [Principal]
  language: [] | [string]
  start_date: bigint
  location: string
  coverphoto:
    | []
    | [
        {
          fileName: string
          fileType: string
          fileDataObject: Uint8Array | number[]
        },
      ]
}
export interface EventResponsePayload {
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
export type EventStatus =
  | { Draft: null }
  | { Created: null }
  | { Canceled: null }
export interface EventWithUserDataPayload {
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
export type EventWithUserDataTupleArray = Array<
  [string, EventWithUserDataPayload]
>
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
export type GetDatabasesInputType = {}
export interface GetDatabasesOutputType {
  databases: Array<{ name: string; tables: Array<string> }>
}
export type GetFileOutputType =
  | []
  | [
      {
        fileData: Uint8Array | number[]
        fileName: string
        fileSize: bigint
        fileType: string
        fileId: string
      },
    ]
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
export type HeaderField = [string, string]
export interface HourlyMetricsData {
  updateCalls: UpdateCallsAggregatedData
  canisterHeapMemorySize: CanisterHeapMemoryAggregatedData
  canisterCycles: CanisterCyclesAggregatedData
  canisterMemorySize: CanisterMemoryAggregatedData
  timeMillis: bigint
}
export interface HttpRequest {
  url: string
  method: string
  body: Uint8Array | number[]
  headers: Array<HeaderField>
  certificate_version: [] | [number]
}
export interface HttpResponse {
  body: Uint8Array | number[]
  headers: Array<HeaderField>
  streaming_strategy: [] | [StreamingStrategy]
  status_code: number
}
export type IndexName = string
export interface ItemOutputType {
  id: string
  item: Array<[string, AttributeDataValue__1]>
  createdAt: bigint
  updatedAt: bigint
}
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
export type Nanos = bigint
export interface NumericEntity {
  avg: bigint
  max: bigint
  min: bigint
  first: bigint
  last: bigint
}
export interface PaginatedEventResponsePayload {
  offset: bigint
  limit: bigint
  nonScannedItemCount: bigint
  items: EventWithUserDataTupleArray
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
      GetTableMetadataOutput: GetTableMetadataOutputType
    }
  | { PaginatedScanOutput: PaginatedScanOutputType }
  | { ScanAndGetIdsOutput: ScanAndGetIdsOutputType }
  | { GetDatabasesOutput: GetDatabasesOutputType }
  | { GetItemCountOutput: GetItemCountOutputType }
  | { GetItemByIdOutput: GetItemByIdOutputType }
  | { BatchGetItemByIdOutput: BatchGetItemByIdOutputType }
  | { ScanOutput: ScanOutputType }
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
export type Result = { ok: EventWithUserDataPayload } | { err: string }
export type Result_1 = { ok: string } | { err: string }
export type Result_2 =
  | { ok: PaginatedEventResponsePayload }
  | { err: Array<string> }
export type Result_3 =
  | { ok: Array<EventResponsePayload> }
  | { err: Array<string> }
export type Result_4 = { ok: Array<string> } | { err: Array<string> }
export type Result_5 = { ok: EventResponsePayload } | { err: Array<string> }
export type Result_6 =
  | { ok: Array<UserResponsePayload> }
  | { err: Array<string> }
export type Result_7 = { ok: Array<string> } | { err: string }
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
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken__1],
  StreamingCallbackHttpResponse__1
>
export interface StreamingCallbackHttpResponse {
  token: [] | [StreamingCallbackToken__1]
  body: Uint8Array | number[]
}
export interface StreamingCallbackHttpResponse__1 {
  token: [] | [StreamingCallbackToken__1]
  body: Uint8Array | number[]
}
export interface StreamingCallbackToken {
  file_size: bigint
  index: bigint
  chunk_size: bigint
  file_id: string
}
export interface StreamingCallbackToken__1 {
  file_size: bigint
  index: bigint
  chunk_size: bigint
  file_id: string
}
export type StreamingStrategy = {
  Callback: {
    token: StreamingCallbackToken__1
    callback: StreamingCallback
  }
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
export interface WithdrawAttendeeRequestPayload {
  invitee_user_id: Principal
  action: EventAttendeeActions
  event_status: string
  timestamp: bigint
  event_id: string
  event_type: string
}
export interface _SERVICE {
  addEventAttendee: ActorMethod<[EventAttendeeRequestPayload], Result_1>
  cancelEvent: ActorMethod<[Principal, string, string], Result_7>
  checkIfAttendeeExistsForEvent: ActorMethod<[Principal, string], boolean>
  checkIfAttendeeOrAcceptedUserExistsForEvent: ActorMethod<
    [Principal, string],
    boolean
  >
  createEvent: ActorMethod<[string, EventRequestPayload], string>
  generateSchema: ActorMethod<[], string>
  getAttendeeStatusForEvent: ActorMethod<[Principal, string], string>
  getAttendeesByActionWithUserDetails: ActorMethod<
    [string, EventAttendeeActions],
    Result_6
  >
  getAttendeesForEmail: ActorMethod<[string, EventAttendeeActions], Result_6>
  getAttendeesIdsByAction: ActorMethod<[string, EventAttendeeActions], Result_4>
  getBatchEventsByCompositeQuery: ActorMethod<
    [Array<string>],
    Array<EventResponsePayload>
  >
  getCanistergeekInformation: ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >
  getEventAndUserDetailsByCompositeQuery: ActorMethod<
    [string],
    EventWithUserDataPayload
  >
  getEventArrayFromEventIdArray: ActorMethod<
    [Array<string>],
    EventWithUserDataTupleArray
  >
  getEventDetailsByEventId: ActorMethod<[string], Result_5>
  getEventDetailsByUserId: ActorMethod<[string], Result_3>
  getEventDetailsByUserPrincipal: ActorMethod<[], Result_3>
  getEventDetailsWithUserData: ActorMethod<[string], EventWithUserDataPayload>
  getEventTableMetadata: ActorMethod<[], GetTableMetadataOutputType__1>
  getEventsForAttendee: ActorMethod<[string], Result_4>
  getEventsForAttendeeWithEventData: ActorMethod<[string], Result_3>
  getFile: ActorMethod<[string], GetFileOutputType>
  getFutureOrPastEvents: ActorMethod<
    [bigint, Array<string>, boolean],
    EventWithUserDataTupleArray
  >
  getPaginatedEventsForAttendee: ActorMethod<[string, bigint, bigint], Result_2>
  getUserDetailsByCompositeQuery: ActorMethod<[string], UserResponsePayload>
  get_trusted_origins: ActorMethod<[], Array<string>>
  http_request: ActorMethod<[HttpRequest], HttpResponse>
  http_request_streaming_callback: ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse
  >
  icrc28_trusted_origins: ActorMethod<[], { trusted_origins: Array<string> }>
  isWhiteListUser: ActorMethod<[string], boolean>
  queryOperation: ActorMethod<
    [{ queryOpsInput: QueryOpsInputType }],
    QueryOpsOutputType
  >
  updateCanistergeekInformation: ActorMethod<
    [UpdateInformationRequest],
    undefined
  >
  updateEvent: ActorMethod<[string, string, EventRequestPayload], Result_1>
  updateEventUsingUserPrincipal: ActorMethod<
    [Principal, string, string, EventRequestPayload],
    Result_1
  >
  updateOperation: ActorMethod<
    [{ updateOpsInput: UpdateOpsInputType }],
    UpdateOpsOutputType
  >
  withdrawEventAttendee: ActorMethod<[WithdrawAttendeeRequestPayload], Result>
}
export declare const idlFactory: IDL.InterfaceFactory
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[]
