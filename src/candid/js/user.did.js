/* eslint-disable @typescript-eslint/naming-convention */
export const idlFactory = ({ IDL }) => {
  const EventStatus = IDL.Variant({
    Draft: IDL.Null,
    Created: IDL.Null,
    Canceled: IDL.Null,
  })
  const EventMetadataRequestPayload = IDL.Record({
    categories: IDL.Opt(IDL.Vec(IDL.Text)),
    status: EventStatus,
    interests: IDL.Opt(IDL.Vec(IDL.Text)),
    calendar_id: IDL.Opt(IDL.Text),
    name: IDL.Opt(IDL.Text),
    end_date: IDL.Opt(IDL.Nat),
    created_by: IDL.Opt(IDL.Principal),
    start_date: IDL.Opt(IDL.Nat),
    event_id: IDL.Text,
  })
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text })
  const CanisterStatus = IDL.Record({
    status: IDL.Variant({
      stopped: IDL.Null,
      stopping: IDL.Null,
      running: IDL.Null,
    }),
    memory_size: IDL.Nat,
    cycles: IDL.Nat,
    settings: IDL.Record({
      freezing_threshold: IDL.Nat,
      controllers: IDL.Vec(IDL.Principal),
      memory_allocation: IDL.Nat,
      compute_allocation: IDL.Nat,
    }),
    idle_cycles_burned_per_day: IDL.Nat,
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
  })
  const EventMetadataResponsePayload = IDL.Record({
    categories: IDL.Vec(IDL.Text),
    status: IDL.Text,
    interests: IDL.Vec(IDL.Text),
    calendar_id: IDL.Text,
    name: IDL.Text,
    end_date: IDL.Nat,
    created_by: IDL.Text,
    start_date: IDL.Nat,
    event_id: IDL.Text,
    event_metadata_id: IDL.Text,
  })
  const Result_2 = IDL.Variant({
    ok: IDL.Vec(EventMetadataResponsePayload),
    err: IDL.Vec(IDL.Text),
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
  const GetTableMetadataOutputType__1 = IDL.Opt(
    IDL.Record({
      metadata: TableMetadataOutputType,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
  )
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
  const Result_1 = IDL.Variant({
    ok: EventMetadataResponsePayload,
    err: IDL.Vec(IDL.Text),
  })
  const GetFileOutputType = IDL.Opt(
    IDL.Record({
      fileData: IDL.Vec(IDL.Nat8),
      fileName: IDL.Text,
      fileSize: IDL.Nat64,
      fileType: IDL.Text,
      fileId: IDL.Text,
    }),
  )
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
  const EventUserResponsePayload = IDL.Record({
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
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text)
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    certificate_version: IDL.Opt(IDL.Nat16),
  })
  const StreamingCallbackToken__1 = IDL.Record({
    file_size: IDL.Nat64,
    index: IDL.Nat64,
    chunk_size: IDL.Nat64,
    file_id: IDL.Text,
  })
  const StreamingCallbackHttpResponse__1 = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken__1),
    body: IDL.Vec(IDL.Nat8),
  })
  const StreamingCallback = IDL.Func(
    [StreamingCallbackToken__1],
    [StreamingCallbackHttpResponse__1],
    ['query'],
  )
  const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: StreamingCallbackToken__1,
      callback: StreamingCallback,
    }),
  })
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16,
  })
  const StreamingCallbackToken = IDL.Record({
    file_size: IDL.Nat64,
    index: IDL.Nat64,
    chunk_size: IDL.Nat64,
    file_id: IDL.Text,
  })
  const StreamingCallbackHttpResponse = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken__1),
    body: IDL.Vec(IDL.Nat8),
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
  const GetTableMetadataOutputType = IDL.Opt(
    IDL.Record({
      metadata: TableMetadataOutputType,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
  )
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
    GetTableMetadataOutput: GetTableMetadataOutputType,
    PaginatedScanOutput: PaginatedScanOutputType,
    ScanAndGetIdsOutput: ScanAndGetIdsOutputType,
    GetDatabasesOutput: GetDatabasesOutputType,
    GetItemCountOutput: GetItemCountOutputType,
    GetItemByIdOutput: GetItemByIdOutputType,
    BatchGetItemByIdOutput: BatchGetItemByIdOutputType,
    ScanOutput: ScanOutputType,
  })
  const ReadStableMapResponse = IDL.Record({
    userData: UserPayload,
    principal_id: IDL.Text,
  })
  const StoreFileInputType = IDL.Record({
    fileName: IDL.Text,
    fileType: IDL.Text,
    fileDataObject: IDL.Vec(IDL.Nat8),
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
  const CalendarRequestPayload = IDL.Record({
    name: IDL.Text,
    description: IDL.Text,
  })
  const UserRequestPayload = IDL.Record({
    id: IDL.Opt(IDL.Text),
    bio: IDL.Opt(IDL.Text),
    categories: IDL.Opt(IDL.Vec(IDL.Text)),
    timezone: IDL.Text,
    firstname: IDL.Text,
    country: IDL.Text,
    username: IDL.Text,
    introduction_video_link: IDL.Opt(IDL.Text),
    email: IDL.Text,
    profilepic: IDL.Opt(IDL.Text),
    coverphoto: IDL.Opt(IDL.Text),
    lastname: IDL.Text,
  })
  return IDL.Service({
    approveCycleWithdrawal: IDL.Func([IDL.Nat], [], []),
    createEventMetaData: IDL.Func([EventMetadataRequestPayload], [Result], []),
    fetchCanisterStatus: IDL.Func(
      [IDL.Opt(IDL.Principal)],
      [CanisterStatus],
      [],
    ),
    generateSchema: IDL.Func([], [IDL.Text], []),
    getAccountIdentifier: IDL.Func([], [IDL.Text], ['query']),
    getAllEventsMetadata: IDL.Func([], [Result_2], ['query']),
    getAllEventsMetadataForUser: IDL.Func([], [Result_2], ['query']),
    getCalendarId: IDL.Func([IDL.Text], [IDL.Text], ['query']),
    getCalendarTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType__1],
      ['query'],
    ),
    getCanistergeekInformation: IDL.Func(
      [GetInformationRequest],
      [GetInformationResponse],
      ['query'],
    ),
    getCurrentCanisterPrincipal: IDL.Func([], [IDL.Text], ['query']),
    getEventMetaDataFromStartToEndDate: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Vec(IDL.Text)],
      [Result_2],
      ['query'],
    ),
    getEventMetadataById: IDL.Func([IDL.Text], [Result_1], ['query']),
    getEventMetadataId: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
    getFile: IDL.Func([IDL.Text], [GetFileOutputType], ['query']),
    getUser: IDL.Func([], [IDL.Opt(UserPayload)], ['query']),
    getUserByPrincipalId: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserPayload)],
      ['query'],
    ),
    getUserDetailsByUsername: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserPayload)],
      ['query'],
    ),
    getUserEventMetadataTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType__1],
      ['query'],
    ),
    getUserForEventCanister: IDL.Func(
      [IDL.Text],
      [EventUserResponsePayload],
      ['query'],
    ),
    getUserTableMetadata: IDL.Func(
      [],
      [GetTableMetadataOutputType__1],
      ['query'],
    ),
    getUserTest: IDL.Func([IDL.Text], [IDL.Opt(UserPayload)], ['query']),
    get_trusted_origins: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
    http_request_streaming_callback: IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackHttpResponse],
      ['query'],
    ),
    icrc28_trusted_origins: IDL.Func(
      [],
      [IDL.Record({ trusted_origins: IDL.Vec(IDL.Text) })],
      ['query'],
    ),
    isWhiteListUser: IDL.Func([IDL.Text], [IDL.Bool], []),
    migrateUserDataFromMap: IDL.Func([IDL.Principal], [IDL.Text], []),
    queryOperation: IDL.Func(
      [IDL.Record({ queryOpsInput: QueryOpsInputType })],
      [QueryOpsOutputType],
      ['query'],
    ),
    readStableMap: IDL.Func([], [IDL.Vec(ReadStableMapResponse)], ['query']),
    removeCalendarEvent: IDL.Func([IDL.Text], [Result], []),
    saveFile: IDL.Func([StoreFileInputType], [IDL.Text], []),
    updateCanistergeekInformation: IDL.Func([UpdateInformationRequest], [], []),
    updateEventMetaData: IDL.Func(
      [IDL.Text, EventMetadataRequestPayload],
      [Result],
      [],
    ),
    updateEventMetadataForAttendee: IDL.Func(
      [
        IDL.Record({
          eventId: IDL.Text,
          eventMetadataPayload: EventMetadataRequestPayload,
        }),
      ],
      [Result],
      [],
    ),
    updateOperation: IDL.Func(
      [IDL.Record({ updateOpsInput: UpdateOpsInputType })],
      [UpdateOpsOutputType],
      [],
    ),
    upsertCalendarData: IDL.Func(
      [IDL.Text, IDL.Text, CalendarRequestPayload],
      [IDL.Text],
      [],
    ),
    upsertUser: IDL.Func([UserRequestPayload], [IDL.Text], []),
    upsertUserRecordWithAnonymousPrincipal: IDL.Func(
      [IDL.Text, UserRequestPayload],
      [IDL.Text],
      [],
    ),
    upsertUserTest: IDL.Func([IDL.Text, UserRequestPayload], [IDL.Text], []),
  })
}
export const init = ({ IDL }) => {
  return []
}
