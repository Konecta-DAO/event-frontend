import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AddAttributeInputType {
  'databaseName' : string,
  'tableName' : string,
  'attribute' : AttributeMetadata,
}
export type AddAttributeOutputType = {
    'ok' : {
      'databaseName' : string,
      'attributeNames' : string,
      'tableName' : string,
    }
  } |
  { 'err' : Array<string> };
export interface AttendeeEventMetadataRequestPayload {
  'status' : EventStatus,
  'calendar_id' : [] | [string],
  'name' : [] | [string],
  'end_date' : [] | [bigint],
  'created_by' : [] | [Principal],
  'start_date' : [] | [bigint],
  'event_id' : string,
}
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
export interface BatchGetItemByIdInputType {
  'ids' : Array<string>,
  'databaseName' : string,
  'tableName' : string,
}
export type BatchGetItemByIdOutputType = {
    'ok' : { 'notFoundIds' : Array<string>, 'items' : Array<ItemOutputType> }
  } |
  { 'err' : Array<string> };
export interface CalendarRequestPayload {
  'name' : string,
  'description' : string,
}
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
export interface CanisterStatus {
  'status' : { 'stopped' : null } |
    { 'stopping' : null } |
    { 'running' : null },
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : {
    'freezing_threshold' : bigint,
    'controllers' : Array<Principal>,
    'memory_allocation' : bigint,
    'compute_allocation' : bigint,
  },
  'idle_cycles_burned_per_day' : bigint,
  'module_hash' : [] | [Uint8Array | number[]],
}
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
export interface CreateDatabaseInputType { 'name' : string }
export type CreateDatabaseOutputType = { 'ok' : {} } |
  { 'err' : Array<string> };
export interface CreateEventMetadataPayload {
  'categories' : Array<string>,
  'status' : EventStatus,
  'interests' : Array<string>,
  'calendar_id' : string,
  'name' : string,
  'end_date' : bigint,
  'created_by' : Principal,
  'start_date' : bigint,
  'event_id' : string,
}
export interface CreateIndexInputType {
  'databaseName' : string,
  'tableName' : string,
  'index' : TableIndexMetadata,
}
export type CreateIndexOutputType = {
    'ok' : {
      'indexName' : string,
      'databaseName' : string,
      'tableName' : string,
    }
  } |
  { 'err' : Array<string> };
export interface CreateItemInputType {
  'databaseName' : string,
  'attributeDataValues' : Array<[string, AttributeDataValue]>,
  'tableName' : string,
}
export type CreateItemOutputType = {
    'ok' : { 'id' : string, 'item' : Array<[string, AttributeDataValue]> }
  } |
  { 'err' : Array<string> };
export interface CreateTableInputType {
  'name' : string,
  'databaseName' : string,
  'attributes' : Array<AttributeMetadata>,
  'indexes' : Array<TableIndexMetadata>,
}
export type CreateTableOutputType = { 'ok' : {} } |
  { 'err' : Array<string> };
export interface DailyMetricsData {
  'updateCalls' : bigint,
  'canisterHeapMemorySize' : NumericEntity,
  'canisterCycles' : NumericEntity,
  'canisterMemorySize' : NumericEntity,
  'timeMillis' : bigint,
}
export interface DeleteDatabaseInputType { 'name' : string }
export type DeleteDatabaseOutputType = { 'ok' : {} } |
  { 'err' : Array<string> };
export interface DeleteItemInputType {
  'id' : string,
  'databaseName' : string,
  'tableName' : string,
}
export type DeleteItemOutputType = { 'ok' : {} } |
  { 'err' : Array<string> };
export interface DeleteTableInputType {
  'databaseName' : string,
  'tableName' : string,
}
export type DeleteTableOutputType = { 'ok' : {} } |
  { 'err' : Array<string> };
export interface DropAttributeInputType {
  'attributeName' : string,
  'databaseName' : string,
  'tableName' : string,
}
export type DropAttributeOutputType = {
    'ok' : {
      'databaseName' : string,
      'attributeNames' : string,
      'tableName' : string,
    }
  } |
  { 'err' : Array<string> };
export interface EventMetadataResponsePayload {
  'categories' : Array<string>,
  'status' : string,
  'interests' : Array<string>,
  'calendar_id' : string,
  'name' : string,
  'end_date' : bigint,
  'created_by' : string,
  'start_date' : bigint,
  'event_id' : string,
  'event_metadata_id' : string,
}
export type EventStatus = { 'Draft' : null } |
  { 'Created' : null } |
  { 'Canceled' : null };
export interface EventUserResponsePayload {
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
export type GetDatabasesInputType = {};
export interface GetDatabasesOutputType {
  'databases' : Array<{ 'name' : string, 'tables' : Array<string> }>,
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
export interface GetItemByIdInputType {
  'id' : string,
  'databaseName' : string,
  'tableName' : string,
}
export type GetItemByIdOutputType = { 'ok' : ItemOutputType } |
  { 'err' : Array<string> };
export interface GetItemCountInputType {
  'databaseName' : string,
  'tableName' : string,
}
export type GetItemCountOutputType = { 'ok' : { 'count' : bigint } } |
  { 'err' : Array<string> };
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
export interface GetTableMetadataInputType {
  'databaseName' : string,
  'tableName' : string,
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
export interface PaginatedScanCursor { 'plan' : QueryPlan, 'lastId' : string }
export interface PaginatedScanInputType {
  'cursor' : [] | [PaginatedScanCursor],
  'limit' : bigint,
  'filter' : QueryFilter,
  'databaseName' : string,
  'tableName' : string,
}
export type PaginatedScanOutputType = {
    'ok' : {
      'hasMore' : boolean,
      'limit' : bigint,
      'items' : Array<ItemOutputType>,
      'nextCursor' : [] | [PaginatedScanCursor],
    }
  } |
  { 'err' : Array<string> };
export type QueryFilter = { 'OR' : Array<QueryFilter> } |
  { 'AND' : Array<QueryFilter> } |
  { 'expression' : FilterExpressionType };
export type QueryOpsInputType = {
    'PaginatedScanInput' : PaginatedScanInputType
  } |
  { 'GetDatabasesInput' : GetDatabasesInputType } |
  { 'GetItemByIdInput' : GetItemByIdInputType } |
  { 'GetTableMetadataInput' : GetTableMetadataInputType } |
  { 'ScanAndGetIdsInput' : ScanAndGetIdsInputType } |
  { 'BatchGetItemByIdInput' : BatchGetItemByIdInputType } |
  { 'ScanInput' : ScanInputType } |
  { 'GetItemCountInput' : GetItemCountInputType };
export type QueryOpsOutputType = {
    'GetTableMetadataOutput' : GetTableMetadataOutputType
  } |
  { 'PaginatedScanOutput' : PaginatedScanOutputType } |
  { 'ScanAndGetIdsOutput' : ScanAndGetIdsOutputType } |
  { 'GetDatabasesOutput' : GetDatabasesOutputType } |
  { 'GetItemCountOutput' : GetItemCountOutputType } |
  { 'GetItemByIdOutput' : GetItemByIdOutputType } |
  { 'BatchGetItemByIdOutput' : BatchGetItemByIdOutputType } |
  { 'ScanOutput' : ScanOutputType };
export type QueryPlan = {
    'IndexScan' : {
      'indexName' : string,
      'scanBounds' : { 'lower' : string, 'upper' : string },
      'remainingFilter' : QueryFilter,
    }
  } |
  { 'FullTableScan' : { 'filter' : QueryFilter } };
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
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : EventMetadataResponsePayload } |
  { 'err' : Array<string> };
export type Result_2 = { 'ok' : Array<EventMetadataResponsePayload> } |
  { 'err' : Array<string> };
export interface ScanAndGetIdsInputType {
  'filter' : QueryFilter,
  'databaseName' : string,
  'tableName' : string,
}
export type ScanAndGetIdsOutputType = { 'ok' : { 'ids' : Array<string> } } |
  { 'err' : Array<string> };
export interface ScanInputType {
  'filter' : QueryFilter,
  'databaseName' : string,
  'tableName' : string,
}
export type ScanOutputType = {
    'ok' : Array<
      { 'id' : string, 'item' : Array<[string, AttributeDataValue]> }
    >
  } |
  { 'err' : Array<string> };
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
export interface StoreFileInputType {
  'fileName' : string,
  'fileType' : string,
  'fileDataObject' : Uint8Array | number[],
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
export type UpdateCallsAggregatedData = BigUint64Array | bigint[];
export interface UpdateEventMetadataPayload {
  'status' : EventStatus,
  'calendar_id' : [] | [string],
  'name' : [] | [string],
  'end_date' : [] | [bigint],
  'created_by' : [] | [Principal],
  'start_date' : [] | [bigint],
  'event_id' : string,
}
export interface UpdateInformationRequest {
  'metrics' : [] | [CollectMetricsRequestType],
}
export interface UpdateItemInputType {
  'id' : string,
  'databaseName' : string,
  'attributeDataValues' : Array<[string, AttributeDataValue]>,
  'tableName' : string,
}
export type UpdateItemOutputType = {
    'ok' : { 'id' : string, 'item' : Array<[string, AttributeDataValue]> }
  } |
  { 'err' : Array<string> };
export type UpdateOpsInputType = { 'DeleteTableInput' : DeleteTableInputType } |
  { 'DeleteDatabaseInput' : DeleteDatabaseInputType } |
  { 'DropAttributeInput' : DropAttributeInputType } |
  { 'DeleteItemInput' : DeleteItemInputType } |
  { 'UpdateItemInput' : UpdateItemInputType } |
  { 'CreateDatabaseInput' : CreateDatabaseInputType } |
  { 'CreateTableInput' : CreateTableInputType } |
  { 'CreateItemInput' : CreateItemInputType } |
  { 'AddAttributeInput' : AddAttributeInputType } |
  { 'CreateIndexInput' : CreateIndexInputType };
export type UpdateOpsOutputType = {
    'AddAttributeOutput' : AddAttributeOutputType
  } |
  { 'CreateIndexOutput' : CreateIndexOutputType } |
  { 'DeleteTableOutput' : DeleteTableOutputType } |
  { 'CreateItemOutput' : CreateItemOutputType } |
  { 'DeleteDatabaseOutput' : DeleteDatabaseOutputType } |
  { 'UpdateItemOutput' : UpdateItemOutputType } |
  { 'CreateDatabaseOutput' : CreateDatabaseOutputType } |
  { 'CreateTableOutput' : CreateTableOutputType } |
  { 'DropAttributeOutput' : DropAttributeOutputType } |
  { 'DeleteItemOutput' : DeleteItemOutputType };
export interface UserPayload {
  'bio' : string,
  'categories' : Array<string>,
  'timezone' : string,
  'firstname' : string,
  'country' : string,
  'username' : string,
  'introduction_video_link' : string,
  'canister_id' : Principal,
  'email' : string,
  'principal_id' : Principal,
  'profilepic' : string,
  'coverphoto' : string,
  'lastname' : string,
}
export interface UserRequestPayload {
  'bio' : [] | [string],
  'categories' : [] | [Array<string>],
  'timezone' : string,
  'firstname' : string,
  'country' : string,
  'username' : string,
  'introduction_video_link' : [] | [string],
  'email' : string,
  'principal_id' : [] | [string],
  'profilepic' : [] | [string],
  'coverphoto' : [] | [string],
  'lastname' : string,
}
export interface _SERVICE {
  'approveCycleWithdrawal' : ActorMethod<[bigint], undefined>,
  'createEventMetaData' : ActorMethod<[CreateEventMetadataPayload], Result>,
  'fetchCanisterStatus' : ActorMethod<[[] | [Principal]], CanisterStatus>,
  'generateSchema' : ActorMethod<[], string>,
  'getAllEventsMetadata' : ActorMethod<[], Result_2>,
  'getCalendarId' : ActorMethod<[], string>,
  'getCanistergeekInformation' : ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >,
  'getEventMetaDataFromStartToEndDate' : ActorMethod<
    [bigint, bigint, Array<string>],
    Result_2
  >,
  'getEventMetadataById' : ActorMethod<[string], Result_1>,
  'getEventMetadataId' : ActorMethod<[string, string], string>,
  'getFile' : ActorMethod<[string], GetFileOutputType>,
  'getUser' : ActorMethod<[], [] | [UserPayload]>,
  'getUserForEventCanister' : ActorMethod<[string], EventUserResponsePayload>,
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
  'queryOperation' : ActorMethod<
    [{ 'queryOpsInput' : QueryOpsInputType }],
    QueryOpsOutputType
  >,
  'removeCalendarEvent' : ActorMethod<[string], Result>,
  'saveFile' : ActorMethod<[StoreFileInputType], string>,
  'updateCanistergeekInformation' : ActorMethod<
    [UpdateInformationRequest],
    undefined
  >,
  'updateEventMetaData' : ActorMethod<
    [string, UpdateEventMetadataPayload],
    Result
  >,
  'updateEventMetadataForAttendee' : ActorMethod<
    [
      {
        'eventId' : string,
        'eventMetadataPayload' : AttendeeEventMetadataRequestPayload,
      },
    ],
    Result
  >,
  'updateOperation' : ActorMethod<
    [{ 'updateOpsInput' : UpdateOpsInputType }],
    UpdateOpsOutputType
  >,
  'upsertCalendarData' : ActorMethod<[string, CalendarRequestPayload], string>,
  'upsertUser' : ActorMethod<[UserRequestPayload], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];