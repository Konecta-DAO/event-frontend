/* eslint-disable @typescript-eslint/naming-convention */
export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text })
  const UserMapPayload = IDL.Record({
    username: IDL.Text,
    canister_id: IDL.Principal,
    principal_id: IDL.Principal,
  })
  const StatusRequest = IDL.Record({
    memory_size: IDL.Bool,
    cycles: IDL.Bool,
    heap_memory_size: IDL.Bool,
  })
  const MetricsGranularity = IDL.Variant({
    hourly: IDL.Null,
    daily: IDL.Null,
  })
  const GetMetricsParameters = IDL.Record({
    dateToMillis: IDL.Nat,
    granularity: MetricsGranularity,
    dateFromMillis: IDL.Nat,
  })
  const MetricsRequest = IDL.Record({ parameters: GetMetricsParameters })
  const GetLogMessagesFilter = IDL.Record({
    analyzeCount: IDL.Nat32,
    messageRegex: IDL.Opt(IDL.Text),
    messageContains: IDL.Opt(IDL.Text),
  })
  const Nanos = IDL.Nat64
  const GetLogMessagesParameters = IDL.Record({
    count: IDL.Nat32,
    filter: IDL.Opt(GetLogMessagesFilter),
    fromTimeNanos: IDL.Opt(Nanos),
  })
  const GetLatestLogMessagesParameters = IDL.Record({
    upToTimeNanos: IDL.Opt(Nanos),
    count: IDL.Nat32,
    filter: IDL.Opt(GetLogMessagesFilter),
  })
  const CanisterLogRequest = IDL.Variant({
    getMessagesInfo: IDL.Null,
    getMessages: GetLogMessagesParameters,
    getLatestMessages: GetLatestLogMessagesParameters,
  })
  const GetInformationRequest = IDL.Record({
    status: IDL.Opt(StatusRequest),
    metrics: IDL.Opt(MetricsRequest),
    logs: IDL.Opt(CanisterLogRequest),
    version: IDL.Bool,
  })
  const StatusResponse = IDL.Record({
    memory_size: IDL.Opt(IDL.Nat64),
    cycles: IDL.Opt(IDL.Nat64),
    heap_memory_size: IDL.Opt(IDL.Nat64),
  })
  const UpdateCallsAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterHeapMemoryAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterCyclesAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterMemoryAggregatedData = IDL.Vec(IDL.Nat64)
  const HourlyMetricsData = IDL.Record({
    updateCalls: UpdateCallsAggregatedData,
    canisterHeapMemorySize: CanisterHeapMemoryAggregatedData,
    canisterCycles: CanisterCyclesAggregatedData,
    canisterMemorySize: CanisterMemoryAggregatedData,
    timeMillis: IDL.Int,
  })
  const NumericEntity = IDL.Record({
    avg: IDL.Nat64,
    max: IDL.Nat64,
    min: IDL.Nat64,
    first: IDL.Nat64,
    last: IDL.Nat64,
  })
  const DailyMetricsData = IDL.Record({
    updateCalls: IDL.Nat64,
    canisterHeapMemorySize: NumericEntity,
    canisterCycles: NumericEntity,
    canisterMemorySize: NumericEntity,
    timeMillis: IDL.Int,
  })
  const CanisterMetricsData = IDL.Variant({
    hourly: IDL.Vec(HourlyMetricsData),
    daily: IDL.Vec(DailyMetricsData),
  })
  const CanisterMetrics = IDL.Record({ data: CanisterMetricsData })
  const MetricsResponse = IDL.Record({ metrics: IDL.Opt(CanisterMetrics) })
  const CanisterLogFeature = IDL.Variant({
    filterMessageByContains: IDL.Null,
    filterMessageByRegex: IDL.Null,
  })
  const CanisterLogMessagesInfo = IDL.Record({
    features: IDL.Vec(IDL.Opt(CanisterLogFeature)),
    lastTimeNanos: IDL.Opt(Nanos),
    count: IDL.Nat32,
    firstTimeNanos: IDL.Opt(Nanos),
  })
  const LogMessagesData = IDL.Record({
    timeNanos: Nanos,
    message: IDL.Text,
  })
  const CanisterLogMessages = IDL.Record({
    data: IDL.Vec(LogMessagesData),
    lastAnalyzedMessageTimeNanos: IDL.Opt(Nanos),
  })
  const CanisterLogResponse = IDL.Variant({
    messagesInfo: CanisterLogMessagesInfo,
    messages: CanisterLogMessages,
  })
  const GetInformationResponse = IDL.Record({
    status: IDL.Opt(StatusResponse),
    metrics: IDL.Opt(MetricsResponse),
    logs: IDL.Opt(CanisterLogResponse),
    version: IDL.Opt(IDL.Nat),
  })
  const CanisterMapPayload = IDL.Record({
    canister_id: IDL.Text,
    principal_id: IDL.Text,
  })
  const SubaccountMapPayload = IDL.Record({
    subaccount_ledger_identifier: IDL.Text,
    subaccount_id_hex: IDL.Text,
    subaccount_index: IDL.Nat,
    principal_id: IDL.Principal,
  })
  const UserPayload = IDL.Record({
    id: IDL.Text,
    bio: IDL.Text,
    categories: IDL.Vec(IDL.Text),
    timezone: IDL.Text,
    firstname: IDL.Text,
    country: IDL.Text,
    username: IDL.Text,
    introduction_video_link: IDL.Text,
    canister_id: IDL.Principal,
    email: IDL.Text,
    principal_id: IDL.Principal,
    profilepic: IDL.Text,
    coverphoto: IDL.Text,
    lastname: IDL.Text,
  })
  const UserDataMapPayload = IDL.Record({
    userData: UserPayload,
    username: IDL.Text,
    canister_id: IDL.Principal,
    principal_id: IDL.Principal,
  })
  const UserAccountInfoPayload = IDL.Record({
    canister_id: IDL.Text,
    subaccount_ledger_identifier: IDL.Text,
    subaccount_id_hex: IDL.Text,
  })
  const CollectMetricsRequestType = IDL.Variant({
    force: IDL.Null,
    normal: IDL.Null,
  })
  const UpdateInformationRequest = IDL.Record({
    metrics: IDL.Opt(CollectMetricsRequestType),
  })
  const UpdateUserRequestPayload = IDL.Record({
    username: IDL.Text,
    canister_id: IDL.Text,
    principal_id: IDL.Text,
  })
  return IDL.Service({
    bulkInsertUsers: IDL.Func([], [Result], []),
    findUser: IDL.Func([IDL.Text], [IDL.Opt(UserMapPayload)], ['query']),
    getCanistergeekInformation: IDL.Func(
      [GetInformationRequest],
      [GetInformationResponse],
      ['query'],
    ),
    getListOfCanister: IDL.Func([], [IDL.Vec(CanisterMapPayload)], ['query']),
    getListOfUserSubaccounts: IDL.Func(
      [],
      [IDL.Vec(SubaccountMapPayload)],
      ['query'],
    ),
    getListOfUsers: IDL.Func([], [IDL.Vec(UserMapPayload)], ['query']),
    getListOfUsersWithData: IDL.Func(
      [],
      [IDL.Vec(UserDataMapPayload)],
      ['composite_query'],
    ),
    getUserAccountInfo: IDL.Func([], [UserAccountInfoPayload], []),
    getUserByPrincipal: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserPayload)],
      ['composite_query'],
    ),
    getUserByUsername: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserPayload)],
      ['composite_query'],
    ),
    getUserCanister: IDL.Func([], [IDL.Text], ['query']),
    getUserCanisterByUserPrincipal: IDL.Func([IDL.Text], [IDL.Text], ['query']),
    getUserCanistersByPrincipal: IDL.Func(
      [IDL.Vec(IDL.Text)],
      [IDL.Vec(CanisterMapPayload)],
      ['query'],
    ),
    get_trusted_origins: IDL.Func([], [IDL.Vec(IDL.Text)], []),
    icrc28_trusted_origins: IDL.Func(
      [],
      [IDL.Record({ trusted_origins: IDL.Vec(IDL.Text) })],
      ['query'],
    ),
    reinstallUserCanisters: IDL.Func([], [IDL.Text], []),
    removeAnonymousPrincipalEntryFromUserCanisterMap: IDL.Func(
      [],
      [IDL.Text],
      [],
    ),
    signUp: IDL.Func([IDL.Text], [IDL.Text], []),
    updateCanistergeekInformation: IDL.Func([UpdateInformationRequest], [], []),
    updateUserRecord: IDL.Func(
      [IDL.Text, UpdateUserRequestPayload],
      [IDL.Text],
      [],
    ),
    updateUserSubAccountIndexes: IDL.Func([], [IDL.Nat], []),
    upgradeUserCanisters: IDL.Func([], [IDL.Text], []),
    userExistsOrNot: IDL.Func([], [IDL.Bool], ['query']),
    usernameExistsOrNot: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserMapPayload)],
      ['query'],
    ),
    verifyPayment: IDL.Func([], [IDL.Bool], []),
    verifyPaymentTest: IDL.Func([IDL.Text], [IDL.Bool], []),
  })
}
export const init = ({ IDL }) => {
  return []
}
