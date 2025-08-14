import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface CanisterMapPayload {
  'canister_id' : string,
  'principal_id' : string,
}
export type CanisterMemoryAggregatedData = BigUint64Array | bigint[];
export interface CanisterMetrics { 'data' : CanisterMetricsData }
export type CanisterMetricsData = { 'hourly' : Array<HourlyMetricsData> } |
  { 'daily' : Array<DailyMetricsData> };
export type CollectMetricsRequestType = { 'force' : null } |
  { 'normal' : null };
export interface DailyMetricsData {
  'updateCalls' : bigint,
  'canisterHeapMemorySize' : NumericEntity,
  'canisterCycles' : NumericEntity,
  'canisterMemorySize' : NumericEntity,
  'timeMillis' : bigint,
}
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
export interface HourlyMetricsData {
  'updateCalls' : UpdateCallsAggregatedData,
  'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
  'canisterCycles' : CanisterCyclesAggregatedData,
  'canisterMemorySize' : CanisterMemoryAggregatedData,
  'timeMillis' : bigint,
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
export interface RegistrationCheckError {
  'canister_id' : [] | [Principal],
  'subaccount_ledger_identifier' : [] | [string],
  'message' : string,
  'subaccount_id_hex' : [] | [string],
}
export type RegistrationCheckResult = { 'ok' : RegistrationCheckSuccess } |
  { 'err' : RegistrationCheckError };
export interface RegistrationCheckSuccess {
  'canister_id' : Principal,
  'subaccount_ledger_identifier' : [] | [string],
  'message' : string,
  'subaccount_id_hex' : [] | [string],
}
export type Result = { 'ok' : string } |
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
export interface SubaccountMapPayload {
  'subaccount_ledger_identifier' : string,
  'subaccount_id_hex' : string,
  'subaccount_index' : bigint,
  'principal_id' : Principal,
}
export interface TransactionResponsePayload {
  'fee' : bigint,
  'block_index' : bigint,
  'memo' : [] | [Uint8Array | number[]],
  'source_account_id_hex' : string,
  'narration' : string,
  'subaccount_index' : bigint,
  'principal_id' : Principal,
  'created_at_time' : bigint,
  'destination_account_id_hex' : string,
  'amount' : bigint,
}
export type UpdateCallsAggregatedData = BigUint64Array | bigint[];
export interface UpdateInformationRequest {
  'metrics' : [] | [CollectMetricsRequestType],
}
export interface UpdateUserRequestPayload {
  'username' : string,
  'canister_id' : string,
  'principal_id' : string,
}
export interface UserAccountInfoPayload {
  'canister_id' : string,
  'subaccount_ledger_identifier' : string,
  'subaccount_id_hex' : string,
}
export interface UserMapPayload {
  'username' : string,
  'canister_id' : Principal,
  'principal_id' : Principal,
}
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
export interface _SERVICE {
  'findUser' : ActorMethod<[string], [] | [UserMapPayload]>,
  'generateSchema' : ActorMethod<[], string>,
  'getCanistergeekInformation' : ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >,
  'getListOfCanister' : ActorMethod<[], Array<CanisterMapPayload>>,
  'getListOfUserSubaccounts' : ActorMethod<[], Array<SubaccountMapPayload>>,
  'getListOfUsers' : ActorMethod<[], Array<UserMapPayload>>,
  'getListofTransactions' : ActorMethod<[], Array<TransactionResponsePayload>>,
  'getUserAccountInfo' : ActorMethod<[], UserAccountInfoPayload>,
  'getUserByUsername' : ActorMethod<[string], [] | [UserPayload]>,
  'getUserCanister' : ActorMethod<[], string>,
  'getUserCanisterByUserPrincipal' : ActorMethod<[string], string>,
  'getUserCanistersByPrincipal' : ActorMethod<
    [Array<string>],
    Array<CanisterMapPayload>
  >,
  'get_trusted_origins' : ActorMethod<[], Array<string>>,
  'icrc28_trusted_origins' : ActorMethod<
    [],
    { 'trusted_origins' : Array<string> }
  >,
  'isUserRegistered' : ActorMethod<[Principal], RegistrationCheckResult>,
  'reinstallUserCanisters' : ActorMethod<[], string>,
  'signUp' : ActorMethod<[string], Result>,
  'updateCanistergeekInformation' : ActorMethod<
    [UpdateInformationRequest],
    undefined
  >,
  'updateUserRecord' : ActorMethod<[string, UpdateUserRequestPayload], string>,
  'upgradeUserCanisters' : ActorMethod<[], string>,
  'userExistsOrNot' : ActorMethod<[], boolean>,
  'usernameExistsOrNot' : ActorMethod<[string], [] | [UserMapPayload]>,
  'verifyPayment' : ActorMethod<[], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];