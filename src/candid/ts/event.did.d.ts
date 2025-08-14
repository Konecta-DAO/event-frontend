import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AttributeDataType = { 'int' : null } |
  { 'map' : null } |
  { 'nat' : null } |
  { 'float' : null } |
  { 'principal' : null } |
  { 'blob' : null } |
  { 'bool' : null } |
  { 'char' : null } |
  { 'int8' : null } |
  { 'list' : null } |
  { 'nat8' : null } |
  { 'text' : null } |
  { 'nat16' : null } |
  { 'nat32' : null } |
  { 'nat64' : null } |
  { 'default' : null } |
  { 'int16' : null } |
  { 'int32' : null } |
  { 'int64' : null };
export type AttributeDataValue = { 'int' : bigint } |
  {
    'map' : Array<
      [
        string,
        { 'int' : bigint } |
          { 'nat' : bigint } |
          { 'float' : number } |
          { 'char' : number } |
          { 'int8' : number } |
          {
            'list' : Array<
              { 'int' : bigint } |
                { 'nat' : bigint } |
                { 'float' : number } |
                { 'char' : number } |
                { 'int8' : number } |
                { 'nat8' : number } |
                { 'text' : string } |
                { 'nat16' : number } |
                { 'nat32' : number } |
                { 'nat64' : bigint } |
                { 'int16' : number } |
                { 'int32' : number } |
                { 'int64' : bigint }
            >
          } |
          { 'nat8' : number } |
          { 'text' : string } |
          { 'nat16' : number } |
          { 'nat32' : number } |
          { 'nat64' : bigint } |
          { 'int16' : number } |
          { 'int32' : number } |
          { 'int64' : bigint },
      ]
    >
  } |
  { 'nat' : bigint } |
  { 'float' : number } |
  { 'principal' : Principal } |
  { 'blob' : Uint8Array | number[] } |
  { 'bool' : boolean } |
  { 'char' : number } |
  { 'int8' : number } |
  {
    'list' : Array<
      { 'int' : bigint } |
        { 'nat' : bigint } |
        { 'float' : number } |
        { 'char' : number } |
        { 'int8' : number } |
        { 'nat8' : number } |
        { 'text' : string } |
        { 'nat16' : number } |
        { 'nat32' : number } |
        { 'nat64' : bigint } |
        { 'int16' : number } |
        { 'int32' : number } |
        { 'int64' : bigint }
    >
  } |
  { 'nat8' : number } |
  { 'text' : string } |
  { 'nat16' : number } |
  { 'nat32' : number } |
  { 'nat64' : bigint } |
  { 'default' : null } |
  { 'int16' : number } |
  { 'int32' : number } |
  { 'int64' : bigint };
export interface AttributeMetadata {
  'name' : AttributeName,
  'unique' : boolean,
  'dataType' : AttributeDataType,
  'required' : boolean,
  'defaultValue' : AttributeDataValue,
}
export type AttributeName = string;
export type CanisterCyclesAggregatedData = BigUint64Array | bigint[];
export type CanisterHeapMemoryAggregatedData = BigUint64Array | bigint[];
export type CanisterLogFeature = { 'filterMessageByContains' : null } |
  { 'filterMessageByRegex' : null };
export interface CanisterLogMessages {
  'data' : Array<LogMessagesData>,
  'lastAnalyzedMessageTimeNanos' : [] | [Nanos],
}
export interface CanisterLogMessagesInfo {
  'features' : Array<[] | [CanisterLogFeature]>,
  'lastTimeNanos' : [] | [Nanos],
  'count' : number,
  'firstTimeNanos' : [] | [Nanos],
}
export type CanisterLogRequest = { 'getMessagesInfo' : null } |
  { 'getMessages' : GetLogMessagesParameters } |
  { 'getLatestMessages' : GetLatestLogMessagesParameters };
export type CanisterLogResponse = { 'messagesInfo' : CanisterLogMessagesInfo } |
  { 'messages' : CanisterLogMessages };
export type CanisterMemoryAggregatedData = BigUint64Array | bigint[];
export interface CanisterMetrics { 'data' : CanisterMetricsData }
export type CanisterMetricsData = { 'hourly' : Array<HourlyMetricsData> } |
  { 'daily' : Array<DailyMetricsData> };
export type CollectMetricsRequestType = { 'force' : null } |
  { 'normal' : null };
export type ContaintmentExpressionAttributeDataValue = { 'char' : number } |
  {
    'list' : Array<
      { 'int' : bigint } |
        { 'nat' : bigint } |
        { 'float' : number } |
        { 'char' : number } |
        { 'int8' : number } |
        { 'nat8' : number } |
        { 'text' : string } |
        { 'nat16' : number } |
        { 'nat32' : number } |
        { 'nat64' : bigint } |
        { 'int16' : number } |
        { 'int32' : number } |
        { 'int64' : bigint }
    >
  } |
  { 'text' : string };
export interface DailyMetricsData {
  'updateCalls' : bigint,
  'canisterHeapMemorySize' : NumericEntity,
  'canisterCycles' : NumericEntity,
  'canisterMemorySize' : NumericEntity,
  'timeMillis' : bigint,
}
export type EventAttendeeActions = { 'Invited' : null } |
  { 'Applied' : null } |
  { 'Withdrawn' : null } |
  { 'Accepted' : null } |
  { 'Declined' : null } |
  { 'Joined' : null };
export interface EventAttendeeRequestPayload {
  'invitee_user_id' : Principal,
  'action' : EventAttendeeActions,
  'event_status' : string,
  'metadata' : [] | [Array<[string, StringAttributeDataValue]>],
  'timestamp' : bigint,
  'event_id' : string,
  'event_type' : string,
  'participation_type' : string,
}
export interface EventAttendeeResponsePayload {
  'id' : string,
  'invitee_user_id' : string,
  'action' : string,
  'event_status' : string,
  'metadata' : [] | [Array<[string, StringAttributeDataValue]>],
  'timestamp' : bigint,
  'event_id' : string,
}
export interface EventRequestPayload {
  'categories' : Array<string>,
  'status' : EventStatus,
  'token_amount' : [] | [number],
  'price_token' : [] | [Token],
  'interests' : [] | [Array<string>],
  'metadata' : [] | [
    Array<
      [
        string,
        { 'int' : bigint } |
          { 'nat' : bigint } |
          { 'float' : number } |
          { 'char' : number } |
          { 'int8' : number } |
          {
            'list' : Array<
              { 'int' : bigint } |
                { 'nat' : bigint } |
                { 'float' : number } |
                { 'char' : number } |
                { 'int8' : number } |
                { 'nat8' : number } |
                { 'text' : string } |
                { 'nat16' : number } |
                { 'nat32' : number } |
                { 'nat64' : bigint } |
                { 'int16' : number } |
                { 'int32' : number } |
                { 'int64' : bigint }
            >
          } |
          { 'nat8' : number } |
          { 'text' : string } |
          { 'nat16' : number } |
          { 'nat32' : number } |
          { 'nat64' : bigint } |
          { 'int16' : number } |
          { 'int32' : number } |
          { 'int64' : bigint },
      ]
    >
  ],
  'name' : string,
  'recording_visibility' : [] | [RecordingVisibility],
  'description' : string,
  'end_date' : bigint,
  'user_id' : [] | [Principal],
  'consultations' : [] | [Array<string>],
  'language' : [] | [string],
  'start_date' : bigint,
  'expertise' : [] | [string],
  'showcase_link' : [] | [string],
  'subaccount_id_hex' : string,
  'subaccount_id_index' : bigint,
  'is_recording_available' : [] | [boolean],
  'location' : string,
  'event_type' : EventType,
  'coverphoto' : [] | [
    {
      'fileName' : string,
      'fileType' : string,
      'fileDataObject' : Uint8Array | number[],
    }
  ],
  'participation_type' : [] | [ParticipationType],
}
export interface EventResponsePayload {
  'categories' : Array<string>,
  'status' : string,
  'token_amount' : number,
  'price_token' : string,
  'interests' : Array<string>,
  'metadata' : Array<
    [
      string,
      { 'int' : bigint } |
        { 'nat' : bigint } |
        { 'float' : number } |
        { 'char' : number } |
        { 'int8' : number } |
        {
          'list' : Array<
            { 'int' : bigint } |
              { 'nat' : bigint } |
              { 'float' : number } |
              { 'char' : number } |
              { 'int8' : number } |
              { 'nat8' : number } |
              { 'text' : string } |
              { 'nat16' : number } |
              { 'nat32' : number } |
              { 'nat64' : bigint } |
              { 'int16' : number } |
              { 'int32' : number } |
              { 'int64' : bigint }
          >
        } |
        { 'nat8' : number } |
        { 'text' : string } |
        { 'nat16' : number } |
        { 'nat32' : number } |
        { 'nat64' : bigint } |
        { 'int16' : number } |
        { 'int32' : number } |
        { 'int64' : bigint },
    ]
  >,
  'name' : string,
  'recording_visibility' : string,
  'description' : string,
  'end_date' : bigint,
  'user_id' : string,
  'consultations' : Array<string>,
  'language' : string,
  'start_date' : bigint,
  'expertise' : string,
  'showcase_link' : string,
  'subaccount_id_hex' : string,
  'subaccount_id_index' : bigint,
  'event_id' : string,
  'is_recording_available' : boolean,
  'location' : string,
  'event_type' : string,
  'coverphoto' : string,
  'participation_type' : string,
}
export type EventStatus = { 'Draft' : null } |
  { 'Created' : null } |
  { 'Canceled' : null };
export type EventType = { 'Request' : null } |
  { 'Offer' : null };
export interface EventWithUserDataPayload {
  'categories' : Array<string>,
  'userData' : UserResponsePayload,
  'status' : string,
  'token_amount' : number,
  'price_token' : string,
  'interests' : Array<string>,
  'metadata' : Array<
    [
      string,
      { 'int' : bigint } |
        { 'nat' : bigint } |
        { 'float' : number } |
        { 'char' : number } |
        { 'int8' : number } |
        {
          'list' : Array<
            { 'int' : bigint } |
              { 'nat' : bigint } |
              { 'float' : number } |
              { 'char' : number } |
              { 'int8' : number } |
              { 'nat8' : number } |
              { 'text' : string } |
              { 'nat16' : number } |
              { 'nat32' : number } |
              { 'nat64' : bigint } |
              { 'int16' : number } |
              { 'int32' : number } |
              { 'int64' : bigint }
          >
        } |
        { 'nat8' : number } |
        { 'text' : string } |
        { 'nat16' : number } |
        { 'nat32' : number } |
        { 'nat64' : bigint } |
        { 'int16' : number } |
        { 'int32' : number } |
        { 'int64' : bigint },
    ]
  >,
  'name' : string,
  'recording_visibility' : string,
  'description' : string,
  'end_date' : bigint,
  'user_id' : string,
  'consultations' : Array<string>,
  'language' : string,
  'start_date' : bigint,
  'expertise' : string,
  'showcase_link' : string,
  'subaccount_id_hex' : string,
  'subaccount_id_index' : bigint,
  'event_id' : string,
  'is_recording_available' : boolean,
  'location' : string,
  'event_type' : string,
  'coverphoto' : string,
  'participation_type' : string,
}
export type EventWithUserDataTupleArray = Array<
  [string, EventWithUserDataPayload]
>;
export type FilterExpressionConditionType = {
    'EQ' : RelationalExpressionAttributeDataValue
  } |
  { 'GT' : RelationalExpressionAttributeDataValue } |
  { 'IN' : Array<RelationalExpressionAttributeDataValue> } |
  { 'LT' : RelationalExpressionAttributeDataValue } |
  { 'GTE' : RelationalExpressionAttributeDataValue } |
  { 'LTE' : RelationalExpressionAttributeDataValue } |
  { 'NEQ' : RelationalExpressionAttributeDataValue } |
  { 'NOT_EXISTS' : null } |
  { 'EXISTS' : null } |
  { 'CONTAINS' : ContaintmentExpressionAttributeDataValue } |
  { 'BEGINS_WITH' : StringAttributeDataValue } |
  { 'NOT_CONTAINS' : ContaintmentExpressionAttributeDataValue } |
  {
    'BETWEEN' : [
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ]
  } |
  {
    'NOT_BETWEEN' : [
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ]
  };
export interface FilterExpressionType {
  'filterExpressionCondition' : FilterExpressionConditionType,
  'attributeNames' : string,
}
export type GetFileOutputType = [] | [
  {
    'fileData' : Uint8Array | number[],
    'fileName' : string,
    'fileSize' : bigint,
    'fileType' : string,
    'fileId' : string,
  }
];
export interface GetInformationRequest {
  'status' : [] | [StatusRequest],
  'metrics' : [] | [MetricsRequest],
  'logs' : [] | [CanisterLogRequest],
  'version' : boolean,
}
export interface GetInformationResponse {
  'status' : [] | [StatusResponse],
  'metrics' : [] | [MetricsResponse],
  'logs' : [] | [CanisterLogResponse],
  'version' : [] | [bigint],
}
export interface GetLatestLogMessagesParameters {
  'upToTimeNanos' : [] | [Nanos],
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
}
export interface GetLogMessagesFilter {
  'analyzeCount' : number,
  'messageRegex' : [] | [string],
  'messageContains' : [] | [string],
}
export interface GetLogMessagesParameters {
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
  'fromTimeNanos' : [] | [Nanos],
}
export interface GetMetricsParameters {
  'dateToMillis' : bigint,
  'granularity' : MetricsGranularity,
  'dateFromMillis' : bigint,
}
export type GetTableMetadataOutputType = [] | [
  {
    'metadata' : TableMetadataOutputType,
    'databaseName' : string,
    'tableName' : string,
  }
];
export type HeaderField = [string, string];
export interface HourlyMetricsData {
  'updateCalls' : UpdateCallsAggregatedData,
  'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
  'canisterCycles' : CanisterCyclesAggregatedData,
  'canisterMemorySize' : CanisterMemoryAggregatedData,
  'timeMillis' : bigint,
}
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'certificate_version' : [] | [number],
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type IndexName = string;
export interface ItemOutputType {
  'id' : string,
  'item' : Array<[string, AttributeDataValue]>,
}
export interface LogMessagesData { 'timeNanos' : Nanos, 'message' : string }
export type MetricsGranularity = { 'hourly' : null } |
  { 'daily' : null };
export interface MetricsRequest { 'parameters' : GetMetricsParameters }
export interface MetricsResponse { 'metrics' : [] | [CanisterMetrics] }
export type Nanos = bigint;
export interface NumericEntity {
  'avg' : bigint,
  'max' : bigint,
  'min' : bigint,
  'first' : bigint,
  'last' : bigint,
}
export interface PaginatedEventWithUserDataPayload {
  'hasMore' : boolean,
  'items' : Array<EventWithUserDataPayload>,
  'totalRecords' : bigint,
  'nextCursor' : [] | [PaginatedScanCursor],
}
export interface PaginatedProposalsResponse {
  'hasMore' : boolean,
  'items' : Array<ProposalResponsePayload>,
  'totalRecords' : bigint,
  'nextCursor' : [] | [PaginatedScanCursor],
}
export interface PaginatedScanCursor { 'plan' : QueryPlan, 'lastId' : string }
export type ParticipationType = { 'PersonToMultiplePersons' : null } |
  { 'PersonToPerson' : null };
export interface ProposalResponsePayload {
  'proposalMetadata' : [] | [Array<[string, StringAttributeDataValue]>],
  'eventData' : EventWithUserDataPayload,
}
export type QueryFilter = { 'OR' : Array<QueryFilter> } |
  { 'AND' : Array<QueryFilter> } |
  { 'expression' : FilterExpressionType };
export type QueryPlan = {
    'IndexScan' : {
      'indexName' : string,
      'scanBounds' : { 'lower' : string, 'upper' : string },
      'remainingFilter' : QueryFilter,
    }
  } |
  { 'FullTableScan' : { 'filter' : QueryFilter } };
export type RecordingVisibility = { 'Private' : null } |
  { 'Public' : null };
export type RelationalExpressionAttributeDataValue = { 'int' : bigint } |
  { 'nat' : bigint } |
  { 'float' : number } |
  { 'principal' : Principal } |
  { 'blob' : Uint8Array | number[] } |
  { 'bool' : boolean } |
  { 'char' : number } |
  { 'int8' : number } |
  { 'nat8' : number } |
  { 'text' : string } |
  { 'nat16' : number } |
  { 'nat32' : number } |
  { 'nat64' : bigint } |
  { 'int16' : number } |
  { 'int32' : number } |
  { 'int64' : bigint };
export type Result = { 'ok' : EventWithUserDataPayload } |
  { 'err' : string };
export type Result_1 = { 'ok' : string } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<EventWithUserDataPayload> } |
  { 'err' : Array<string> };
export type Result_3 = { 'ok' : PaginatedEventWithUserDataPayload } |
  { 'err' : Array<string> };
export type Result_4 = { 'ok' : PaginatedProposalsResponse } |
  { 'err' : Array<string> };
export type Result_5 = {
    'ok' : {
      'items' : Array<EventWithUserDataPayload>,
      'totalRecords' : bigint,
    }
  } |
  { 'err' : Array<string> };
export type Result_6 = { 'ok' : Array<EventResponsePayload> } |
  { 'err' : Array<string> };
export type Result_7 = { 'ok' : Array<UserResponsePayload> } |
  { 'err' : Array<string> };
export type Result_8 = { 'ok' : Array<EventAttendeeResponsePayload> } |
  { 'err' : Array<string> };
export type Result_9 = { 'ok' : Array<string> } |
  { 'err' : string };
export interface StatusRequest {
  'memory_size' : boolean,
  'cycles' : boolean,
  'heap_memory_size' : boolean,
}
export interface StatusResponse {
  'memory_size' : [] | [bigint],
  'cycles' : [] | [bigint],
  'heap_memory_size' : [] | [bigint],
}
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken],
  StreamingCallbackHttpResponse
>;
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'file_size' : bigint,
  'index' : bigint,
  'chunk_size' : bigint,
  'file_id' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export type StringAttributeDataValue = { 'char' : number } |
  { 'text' : string };
export interface TableIndexMetadata {
  'name' : IndexName,
  'unique' : boolean,
  'attributeNames' : Array<AttributeName>,
}
export interface TableMetadataOutputType {
  'attributes' : Array<AttributeMetadata>,
  'indexes' : Array<TableIndexMetadata>,
}
export type Token = { 'ICP' : null } |
  { 'FREE' : null } |
  { 'CKBTC' : null };
export type UpdateCallsAggregatedData = BigUint64Array | bigint[];
export interface UpdateInformationRequest {
  'metrics' : [] | [CollectMetricsRequestType],
}
export interface UpdateMultipleEventsPayload {
  'eventId' : string,
  'payload' : EventRequestPayload,
}
export interface UpdateMultipleEventsResponse {
  'successful' : Array<string>,
  'failed' : Array<[string, string]>,
}
export interface UserResponsePayload {
  'bio' : string,
  'categories' : Array<string>,
  'timezone' : string,
  'firstname' : string,
  'country' : string,
  'username' : string,
  'introduction_video_link' : string,
  'canister_id' : string,
  'email' : string,
  'principal_id' : string,
  'profilepic' : string,
  'coverphoto' : string,
  'lastname' : string,
}
export interface WithdrawAttendeeRequestPayload {
  'invitee_user_id' : Principal,
  'action' : EventAttendeeActions,
  'event_status' : string,
  'timestamp' : bigint,
  'event_id' : string,
  'event_type' : string,
}
export interface _SERVICE {
  'acceptApplication' : ActorMethod<[string, Principal], Result_1>,
  'addEventAttendee' : ActorMethod<[EventAttendeeRequestPayload], Result_1>,
  'cancelEvent' : ActorMethod<[Principal, string, string], Result_9>,
  'checkIfAttendeeOrAcceptedUserExistsForEvent' : ActorMethod<
    [Principal, string],
    boolean
  >,
  'createEvent' : ActorMethod<[string, EventRequestPayload], string>,
  'declineApplication' : ActorMethod<[string, Principal], Result_1>,
  'fetchUserData' : ActorMethod<[string, string], UserResponsePayload>,
  'generateSchema' : ActorMethod<[], string>,
  'getAllAttendeesIds' : ActorMethod<[string], Result_8>,
  'getAppliedUsersWithData' : ActorMethod<[string], Result_7>,
  'getAttendeeStatusForEvent' : ActorMethod<[Principal, string], string>,
  'getAttendeesByActionWithUserDetails' : ActorMethod<
    [string, EventAttendeeActions],
    Result_7
  >,
  'getAttendeesByActionWithUserDetailsAsync' : ActorMethod<
    [string, EventAttendeeActions],
    Result_7
  >,
  'getCanistergeekInformation' : ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >,
  'getCompletedEventsForCron' : ActorMethod<[bigint, bigint], Result_2>,
  'getEventArrayFromEventIdArray' : ActorMethod<
    [Array<string>],
    EventWithUserDataTupleArray
  >,
  'getEventDetailsWithUserData' : ActorMethod<
    [string],
    EventWithUserDataPayload
  >,
  'getEventDetailsWithUserDataAsync' : ActorMethod<
    [string],
    EventWithUserDataPayload
  >,
  'getEventTableMetadata' : ActorMethod<[], GetTableMetadataOutputType>,
  'getEventsForAttendeeWithEventData' : ActorMethod<[string], Result_6>,
  'getEventsWithUserData' : ActorMethod<
    [Array<ItemOutputType>],
    Array<EventWithUserDataPayload>
  >,
  'getFile' : ActorMethod<[string], GetFileOutputType>,
  'getFilteredEvents' : ActorMethod<
    [
      {
        'categories' : [] | [Array<string>],
        'status' : [] | [string],
        'recordingType' : [] | [Array<boolean>],
        'userId' : [] | [Principal],
        'offset' : bigint,
        'limit' : bigint,
        'currentTimestamp' : bigint,
        'isFuture' : boolean,
        'eventType' : [] | [string],
      },
    ],
    Result_5
  >,
  'getMyPaginatedProposals' : ActorMethod<
    [Principal, bigint, [] | [PaginatedScanCursor]],
    Result_4
  >,
  'getMyProposals' : ActorMethod<[Principal], Result_2>,
  'getPaginatedEventsForAttendee' : ActorMethod<
    [string, bigint, [] | [PaginatedScanCursor]],
    Result_3
  >,
  'getPaginatedFilteredEvents' : ActorMethod<
    [
      {
        'categories' : [] | [Array<string>],
        'status' : [] | [string],
        'recordingType' : [] | [Array<boolean>],
        'cursor' : [] | [PaginatedScanCursor],
        'userId' : [] | [Principal],
        'limit' : bigint,
        'currentTimestamp' : bigint,
        'isFuture' : boolean,
        'eventType' : [] | [string],
      },
    ],
    Result_3
  >,
  'getServiceRequestsForUser' : ActorMethod<[Principal], Result_2>,
  'get_trusted_origins' : ActorMethod<[], Array<string>>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse
  >,
  'icrc28_trusted_origins' : ActorMethod<
    [],
    { 'trusted_origins' : Array<string> }
  >,
  'isWhiteListUser' : ActorMethod<[string], boolean>,
  'updateCanistergeekInformation' : ActorMethod<
    [UpdateInformationRequest],
    undefined
  >,
  'updateEvent' : ActorMethod<[string, string, EventRequestPayload], Result_1>,
  'updateEventAttendeeStatus' : ActorMethod<
    [string, Principal, EventAttendeeActions, EventAttendeeActions],
    Result_1
  >,
  'updateMultipleEvents' : ActorMethod<
    [string, Array<UpdateMultipleEventsPayload>],
    UpdateMultipleEventsResponse
  >,
  'withdrawEventAttendee' : ActorMethod<
    [WithdrawAttendeeRequestPayload],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];