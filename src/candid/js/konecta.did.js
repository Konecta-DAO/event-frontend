/* eslint-disable @typescript-eslint/naming-convention */

export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text })
  const ApplyToServiceRequestPayload = IDL.Record({
    note: IDL.Text,
    event_id: IDL.Text,
    location: IDL.Text,
  })
  const RelationalExpressionAttributeDataValue__1 = IDL.Variant({
    int: IDL.Int,
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  })
  const EventType = IDL.Variant({ Request: IDL.Null, Offer: IDL.Null })
  const CheckEventExistsPayload = IDL.Record({
    end_date: IDL.Nat,
    start_date: IDL.Nat,
    event_type: EventType,
  })
  const Result_29 = IDL.Variant({ ok: IDL.Bool, err: IDL.Vec(IDL.Text) })
  const Result_28 = IDL.Variant({ ok: IDL.Bool, err: IDL.Text })
  const EventStatus = IDL.Variant({
    Draft: IDL.Null,
    Created: IDL.Null,
    Canceled: IDL.Null,
  })
  const Token = IDL.Variant({
    ICP: IDL.Null,
    FREE: IDL.Null,
    CKBTC: IDL.Null,
  })
  const RecordingVisibility = IDL.Variant({
    Private: IDL.Null,
    Public: IDL.Null,
  })
  const ParticipationType = IDL.Variant({
    PersonToMultiplePersons: IDL.Null,
    PersonToPerson: IDL.Null,
  })
  const EventRequestPayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    status: EventStatus,
    token_amount: IDL.Opt(IDL.Float64),
    price_token: IDL.Opt(Token),
    interests: IDL.Opt(IDL.Vec(IDL.Text)),
    metadata: IDL.Opt(
      IDL.Vec(
        IDL.Tuple(
          IDL.Text,
          IDL.Variant({
            int: IDL.Int,
            nat: IDL.Nat,
            float: IDL.Float64,
            char: IDL.Nat32,
            int8: IDL.Int8,
            list: IDL.Vec(
              IDL.Variant({
                int: IDL.Int,
                nat: IDL.Nat,
                float: IDL.Float64,
                char: IDL.Nat32,
                int8: IDL.Int8,
                nat8: IDL.Nat8,
                text: IDL.Text,
                nat16: IDL.Nat16,
                nat32: IDL.Nat32,
                nat64: IDL.Nat64,
                int16: IDL.Int16,
                int32: IDL.Int32,
                int64: IDL.Int64,
              }),
            ),
            nat8: IDL.Nat8,
            text: IDL.Text,
            nat16: IDL.Nat16,
            nat32: IDL.Nat32,
            nat64: IDL.Nat64,
            int16: IDL.Int16,
            int32: IDL.Int32,
            int64: IDL.Int64,
          }),
        ),
      ),
    ),
    event_description: IDL.Text,
    recording_visibility: IDL.Opt(RecordingVisibility),
    end_date: IDL.Nat,
    user_id: IDL.Opt(IDL.Text),
    consultations: IDL.Opt(IDL.Vec(IDL.Text)),
    start_date: IDL.Nat,
    expertise: IDL.Opt(IDL.Text),
    showcase_link: IDL.Opt(IDL.Text),
    event_id: IDL.Text,
    is_recording_available: IDL.Opt(IDL.Bool),
    event_name: IDL.Text,
    event_type: EventType,
    participation_type: IDL.Opt(ParticipationType),
  })
  const AttributeName = IDL.Text
  const AttributeDataType = IDL.Variant({
    int: IDL.Null,
    map: IDL.Null,
    nat: IDL.Null,
    float: IDL.Null,
    principal: IDL.Null,
    blob: IDL.Null,
    bool: IDL.Null,
    char: IDL.Null,
    int8: IDL.Null,
    list: IDL.Null,
    nat8: IDL.Null,
    text: IDL.Null,
    nat16: IDL.Null,
    nat32: IDL.Null,
    nat64: IDL.Null,
    default: IDL.Null,
    int16: IDL.Null,
    int32: IDL.Null,
    int64: IDL.Null,
  })
  const AttributeDataValue = IDL.Variant({
    int: IDL.Int,
    map: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    list: IDL.Vec(
      IDL.Variant({
        int: IDL.Int,
        nat: IDL.Nat,
        float: IDL.Float64,
        char: IDL.Nat32,
        int8: IDL.Int8,
        nat8: IDL.Nat8,
        text: IDL.Text,
        nat16: IDL.Nat16,
        nat32: IDL.Nat32,
        nat64: IDL.Nat64,
        int16: IDL.Int16,
        int32: IDL.Int32,
        int64: IDL.Int64,
      }),
    ),
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    default: IDL.Null,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  })
  const AttributeMetadata = IDL.Record({
    name: AttributeName,
    unique: IDL.Bool,
    dataType: AttributeDataType,
    required: IDL.Bool,
    defaultValue: AttributeDataValue,
  })
  const IndexName = IDL.Text
  const TableIndexMetadata = IDL.Record({
    name: IndexName,
    attributeName: AttributeName,
  })
  const TableMetadataOutputType = IDL.Record({
    attributes: IDL.Vec(AttributeMetadata),
    indexes: IDL.Vec(TableIndexMetadata),
  })
  const GetTableMetadataOutputType = IDL.Opt(
    IDL.Record({
      metadata: TableMetadataOutputType,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
  )
  const EventResponsePayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    status: IDL.Text,
    token_amount: IDL.Float64,
    price_token: IDL.Text,
    interests: IDL.Vec(IDL.Text),
    metadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    event_description: IDL.Text,
    recording_visibility: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    consultations: IDL.Vec(IDL.Text),
    start_date: IDL.Nat,
    expertise: IDL.Text,
    showcase_link: IDL.Text,
    subaccount_id_hex: IDL.Text,
    subaccount_id_index: IDL.Nat,
    konecta_event_id: IDL.Text,
    event_id: IDL.Text,
    is_recording_available: IDL.Bool,
    event_name: IDL.Text,
    event_type: IDL.Text,
    participation_type: IDL.Text,
  })
  const Result_25 = IDL.Variant({
    ok: IDL.Vec(EventResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const UserResponsePayload = IDL.Record({
    id: IDL.Text,
    bio: IDL.Text,
    categories: IDL.Vec(IDL.Text),
    timezone: IDL.Text,
    firstname: IDL.Text,
    country: IDL.Text,
    username: IDL.Text,
    introduction_video_link: IDL.Text,
    canister_id: IDL.Text,
    email: IDL.Text,
    principal_id: IDL.Text,
    profilepic: IDL.Text,
    coverphoto: IDL.Text,
    lastname: IDL.Text,
  })
  const FeedResponsePayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    userData: UserResponsePayload,
    status: IDL.Text,
    token_amount: IDL.Float64,
    price_token: IDL.Text,
    interests: IDL.Vec(IDL.Text),
    name: IDL.Text,
    recording_visibility: IDL.Text,
    description: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    consultations: IDL.Vec(IDL.Text),
    language: IDL.Text,
    start_date: IDL.Nat,
    expertise: IDL.Text,
    konectaMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    showcase_link: IDL.Text,
    subaccount_id_hex: IDL.Text,
    subaccount_id_index: IDL.Nat,
    konecta_event_id: IDL.Text,
    event_id: IDL.Text,
    is_recording_available: IDL.Bool,
    location: IDL.Text,
    event_type: IDL.Text,
    coverphoto: IDL.Text,
    participation_type: IDL.Text,
    eventMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
  })
  const Result_7 = IDL.Variant({
    ok: IDL.Vec(FeedResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const PaginatedEventResponsePayload = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(EventResponsePayload),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_27 = IDL.Variant({
    ok: PaginatedEventResponsePayload,
    err: IDL.Vec(IDL.Text),
  })
  const PaginatedFeedResponsePayload = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(FeedResponsePayload),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_8 = IDL.Variant({
    ok: PaginatedFeedResponsePayload,
    err: IDL.Vec(IDL.Text),
  })
  const TransactionResponsePayload = IDL.Record({
    fee: IDL.Nat,
    transaction_id: IDL.Text,
    beneficiary_user_id: IDL.Text,
    transferred_to_type: IDL.Text,
    block_index: IDL.Nat,
    memo: IDL.Vec(IDL.Nat8),
    source_account_id_hex: IDL.Text,
    narration: IDL.Text,
    remitter_user_id: IDL.Text,
    event_id: IDL.Text,
    created_at_time: IDL.Nat64,
    destination_account_id_hex: IDL.Text,
    amount: IDL.Nat,
  })
  const PaginatedTransactionResponsePayload = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(TransactionResponsePayload),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_26 = IDL.Variant({
    ok: PaginatedTransactionResponsePayload,
    err: IDL.Text,
  })
  const TransactionUser = IDL.Record({
    firstname: IDL.Text,
    username: IDL.Text,
    email: IDL.Text,
    lastname: IDL.Text,
  })
  const FeedResponsePayloadWithoutUser = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    status: IDL.Text,
    token_amount: IDL.Float64,
    price_token: IDL.Text,
    interests: IDL.Vec(IDL.Text),
    name: IDL.Text,
    recording_visibility: IDL.Text,
    description: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    consultations: IDL.Vec(IDL.Text),
    language: IDL.Text,
    start_date: IDL.Nat,
    expertise: IDL.Text,
    konectaMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    showcase_link: IDL.Text,
    subaccount_id_hex: IDL.Text,
    subaccount_id_index: IDL.Nat,
    konecta_event_id: IDL.Text,
    event_id: IDL.Text,
    is_recording_available: IDL.Bool,
    location: IDL.Text,
    event_type: IDL.Text,
    coverphoto: IDL.Text,
    participation_type: IDL.Text,
    eventMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
  })
  const TransactionWithUserDataResponse = IDL.Record({
    fee: IDL.Nat,
    url: IDL.Text,
    transaction_id: IDL.Text,
    beneficiary_user_id: IDL.Text,
    transferred_to_type: IDL.Text,
    block_index: IDL.Nat,
    beneficiary_user_data: IDL.Opt(TransactionUser),
    memo: IDL.Vec(IDL.Nat8),
    source_account_id_hex: IDL.Text,
    narration: IDL.Text,
    remitter_user_id: IDL.Text,
    event_id: IDL.Text,
    created_at_time: IDL.Nat64,
    destination_account_id_hex: IDL.Text,
    amount: IDL.Nat,
    eventData: FeedResponsePayloadWithoutUser,
  })
  const PaginatedTransactionWithUserDataResponse = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(TransactionWithUserDataResponse),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_5 = IDL.Variant({
    ok: PaginatedTransactionWithUserDataResponse,
    err: IDL.Vec(IDL.Text),
  })
  const FeedRequestPayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    timezone: IDL.Opt(IDL.Text),
    recordingType: IDL.Vec(IDL.Bool),
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchValue: IDL.Opt(IDL.Text),
    currentTimestamp: IDL.Nat,
  })
  const Result_24 = IDL.Variant({
    ok: IDL.Vec(TransactionResponsePayload),
    err: IDL.Text,
  })
  const EventApplicationStatusWithCanister = IDL.Record({
    action: IDL.Text,
    user_canister_id: IDL.Text,
    applied_user_id: IDL.Text,
  })
  const EventApplicationStatus = IDL.Record({
    applied_users: IDL.Vec(EventApplicationStatusWithCanister),
    event_id: IDL.Text,
  })
  const Result_23 = IDL.Variant({
    ok: IDL.Vec(EventApplicationStatus),
    err: IDL.Vec(IDL.Text),
  })
  const AppplicantIdsResponsePayload = IDL.Record({
    id: IDL.Text,
    action: IDL.Text,
    note: IDL.Text,
    timestamp: IDL.Nat,
    applied_user_id: IDL.Text,
    location: IDL.Text,
  })
  const ApplicationStatusOfMyCreatedEvents = IDL.Record({
    event_description: IDL.Text,
    event_id: IDL.Text,
    applied_users_details: IDL.Vec(AppplicantIdsResponsePayload),
    event_name: IDL.Text,
  })
  const PaginatedApplicationStatusOfMyCreatedEvents = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(ApplicationStatusOfMyCreatedEvents),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_22 = IDL.Variant({
    ok: PaginatedApplicationStatusOfMyCreatedEvents,
    err: IDL.Vec(IDL.Text),
  })
  const EventAttendeeActions = IDL.Variant({
    Invited: IDL.Null,
    Applied: IDL.Null,
    Withdrawn: IDL.Null,
    Accepted: IDL.Null,
    Declined: IDL.Null,
    Joined: IDL.Null,
  })
  const Result_21 = IDL.Variant({
    ok: IDL.Vec(AppplicantIdsResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const ApplicantsWithUserDataPayload = IDL.Record({
    userData: UserResponsePayload,
    note: IDL.Text,
    location: IDL.Text,
  })
  const Result_20 = IDL.Variant({
    ok: IDL.Vec(ApplicantsWithUserDataPayload),
    err: IDL.Vec(IDL.Text),
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
  const EventProtocolCanisterPayload = IDL.Record({
    userData: UserResponsePayload,
    status: IDL.Text,
    metadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    name: IDL.Text,
    description: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    language: IDL.Text,
    start_date: IDL.Nat,
    event_id: IDL.Text,
    location: IDL.Text,
    coverphoto: IDL.Text,
  })
  const EventWithUserDataTupleArray = IDL.Vec(
    IDL.Tuple(IDL.Text, EventProtocolCanisterPayload),
  )
  const EventCanisterResponseWithoutUser = IDL.Record({
    status: IDL.Text,
    metadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    name: IDL.Text,
    description: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    language: IDL.Text,
    start_date: IDL.Nat,
    event_id: IDL.Text,
    location: IDL.Text,
    coverphoto: IDL.Text,
  })
  const FeedDetailsPayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    userData: UserResponsePayload,
    status: IDL.Text,
    recording_link: IDL.Text,
    token_amount: IDL.Float64,
    price_token: IDL.Text,
    interests: IDL.Vec(IDL.Text),
    name: IDL.Text,
    recording_visibility: IDL.Text,
    description: IDL.Text,
    end_date: IDL.Nat,
    user_id: IDL.Text,
    consultations: IDL.Vec(IDL.Text),
    language: IDL.Text,
    start_date: IDL.Nat,
    expertise: IDL.Text,
    konectaMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    showcase_link: IDL.Text,
    subaccount_id_hex: IDL.Text,
    subaccount_id_index: IDL.Nat,
    konecta_event_id: IDL.Text,
    event_id: IDL.Text,
    is_recording_available: IDL.Bool,
    location: IDL.Text,
    event_type: IDL.Text,
    coverphoto: IDL.Text,
    participation_type: IDL.Text,
    eventMetadata: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
  })
  const Result_19 = IDL.Variant({
    ok: FeedDetailsPayload,
    err: IDL.Vec(IDL.Text),
  })
  const UserFeedbackResponsePayload = IDL.Record({
    id: IDL.Text,
    timezone: IDL.Text,
    recording_link: IDL.Text,
    firstname: IDL.Text,
    user_type: IDL.Text,
    username: IDL.Text,
    user_id: IDL.Text,
    email: IDL.Text,
    rating: IDL.Nat,
    event_id: IDL.Text,
    successful: IDL.Text,
    lastname: IDL.Text,
    reason: IDL.Text,
  })
  const Result_18 = IDL.Variant({
    ok: UserFeedbackResponsePayload,
    err: IDL.Vec(IDL.Text),
  })
  const Result_17 = IDL.Variant({
    ok: EventResponsePayload,
    err: IDL.Vec(IDL.Text),
  })
  const EventCompletionResponsePayload = IDL.Record({
    id: IDL.Text,
    to: IDL.Text,
    user_type: IDL.Text,
    from: IDL.Text,
    template_name: IDL.Text,
    user_id: IDL.Text,
    notification_type: IDL.Text,
    event_id: IDL.Text,
    message_id: IDL.Text,
    idempotency_key: IDL.Text,
    recipient_type: IDL.Text,
  })
  const Result_16 = IDL.Variant({
    ok: IDL.Vec(EventCompletionResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const ExpertFeedbackResponsePayload = IDL.Record({
    agreeWithUserFeedback: IDL.Text,
    remitter_feedback_missing: IDL.Bool,
    transfer_or_refund: IDL.Text,
    user_id: IDL.Text,
    user_feedback: IDL.Opt(UserFeedbackResponsePayload),
    event_id: IDL.Text,
    event_recording_link: IDL.Text,
    reason: IDL.Text,
    user_feedback_id: IDL.Text,
  })
  const Result_15 = IDL.Variant({
    ok: IDL.Vec(ExpertFeedbackResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const UserActionEmailResponse = IDL.Record({
    to: IDL.Text,
    action: IDL.Text,
    to_user_id: IDL.Text,
    from: IDL.Text,
    template_name: IDL.Text,
    from_user_id: IDL.Text,
    timestamp: IDL.Nat,
    event_id: IDL.Text,
    message_id: IDL.Text,
    idempotency_key: IDL.Text,
  })
  const Result_14 = IDL.Variant({
    ok: IDL.Vec(UserActionEmailResponse),
    err: IDL.Vec(IDL.Text),
  })
  const ForwardToExpertResponsePayload = IDL.Record({
    id: IDL.Text,
    to: IDL.Text,
    from: IDL.Text,
    template_name: IDL.Text,
    event_id: IDL.Text,
    message_id: IDL.Text,
    idempotency_key: IDL.Text,
    user_feedback_id: IDL.Text,
  })
  const Result_13 = IDL.Variant({
    ok: IDL.Vec(ForwardToExpertResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const Result_12 = IDL.Variant({
    ok: IDL.Vec(UserFeedbackResponsePayload),
    err: IDL.Vec(IDL.Text),
  })
  const MissingFeedbackEvent = IDL.Record({
    name: IDL.Text,
    end_date: IDL.Nat,
    start_date: IDL.Nat,
    event_id: IDL.Text,
  })
  const Result_11 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text })
  const ProposalResponsePayload = IDL.Record({
    userData: UserResponsePayload,
    updated_at: IDL.Nat,
    action: IDL.Text,
    event_description: IDL.Text,
    note: IDL.Text,
    event_id: IDL.Text,
    event_name: IDL.Text,
    location: IDL.Text,
  })
  const PaginatedProposalResponsePayload = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    nonScannedItemCount: IDL.Int,
    items: IDL.Vec(ProposalResponsePayload),
    totalRecords: IDL.Nat,
    scannedItemCount: IDL.Int,
  })
  const Result_10 = IDL.Variant({
    ok: PaginatedProposalResponsePayload,
    err: IDL.Text,
  })
  const Result_9 = IDL.Variant({
    ok: IDL.Vec(ProposalResponsePayload),
    err: IDL.Text,
  })
  const AttributeDataValue__1 = IDL.Variant({
    int: IDL.Int,
    map: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            }),
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        }),
      ),
    ),
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    list: IDL.Vec(
      IDL.Variant({
        int: IDL.Int,
        nat: IDL.Nat,
        float: IDL.Float64,
        char: IDL.Nat32,
        int8: IDL.Int8,
        nat8: IDL.Nat8,
        text: IDL.Text,
        nat16: IDL.Nat16,
        nat32: IDL.Nat32,
        nat64: IDL.Nat64,
        int16: IDL.Int16,
        int32: IDL.Int32,
        int64: IDL.Int64,
      }),
    ),
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    default: IDL.Null,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  })
  const ItemOutputType = IDL.Record({
    id: IDL.Text,
    item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    createdAt: IDL.Int,
    updatedAt: IDL.Int,
  })
  const ScanOutputType__1 = IDL.Variant({
    ok: IDL.Vec(ItemOutputType),
    err: IDL.Vec(IDL.Text),
  })
  const Result_6 = IDL.Variant({
    ok: IDL.Vec(FeedResponsePayload),
    err: IDL.Text,
  })
  const FeedbackActions = IDL.Variant({ No: IDL.Null, Yes: IDL.Null })
  const MoneyTransferActions = IDL.Variant({
    RefundToRemitter: IDL.Null,
    TransferToBeneficiary: IDL.Null,
  })
  const ExpertFeedbackRequestPayload = IDL.Record({
    agreeWithUserFeedback: IDL.Opt(FeedbackActions),
    remitter_feedback_missing: IDL.Bool,
    transfer_or_refund: IDL.Opt(MoneyTransferActions),
    user_id: IDL.Opt(IDL.Text),
    event_id: IDL.Text,
    event_recording_link: IDL.Opt(IDL.Text),
    reason: IDL.Opt(IDL.Text),
    user_feedback_id: IDL.Opt(IDL.Text),
  })
  const UserFeedbackRequestPayload = IDL.Record({
    timezone: IDL.Text,
    recording_link: IDL.Opt(IDL.Text),
    firstname: IDL.Text,
    username: IDL.Text,
    email: IDL.Text,
    rating: IDL.Opt(IDL.Nat),
    event_id: IDL.Text,
    successful: FeedbackActions,
    lastname: IDL.Text,
    reason: IDL.Opt(IDL.Text),
  })
  const CreateUserFeedbackResponsePayload = IDL.Record({
    konectaEventData: EventResponsePayload,
    feedbackId: IDL.Text,
  })
  const Result_4 = IDL.Variant({
    ok: IDL.Vec(CreateUserFeedbackResponsePayload),
    err: IDL.Text,
  })
  const Result_3 = IDL.Variant({
    ok: CreateUserFeedbackResponsePayload,
    err: IDL.Text,
  })
  const RelationalExpressionAttributeDataValue = IDL.Variant({
    int: IDL.Int,
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  })
  const ContaintmentExpressionAttributeDataValue = IDL.Variant({
    char: IDL.Nat32,
    list: IDL.Vec(
      IDL.Variant({
        int: IDL.Int,
        nat: IDL.Nat,
        float: IDL.Float64,
        char: IDL.Nat32,
        int8: IDL.Int8,
        nat8: IDL.Nat8,
        text: IDL.Text,
        nat16: IDL.Nat16,
        nat32: IDL.Nat32,
        nat64: IDL.Nat64,
        int16: IDL.Int16,
        int32: IDL.Int32,
        int64: IDL.Int64,
      }),
    ),
    text: IDL.Text,
  })
  const StringAttributeDataValue = IDL.Variant({
    char: IDL.Nat32,
    text: IDL.Text,
  })
  const FilterExpressionConditionType = IDL.Variant({
    EQ: RelationalExpressionAttributeDataValue,
    GT: RelationalExpressionAttributeDataValue,
    IN: IDL.Vec(RelationalExpressionAttributeDataValue),
    LT: RelationalExpressionAttributeDataValue,
    GTE: RelationalExpressionAttributeDataValue,
    LTE: RelationalExpressionAttributeDataValue,
    NEQ: RelationalExpressionAttributeDataValue,
    LIKE: IDL.Vec(RelationalExpressionAttributeDataValue),
    NOT_EXISTS: IDL.Null,
    EXISTS: IDL.Null,
    CONTAINS: ContaintmentExpressionAttributeDataValue,
    BEGINS_WITH: StringAttributeDataValue,
    NOT_CONTAINS: ContaintmentExpressionAttributeDataValue,
    BETWEEN: IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ),
    NOT_BETWEEN: IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ),
  })
  const FilterExpressionType = IDL.Record({
    filterExpressionCondition: FilterExpressionConditionType,
    attributeName: IDL.Text,
  })
  const SortDirection = IDL.Variant({ asc: IDL.Null, desc: IDL.Null })
  const AttributeDataType__1 = IDL.Variant({
    int: IDL.Null,
    map: IDL.Null,
    nat: IDL.Null,
    float: IDL.Null,
    principal: IDL.Null,
    blob: IDL.Null,
    bool: IDL.Null,
    char: IDL.Null,
    int8: IDL.Null,
    list: IDL.Null,
    nat8: IDL.Null,
    text: IDL.Null,
    nat16: IDL.Null,
    nat32: IDL.Null,
    nat64: IDL.Null,
    default: IDL.Null,
    int16: IDL.Null,
    int32: IDL.Null,
    int64: IDL.Null,
  })
  const SortMultipleInputType = IDL.Vec(
    IDL.Record({
      sortKey: IDL.Opt(IDL.Text),
      sortDirection: IDL.Opt(SortDirection),
      sortKeyDataType: IDL.Opt(AttributeDataType__1),
    }),
  )
  const ForeignKeyInputType = IDL.Record({
    primaryKeyTableName: IDL.Text,
    foreignKeyName: IDL.Text,
  })
  const SearchInputType = IDL.Record({
    searchValue: IDL.Opt(IDL.Text),
    foreignKeys: IDL.Opt(IDL.Vec(ForeignKeyInputType)),
  })
  const PaginatedScanInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    offset: IDL.Nat,
    sortObject: IDL.Opt(SortMultipleInputType),
    limit: IDL.Nat,
    searchObject: IDL.Opt(SearchInputType),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const GetDatabasesInputType = IDL.Record({})
  const GetItemByIdInputType = IDL.Record({
    id: IDL.Text,
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const GetTableMetadataInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const ScanAndGetIdsInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const BatchGetItemByIdInputType = IDL.Record({
    ids: IDL.Vec(IDL.Text),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const ScanInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const GetItemCountInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const QueryOpsInputType = IDL.Variant({
    PaginatedScanInput: PaginatedScanInputType,
    GetDatabasesInput: GetDatabasesInputType,
    GetItemByIdInput: GetItemByIdInputType,
    GetTableMetadataInput: GetTableMetadataInputType,
    ScanAndGetIdsInput: ScanAndGetIdsInputType,
    BatchGetItemByIdInput: BatchGetItemByIdInputType,
    ScanInput: ScanInputType,
    GetItemCountInput: GetItemCountInputType,
  })
  const GetTableMetadataOutputType__1 = IDL.Opt(
    IDL.Record({
      metadata: TableMetadataOutputType,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
  )
  const PaginatedScanOutputType = IDL.Variant({
    ok: IDL.Record({
      offset: IDL.Nat,
      limit: IDL.Nat,
      nonScannedItemCount: IDL.Int,
      items: IDL.Vec(ItemOutputType),
      scannedItemCount: IDL.Int,
    }),
    err: IDL.Vec(IDL.Text),
  })
  const ScanAndGetIdsOutputType = IDL.Variant({
    ok: IDL.Record({ ids: IDL.Vec(IDL.Text) }),
    err: IDL.Vec(IDL.Text),
  })
  const GetDatabasesOutputType = IDL.Record({
    databases: IDL.Vec(
      IDL.Record({ name: IDL.Text, tables: IDL.Vec(IDL.Text) }),
    ),
  })
  const GetItemCountOutputType = IDL.Variant({
    ok: IDL.Record({ count: IDL.Int }),
    err: IDL.Vec(IDL.Text),
  })
  const GetItemByIdOutputType = IDL.Variant({
    ok: ItemOutputType,
    err: IDL.Vec(IDL.Text),
  })
  const BatchGetItemByIdOutputType = IDL.Variant({
    ok: IDL.Record({
      notFoundIds: IDL.Vec(IDL.Text),
      items: IDL.Vec(ItemOutputType),
    }),
    err: IDL.Vec(IDL.Text),
  })
  const ScanOutputType = IDL.Variant({
    ok: IDL.Vec(ItemOutputType),
    err: IDL.Vec(IDL.Text),
  })
  const QueryOpsOutputType = IDL.Variant({
    GetTableMetadataOutput: GetTableMetadataOutputType__1,
    PaginatedScanOutput: PaginatedScanOutputType,
    ScanAndGetIdsOutput: ScanAndGetIdsOutputType,
    GetDatabasesOutput: GetDatabasesOutputType,
    GetItemCountOutput: GetItemCountOutputType,
    GetItemByIdOutput: GetItemByIdOutputType,
    BatchGetItemByIdOutput: BatchGetItemByIdOutputType,
    ScanOutput: ScanOutputType,
  })
  const EmailResponse = IDL.Record({
    message_id: IDL.Text,
    idempotency_key: IDL.Text,
  })
  const Timestamp = IDL.Nat64
  const LedgerIcrc1TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    FetchTxHistoryError: IDL.Record({ message: IDL.Text }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    GetAcceptedUserError: IDL.Record({ message: IDL.Text }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
    FetchEventDetailsError: IDL.Record({ message: IDL.Text }),
    TooOld: IDL.Null,
    SendEmailError: IDL.Record({ message: IDL.Text }),
    AddTxHistoryError: IDL.Record({ message: IDL.Text }),
    FreeEventError: IDL.Record({ message: IDL.Text }),
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  })
  const Result_2 = IDL.Variant({
    ok: IDL.Text,
    err: IDL.Vec(LedgerIcrc1TransferError),
  })
  const TransferRequestPayload = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    eventId: IDL.Text,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    priceToken: Token,
    amount: IDL.Nat,
  })
  const LedgerIcrc2TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    FetchTxHistoryError: IDL.Record({ message: IDL.Text }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    CreateEventMetadataError: IDL.Record({ message: IDL.Text }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    FetchEventDetailsError: IDL.Record({ message: IDL.Text }),
    TooOld: IDL.Null,
    AddTxHistoryError: IDL.Record({ message: IDL.Text }),
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  })
  const Result_1 = IDL.Variant({
    ok: IDL.Text,
    err: LedgerIcrc2TransferError,
  })
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text })
  const HttpResponsePayload = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  })
  const TransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponsePayload,
  })
  const CollectMetricsRequestType = IDL.Variant({
    force: IDL.Null,
    normal: IDL.Null,
  })
  const UpdateInformationRequest = IDL.Record({
    metrics: IDL.Opt(CollectMetricsRequestType),
  })
  const DropAttributeInputType = IDL.Record({
    attributeName: IDL.Text,
    databaseName: IDL.Text,
    tableName: IDL.Text,
  })
  const UpdateItemInputType = IDL.Record({
    id: IDL.Text,
    databaseName: IDL.Text,
    attributeDataValues: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    tableName: IDL.Text,
  })
  const CreateDatabaseInputType = IDL.Record({ name: IDL.Text })
  const CreateTableInputType = IDL.Record({
    name: IDL.Text,
    databaseName: IDL.Text,
    attributes: IDL.Vec(AttributeMetadata),
    indexes: IDL.Vec(TableIndexMetadata),
  })
  const CreateItemInputType = IDL.Record({
    databaseName: IDL.Text,
    attributeDataValues: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    tableName: IDL.Text,
  })
  const AddAttributeInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
    attribute: AttributeMetadata,
  })
  const UpdateOpsInputType = IDL.Variant({
    DropAttributeInput: DropAttributeInputType,
    UpdateItemInput: UpdateItemInputType,
    CreateDatabaseInput: CreateDatabaseInputType,
    CreateTableInput: CreateTableInputType,
    CreateItemInput: CreateItemInputType,
    AddAttributeInput: AddAttributeInputType,
  })
  const AddAttributeOutputType = IDL.Variant({
    ok: IDL.Record({
      attributeName: IDL.Text,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
    err: IDL.Vec(IDL.Text),
  })
  const CreateItemOutputType = IDL.Variant({
    ok: IDL.Record({
      id: IDL.Text,
      item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    }),
    err: IDL.Vec(IDL.Text),
  })
  const UpdateItemOutputType = IDL.Variant({
    ok: IDL.Record({
      id: IDL.Text,
      item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    }),
    err: IDL.Vec(IDL.Text),
  })
  const CreateDatabaseOutputType = IDL.Variant({
    ok: IDL.Record({}),
    err: IDL.Vec(IDL.Text),
  })
  const CreateTableOutputType = IDL.Variant({
    ok: IDL.Record({}),
    err: IDL.Vec(IDL.Text),
  })
  const DropAttributeOutputType = IDL.Variant({
    ok: IDL.Record({
      attributeName: IDL.Text,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
    err: IDL.Vec(IDL.Text),
  })
  const UpdateOpsOutputType = IDL.Variant({
    AddAttributeOutput: AddAttributeOutputType,
    CreateItemOutput: CreateItemOutputType,
    UpdateItemOutput: UpdateItemOutputType,
    CreateDatabaseOutput: CreateDatabaseOutputType,
    CreateTableOutput: CreateTableOutputType,
    DropAttributeOutput: DropAttributeOutputType,
  })
  const RemoveCalendarEvent = IDL.Record({ event_id: IDL.Text })
  return IDL.Service({
    acceptUserApplication: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    applyToServiceRequest: IDL.Func(
      [ApplyToServiceRequestPayload],
      [Result],
      [],
    ),
    cancelKonectaEvent: IDL.Func([IDL.Text], [Result], []),
    cancelKonectaEventTest: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    checkFeedbackByUserForEvent: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Vec(RelationalExpressionAttributeDataValue__1)],
      [IDL.Bool],
      ['query'],
    ),
    checkIfAcceptedUserExistsForEvent: IDL.Func(
      [IDL.Text],
      [IDL.Bool],
      ['query'],
    ),
    checkIfEventExistsForTheDay: IDL.Func(
      [CheckEventExistsPayload],
      [Result_29],
      ['query'],
    ),
    checkIfEventExistsForTheDayTest: IDL.Func(
      [IDL.Text, CheckEventExistsPayload],
      [Result_29],
      ['query'],
    ),
    checkIfEventIsCanceled: IDL.Func([IDL.Text], [Result_28], ['query']),
    checkIfUserFeedbackExistsForEvent: IDL.Func(
      [IDL.Text],
      [Result_28],
      ['query'],
    ),
    checkIfUserFeedbackExistsForEventTest: IDL.Func(
      [IDL.Text, IDL.Text],
      [Result_28],
      ['query'],
    ),
    checkIfUserIsOfferAttendee: IDL.Func(
      [IDL.Principal, IDL.Text],
      [IDL.Bool],
      ['composite_query'],
    ),
    checkIfUserIsOfferAttendeeOrRequestAcceptedUser: IDL.Func(
      [IDL.Principal, IDL.Text],
      [IDL.Bool],
      ['composite_query'],
    ),
    createKonectaEvent: IDL.Func([IDL.Text, EventRequestPayload], [Result], []),
    declineUserApplication: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    eventCompletionNotificationTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    expertEmailTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    expertFeedbackTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    generateFeedResponse: IDL.Func(
      [Result_25],
      [Result_7],
      ['composite_query'],
    ),
    generatePaginatedFeedResponse: IDL.Func(
      [Result_27],
      [Result_8],
      ['composite_query'],
    ),
    generateSchema: IDL.Func([], [IDL.Text], []),
    generateTransactionResponse: IDL.Func(
      [Result_26],
      [Result_5],
      ['composite_query'],
    ),
    getAllFutureOffers: IDL.Func(
      [FeedRequestPayload],
      [Result_8],
      ['composite_query'],
    ),
    getAllFutureRequests: IDL.Func(
      [FeedRequestPayload],
      [Result_8],
      ['composite_query'],
    ),
    getAllKonectAEvents: IDL.Func([], [Result_25], ['query']),
    getAllPaginatedTransactions: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_5],
      ['composite_query'],
    ),
    getAllPastOffers: IDL.Func(
      [FeedRequestPayload],
      [Result_8],
      ['composite_query'],
    ),
    getAllPastRequests: IDL.Func(
      [FeedRequestPayload],
      [Result_8],
      ['composite_query'],
    ),
    getAllTransactions: IDL.Func([], [Result_24], ['query']),
    getApplicationStatusForEvents: IDL.Func(
      [],
      [Result_23],
      ['composite_query'],
    ),
    getApplicationStatusForEventsTest: IDL.Func(
      [IDL.Text],
      [Result_23],
      ['composite_query'],
    ),
    getApplicationStatusOfMyCreatedEvents: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_22],
      ['composite_query'],
    ),
    getApplicationStatusOfMyCreatedEventsTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_22],
      ['composite_query'],
    ),
    getAppliedUsersByActionForEvent: IDL.Func(
      [IDL.Text, IDL.Vec(EventAttendeeActions)],
      [Result_21],
      ['query'],
    ),
    getAppliedUsersByActionWithUserData: IDL.Func(
      [IDL.Text, IDL.Vec(EventAttendeeActions)],
      [Result_20],
      ['composite_query'],
    ),
    getCanistergeekInformation: IDL.Func(
      [GetInformationRequest],
      [GetInformationResponse],
      ['query'],
    ),
    getDefaultAccountIdentifier: IDL.Func([], [IDL.Text], ['query']),
    getDefaultAccountIdentifierTest: IDL.Func(
      [IDL.Text],
      [IDL.Text],
      ['query'],
    ),
    getEventArrayFromEventIdArray: IDL.Func(
      [IDL.Vec(EventResponsePayload)],
      [EventWithUserDataTupleArray],
      ['composite_query'],
    ),
    getEventCanisterDetailsByCompositeQuery: IDL.Func(
      [IDL.Text],
      [EventCanisterResponseWithoutUser],
      ['composite_query'],
    ),
    getFeedDetailsByEventId: IDL.Func(
      [IDL.Text],
      [Result_19],
      ['composite_query'],
    ),
    getFeedbackById: IDL.Func([IDL.Text], [Result_18], ['query']),
    getKonectaEventDetailsByEventId: IDL.Func(
      [IDL.Text],
      [Result_17],
      ['query'],
    ),
    getKonectaEventTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    getLedgerAccount: IDL.Func(
      [IDL.Text, IDL.Opt(IDL.Text)],
      [IDL.Text],
      ['query'],
    ),
    getListOfEventCompletionEmails: IDL.Func([], [Result_16], ['query']),
    getListOfExpertFeedbacks: IDL.Func([], [Result_15], ['query']),
    getListOfMissingFeedbackEvents: IDL.Func(
      [],
      [Result_7],
      ['composite_query'],
    ),
    getListOfMissingFeedbackEventsTest: IDL.Func(
      [IDL.Text],
      [Result_7],
      ['composite_query'],
    ),
    getListOfUserActionEmails: IDL.Func([], [Result_14], ['query']),
    getListOfUserFeedbackForwardedEmailsToExpert: IDL.Func(
      [],
      [Result_13],
      ['query'],
    ),
    getListOfUserFeedbacks: IDL.Func([], [Result_12], ['query']),
    getMissingFeedbackEventArray: IDL.Func(
      [IDL.Vec(IDL.Text)],
      [IDL.Vec(MissingFeedbackEvent)],
      ['composite_query'],
    ),
    getMyJoinedEvents: IDL.Func([], [Result_7], ['composite_query']),
    getMyJoinedEventsCount: IDL.Func([], [Result_11], ['composite_query']),
    getMyPaginatedProposals: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_10],
      ['composite_query'],
    ),
    getMyPaginatedProposalsTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_10],
      ['composite_query'],
    ),
    getMyProposals: IDL.Func([], [Result_9], []),
    getMyProposalsTest: IDL.Func([IDL.Text], [Result_9], []),
    getMyServiceOffers: IDL.Func([], [Result_7], []),
    getMyServiceOffersTest: IDL.Func([IDL.Text], [Result_7], []),
    getMyServiceOffersUntransformed: IDL.Func(
      [IDL.Text],
      [ScanOutputType__1],
      ['query'],
    ),
    getMyServiceRequests: IDL.Func([], [Result_7], []),
    getMyServiceRequestsTest: IDL.Func([IDL.Text], [Result_7], []),
    getMyServiceRequestsUntransformed: IDL.Func(
      [IDL.Text],
      [ScanOutputType__1],
      ['query'],
    ),
    getPaginatedJoinedOffersForMyProfile: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedJoinedOffersForMyProfileTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedJoinedRequestsForMyProfile: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedJoinedRequestsForMyProfileTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedServiceOffersForMyProfile: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedServiceOffersForMyProfileTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedServiceRequestsForMyProfile: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPaginatedServiceRequestsForMyProfileTest: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_8],
      ['composite_query'],
    ),
    getPrincipal: IDL.Func([IDL.Text], [IDL.Principal], ['query']),
    getServiceOffersApartFromMe: IDL.Func([], [Result_7], []),
    getServiceOffersApartFromMeTest: IDL.Func([IDL.Text], [Result_7], []),
    getServiceOffersApartFromMeUntransformed: IDL.Func(
      [IDL.Text],
      [ScanOutputType__1],
      ['query'],
    ),
    getServiceOffersForMyProfile: IDL.Func([], [Result_6], []),
    getServiceOffersForMyProfileTest: IDL.Func([IDL.Text], [Result_6], []),
    getServiceRequestsApartFromMe: IDL.Func([], [Result_7], []),
    getServiceRequestsApartFromMeTest: IDL.Func([IDL.Text], [Result_7], []),
    getServiceRequestsApartFromMeUntransformed: IDL.Func(
      [IDL.Text],
      [ScanOutputType__1],
      ['query'],
    ),
    getServiceRequestsForMyProfile: IDL.Func([], [Result_6], []),
    getServiceRequestsForMyProfileTest: IDL.Func([IDL.Text], [Result_6], []),
    getSubAccountIdBlobFromIndexForPrincipal: IDL.Func(
      [IDL.Text, IDL.Nat],
      [IDL.Vec(IDL.Nat8)],
      ['query'],
    ),
    getSubAccountIdFromIndex: IDL.Func([IDL.Nat], [IDL.Text], ['query']),
    getSubAccountIdFromIndexForPrincipal: IDL.Func(
      [IDL.Text, IDL.Nat],
      [IDL.Text],
      ['query'],
    ),
    getTransactionTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    getTransactionsForEventByType: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text, IDL.Text],
      [Result_5],
      ['composite_query'],
    ),
    getTransactionsForUser: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [Result_5],
      ['composite_query'],
    ),
    getTransactionsForUserByType: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text],
      [Result_5],
      ['composite_query'],
    ),
    getTransactionsForUserByTypeTest: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text, IDL.Text],
      [Result_5],
      ['composite_query'],
    ),
    getTransactionsForUserTest: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text],
      [Result_5],
      ['composite_query'],
    ),
    getUserDetailsByCompositeQuery: IDL.Func(
      [IDL.Text],
      [UserResponsePayload],
      ['composite_query'],
    ),
    getUserFeedbackTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    getUserStatusForEvent: IDL.Func(
      [IDL.Text],
      [IDL.Text],
      ['composite_query'],
    ),
    getUserStatusForServiceOffers: IDL.Func(
      [IDL.Principal, IDL.Text],
      [IDL.Text],
      ['composite_query'],
    ),
    getUserStatusForServiceRequests: IDL.Func(
      [IDL.Principal, IDL.Text],
      [IDL.Text],
      ['query'],
    ),
    get_trusted_origins: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    icrc28_trusted_origins: IDL.Func(
      [],
      [IDL.Record({ trusted_origins: IDL.Vec(IDL.Text) })],
      ['query'],
    ),
    insertExpertFeedback: IDL.Func(
      [ExpertFeedbackRequestPayload],
      [Result],
      [],
    ),
    insertMultipleUserFeedback: IDL.Func(
      [IDL.Vec(UserFeedbackRequestPayload)],
      [Result_4],
      [],
    ),
    insertMultipleUserFeedbackTest: IDL.Func(
      [IDL.Text, IDL.Vec(UserFeedbackRequestPayload)],
      [Result_4],
      [],
    ),
    insertUserFeedback: IDL.Func([UserFeedbackRequestPayload], [Result_3], []),
    insertUserFeedbackTest: IDL.Func(
      [IDL.Text, UserFeedbackRequestPayload],
      [Result_3],
      [],
    ),
    isWhiteListUser: IDL.Func([IDL.Text], [IDL.Bool], []),
    joinPublicEvent: IDL.Func([IDL.Text], [Result], []),
    queryOperation: IDL.Func(
      [IDL.Record({ queryOpsInput: QueryOpsInputType })],
      [QueryOpsOutputType],
      ['query'],
    ),
    resolutionResponseTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    runMoneyTransferJob: IDL.Func([], [Result], []),
    runMoneyTransferJobForHoursTest: IDL.Func([IDL.Nat], [Result], []),
    runMoneyTransferTestForEvent: IDL.Func([IDL.Text], [Result], []),
    runMoneyTransferTestJob: IDL.Func([], [Result], []),
    sendEmail: IDL.Func([], [EmailResponse], []),
    sendEventCompletionEmail: IDL.Func([], [Result], []),
    sendEventCompletionEmailHoursTest: IDL.Func([IDL.Nat], [Result], []),
    sendEventCompletionEmailTest: IDL.Func([IDL.Text], [Result], []),
    transferAmountFromSubAccountToUserForEvent: IDL.Func(
      [IDL.Text],
      [Result_2],
      [],
    ),
    transferAmountFromUserToEventSubAccount: IDL.Func(
      [TransferRequestPayload],
      [Result_1],
      [],
    ),
    transferAmountFromUserToEventSubAccountTest: IDL.Func(
      [IDL.Text, TransferRequestPayload],
      [Result_1],
      [],
    ),
    transform: IDL.Func([TransformArgs], [HttpResponsePayload], ['query']),
    updateCanistergeekInformation: IDL.Func([UpdateInformationRequest], [], []),
    updateKonectaEvent: IDL.Func(
      [IDL.Text, EventRequestPayload],
      [IDL.Text],
      [],
    ),
    updateMultipleKonectaEvents: IDL.Func(
      [IDL.Text, IDL.Vec(EventRequestPayload)],
      [Result],
      [],
    ),
    updateOperation: IDL.Func(
      [IDL.Record({ updateOpsInput: UpdateOpsInputType })],
      [UpdateOpsOutputType],
      [],
    ),
    userActionTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType],
      ['query'],
    ),
    withdrawEventPartipication: IDL.Func([RemoveCalendarEvent], [Result], []),
    withdrawEventPartipicationTest: IDL.Func(
      [IDL.Text, RemoveCalendarEvent],
      [Result],
      [],
    ),
  })
}
export const init = ({ IDL }) => {
  return []
}
