export const idlFactory = ({ IDL }) => {
  const QueryFilter = IDL.Rec();
  const EventStatus = IDL.Variant({
    'Draft' : IDL.Null,
    'Created' : IDL.Null,
    'Canceled' : IDL.Null,
  });
  const CreateEventMetadataPayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'status' : EventStatus,
    'interests' : IDL.Vec(IDL.Text),
    'calendar_id' : IDL.Text,
    'name' : IDL.Text,
    'end_date' : IDL.Nat,
    'created_by' : IDL.Principal,
    'start_date' : IDL.Nat,
    'event_id' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const CanisterStatus = IDL.Record({
    'status' : IDL.Variant({
      'stopped' : IDL.Null,
      'stopping' : IDL.Null,
      'running' : IDL.Null,
    }),
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : IDL.Record({
      'freezing_threshold' : IDL.Nat,
      'controllers' : IDL.Vec(IDL.Principal),
      'memory_allocation' : IDL.Nat,
      'compute_allocation' : IDL.Nat,
    }),
    'idle_cycles_burned_per_day' : IDL.Nat,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const EventMetadataResponsePayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'status' : IDL.Text,
    'interests' : IDL.Vec(IDL.Text),
    'calendar_id' : IDL.Text,
    'name' : IDL.Text,
    'end_date' : IDL.Nat,
    'created_by' : IDL.Text,
    'start_date' : IDL.Nat,
    'event_id' : IDL.Text,
    'event_metadata_id' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(EventMetadataResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const StatusRequest = IDL.Record({
    'memory_size' : IDL.Bool,
    'cycles' : IDL.Bool,
    'heap_memory_size' : IDL.Bool,
  });
  const MetricsGranularity = IDL.Variant({
    'hourly' : IDL.Null,
    'daily' : IDL.Null,
  });
  const GetMetricsParameters = IDL.Record({
    'dateToMillis' : IDL.Nat,
    'granularity' : MetricsGranularity,
    'dateFromMillis' : IDL.Nat,
  });
  const MetricsRequest = IDL.Record({ 'parameters' : GetMetricsParameters });
  const GetLogMessagesFilter = IDL.Record({
    'analyzeCount' : IDL.Nat32,
    'messageRegex' : IDL.Opt(IDL.Text),
    'messageContains' : IDL.Opt(IDL.Text),
  });
  const Nanos = IDL.Nat64;
  const GetLogMessagesParameters = IDL.Record({
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
    'fromTimeNanos' : IDL.Opt(Nanos),
  });
  const GetLatestLogMessagesParameters = IDL.Record({
    'upToTimeNanos' : IDL.Opt(Nanos),
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
  });
  const CanisterLogRequest = IDL.Variant({
    'getMessagesInfo' : IDL.Null,
    'getMessages' : GetLogMessagesParameters,
    'getLatestMessages' : GetLatestLogMessagesParameters,
  });
  const GetInformationRequest = IDL.Record({
    'status' : IDL.Opt(StatusRequest),
    'metrics' : IDL.Opt(MetricsRequest),
    'logs' : IDL.Opt(CanisterLogRequest),
    'version' : IDL.Bool,
  });
  const StatusResponse = IDL.Record({
    'memory_size' : IDL.Opt(IDL.Nat64),
    'cycles' : IDL.Opt(IDL.Nat64),
    'heap_memory_size' : IDL.Opt(IDL.Nat64),
  });
  const UpdateCallsAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterHeapMemoryAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterCyclesAggregatedData = IDL.Vec(IDL.Nat64);
  const CanisterMemoryAggregatedData = IDL.Vec(IDL.Nat64);
  const HourlyMetricsData = IDL.Record({
    'updateCalls' : UpdateCallsAggregatedData,
    'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
    'canisterCycles' : CanisterCyclesAggregatedData,
    'canisterMemorySize' : CanisterMemoryAggregatedData,
    'timeMillis' : IDL.Int,
  });
  const NumericEntity = IDL.Record({
    'avg' : IDL.Nat64,
    'max' : IDL.Nat64,
    'min' : IDL.Nat64,
    'first' : IDL.Nat64,
    'last' : IDL.Nat64,
  });
  const DailyMetricsData = IDL.Record({
    'updateCalls' : IDL.Nat64,
    'canisterHeapMemorySize' : NumericEntity,
    'canisterCycles' : NumericEntity,
    'canisterMemorySize' : NumericEntity,
    'timeMillis' : IDL.Int,
  });
  const CanisterMetricsData = IDL.Variant({
    'hourly' : IDL.Vec(HourlyMetricsData),
    'daily' : IDL.Vec(DailyMetricsData),
  });
  const CanisterMetrics = IDL.Record({ 'data' : CanisterMetricsData });
  const MetricsResponse = IDL.Record({ 'metrics' : IDL.Opt(CanisterMetrics) });
  const CanisterLogFeature = IDL.Variant({
    'filterMessageByContains' : IDL.Null,
    'filterMessageByRegex' : IDL.Null,
  });
  const CanisterLogMessagesInfo = IDL.Record({
    'features' : IDL.Vec(IDL.Opt(CanisterLogFeature)),
    'lastTimeNanos' : IDL.Opt(Nanos),
    'count' : IDL.Nat32,
    'firstTimeNanos' : IDL.Opt(Nanos),
  });
  const LogMessagesData = IDL.Record({
    'timeNanos' : Nanos,
    'message' : IDL.Text,
  });
  const CanisterLogMessages = IDL.Record({
    'data' : IDL.Vec(LogMessagesData),
    'lastAnalyzedMessageTimeNanos' : IDL.Opt(Nanos),
  });
  const CanisterLogResponse = IDL.Variant({
    'messagesInfo' : CanisterLogMessagesInfo,
    'messages' : CanisterLogMessages,
  });
  const GetInformationResponse = IDL.Record({
    'status' : IDL.Opt(StatusResponse),
    'metrics' : IDL.Opt(MetricsResponse),
    'logs' : IDL.Opt(CanisterLogResponse),
    'version' : IDL.Opt(IDL.Nat),
  });
  const Result_1 = IDL.Variant({
    'ok' : EventMetadataResponsePayload,
    'err' : IDL.Vec(IDL.Text),
  });
  const GetFileOutputType = IDL.Opt(
    IDL.Record({
      'fileData' : IDL.Vec(IDL.Nat8),
      'fileName' : IDL.Text,
      'fileSize' : IDL.Nat64,
      'fileType' : IDL.Text,
      'fileId' : IDL.Text,
    })
  );
  const UserPayload = IDL.Record({
    'bio' : IDL.Text,
    'categories' : IDL.Vec(IDL.Text),
    'timezone' : IDL.Text,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'username' : IDL.Text,
    'introduction_video_link' : IDL.Text,
    'canister_id' : IDL.Principal,
    'email' : IDL.Text,
    'principal_id' : IDL.Principal,
    'profilepic' : IDL.Text,
    'coverphoto' : IDL.Text,
    'lastname' : IDL.Text,
  });
  const EventUserResponsePayload = IDL.Record({
    'bio' : IDL.Text,
    'categories' : IDL.Vec(IDL.Text),
    'timezone' : IDL.Text,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'username' : IDL.Text,
    'introduction_video_link' : IDL.Text,
    'canister_id' : IDL.Text,
    'email' : IDL.Text,
    'principal_id' : IDL.Text,
    'profilepic' : IDL.Text,
    'coverphoto' : IDL.Text,
    'lastname' : IDL.Text,
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'certificate_version' : IDL.Opt(IDL.Nat16),
  });
  const StreamingCallbackToken = IDL.Record({
    'file_size' : IDL.Nat64,
    'index' : IDL.Nat64,
    'chunk_size' : IDL.Nat64,
    'file_id' : IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackHttpResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const RelationalExpressionAttributeDataValue = IDL.Variant({
    'int' : IDL.Int,
    'nat' : IDL.Nat,
    'float' : IDL.Float64,
    'principal' : IDL.Principal,
    'blob' : IDL.Vec(IDL.Nat8),
    'bool' : IDL.Bool,
    'char' : IDL.Nat32,
    'int8' : IDL.Int8,
    'nat8' : IDL.Nat8,
    'text' : IDL.Text,
    'nat16' : IDL.Nat16,
    'nat32' : IDL.Nat32,
    'nat64' : IDL.Nat64,
    'int16' : IDL.Int16,
    'int32' : IDL.Int32,
    'int64' : IDL.Int64,
  });
  const ContaintmentExpressionAttributeDataValue = IDL.Variant({
    'char' : IDL.Nat32,
    'list' : IDL.Vec(
      IDL.Variant({
        'int' : IDL.Int,
        'nat' : IDL.Nat,
        'float' : IDL.Float64,
        'char' : IDL.Nat32,
        'int8' : IDL.Int8,
        'nat8' : IDL.Nat8,
        'text' : IDL.Text,
        'nat16' : IDL.Nat16,
        'nat32' : IDL.Nat32,
        'nat64' : IDL.Nat64,
        'int16' : IDL.Int16,
        'int32' : IDL.Int32,
        'int64' : IDL.Int64,
      })
    ),
    'text' : IDL.Text,
  });
  const StringAttributeDataValue = IDL.Variant({
    'char' : IDL.Nat32,
    'text' : IDL.Text,
  });
  const FilterExpressionConditionType = IDL.Variant({
    'EQ' : RelationalExpressionAttributeDataValue,
    'GT' : RelationalExpressionAttributeDataValue,
    'IN' : IDL.Vec(RelationalExpressionAttributeDataValue),
    'LT' : RelationalExpressionAttributeDataValue,
    'GTE' : RelationalExpressionAttributeDataValue,
    'LTE' : RelationalExpressionAttributeDataValue,
    'NEQ' : RelationalExpressionAttributeDataValue,
    'NOT_EXISTS' : IDL.Null,
    'EXISTS' : IDL.Null,
    'CONTAINS' : ContaintmentExpressionAttributeDataValue,
    'BEGINS_WITH' : StringAttributeDataValue,
    'NOT_CONTAINS' : ContaintmentExpressionAttributeDataValue,
    'BETWEEN' : IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ),
    'NOT_BETWEEN' : IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue,
    ),
  });
  const FilterExpressionType = IDL.Record({
    'filterExpressionCondition' : FilterExpressionConditionType,
    'attributeNames' : IDL.Text,
  });
  QueryFilter.fill(
    IDL.Variant({
      'OR' : IDL.Vec(QueryFilter),
      'AND' : IDL.Vec(QueryFilter),
      'expression' : FilterExpressionType,
    })
  );
  const QueryPlan = IDL.Variant({
    'IndexScan' : IDL.Record({
      'indexName' : IDL.Text,
      'scanBounds' : IDL.Record({ 'lower' : IDL.Text, 'upper' : IDL.Text }),
      'remainingFilter' : QueryFilter,
    }),
    'FullTableScan' : IDL.Record({ 'filter' : QueryFilter }),
  });
  const PaginatedScanCursor = IDL.Record({
    'plan' : QueryPlan,
    'lastId' : IDL.Text,
  });
  const PaginatedScanInputType = IDL.Record({
    'cursor' : IDL.Opt(PaginatedScanCursor),
    'limit' : IDL.Nat,
    'filter' : QueryFilter,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const GetDatabasesInputType = IDL.Record({});
  const GetItemByIdInputType = IDL.Record({
    'id' : IDL.Text,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const GetTableMetadataInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const ScanAndGetIdsInputType = IDL.Record({
    'filter' : QueryFilter,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const BatchGetItemByIdInputType = IDL.Record({
    'ids' : IDL.Vec(IDL.Text),
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const ScanInputType = IDL.Record({
    'filter' : QueryFilter,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const GetItemCountInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const QueryOpsInputType = IDL.Variant({
    'PaginatedScanInput' : PaginatedScanInputType,
    'GetDatabasesInput' : GetDatabasesInputType,
    'GetItemByIdInput' : GetItemByIdInputType,
    'GetTableMetadataInput' : GetTableMetadataInputType,
    'ScanAndGetIdsInput' : ScanAndGetIdsInputType,
    'BatchGetItemByIdInput' : BatchGetItemByIdInputType,
    'ScanInput' : ScanInputType,
    'GetItemCountInput' : GetItemCountInputType,
  });
  const AttributeName = IDL.Text;
  const AttributeDataType = IDL.Variant({
    'int' : IDL.Null,
    'map' : IDL.Null,
    'nat' : IDL.Null,
    'float' : IDL.Null,
    'principal' : IDL.Null,
    'blob' : IDL.Null,
    'bool' : IDL.Null,
    'char' : IDL.Null,
    'int8' : IDL.Null,
    'list' : IDL.Null,
    'nat8' : IDL.Null,
    'text' : IDL.Null,
    'nat16' : IDL.Null,
    'nat32' : IDL.Null,
    'nat64' : IDL.Null,
    'default' : IDL.Null,
    'int16' : IDL.Null,
    'int32' : IDL.Null,
    'int64' : IDL.Null,
  });
  const AttributeDataValue = IDL.Variant({
    'int' : IDL.Int,
    'map' : IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          'int' : IDL.Int,
          'nat' : IDL.Nat,
          'float' : IDL.Float64,
          'char' : IDL.Nat32,
          'int8' : IDL.Int8,
          'list' : IDL.Vec(
            IDL.Variant({
              'int' : IDL.Int,
              'nat' : IDL.Nat,
              'float' : IDL.Float64,
              'char' : IDL.Nat32,
              'int8' : IDL.Int8,
              'nat8' : IDL.Nat8,
              'text' : IDL.Text,
              'nat16' : IDL.Nat16,
              'nat32' : IDL.Nat32,
              'nat64' : IDL.Nat64,
              'int16' : IDL.Int16,
              'int32' : IDL.Int32,
              'int64' : IDL.Int64,
            })
          ),
          'nat8' : IDL.Nat8,
          'text' : IDL.Text,
          'nat16' : IDL.Nat16,
          'nat32' : IDL.Nat32,
          'nat64' : IDL.Nat64,
          'int16' : IDL.Int16,
          'int32' : IDL.Int32,
          'int64' : IDL.Int64,
        }),
      )
    ),
    'nat' : IDL.Nat,
    'float' : IDL.Float64,
    'principal' : IDL.Principal,
    'blob' : IDL.Vec(IDL.Nat8),
    'bool' : IDL.Bool,
    'char' : IDL.Nat32,
    'int8' : IDL.Int8,
    'list' : IDL.Vec(
      IDL.Variant({
        'int' : IDL.Int,
        'nat' : IDL.Nat,
        'float' : IDL.Float64,
        'char' : IDL.Nat32,
        'int8' : IDL.Int8,
        'nat8' : IDL.Nat8,
        'text' : IDL.Text,
        'nat16' : IDL.Nat16,
        'nat32' : IDL.Nat32,
        'nat64' : IDL.Nat64,
        'int16' : IDL.Int16,
        'int32' : IDL.Int32,
        'int64' : IDL.Int64,
      })
    ),
    'nat8' : IDL.Nat8,
    'text' : IDL.Text,
    'nat16' : IDL.Nat16,
    'nat32' : IDL.Nat32,
    'nat64' : IDL.Nat64,
    'default' : IDL.Null,
    'int16' : IDL.Int16,
    'int32' : IDL.Int32,
    'int64' : IDL.Int64,
  });
  const AttributeMetadata = IDL.Record({
    'name' : AttributeName,
    'unique' : IDL.Bool,
    'dataType' : AttributeDataType,
    'required' : IDL.Bool,
    'defaultValue' : AttributeDataValue,
  });
  const IndexName = IDL.Text;
  const TableIndexMetadata = IDL.Record({
    'name' : IndexName,
    'unique' : IDL.Bool,
    'attributeNames' : IDL.Vec(AttributeName),
  });
  const TableMetadataOutputType = IDL.Record({
    'attributes' : IDL.Vec(AttributeMetadata),
    'indexes' : IDL.Vec(TableIndexMetadata),
  });
  const GetTableMetadataOutputType = IDL.Opt(
    IDL.Record({
      'metadata' : TableMetadataOutputType,
      'databaseName' : IDL.Text,
      'tableName' : IDL.Text,
    })
  );
  const ItemOutputType = IDL.Record({
    'id' : IDL.Text,
    'item' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
  });
  const PaginatedScanOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'hasMore' : IDL.Bool,
      'limit' : IDL.Nat,
      'items' : IDL.Vec(ItemOutputType),
      'nextCursor' : IDL.Opt(PaginatedScanCursor),
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const ScanAndGetIdsOutputType = IDL.Variant({
    'ok' : IDL.Record({ 'ids' : IDL.Vec(IDL.Text) }),
    'err' : IDL.Vec(IDL.Text),
  });
  const GetDatabasesOutputType = IDL.Record({
    'databases' : IDL.Vec(
      IDL.Record({ 'name' : IDL.Text, 'tables' : IDL.Vec(IDL.Text) })
    ),
  });
  const GetItemCountOutputType = IDL.Variant({
    'ok' : IDL.Record({ 'count' : IDL.Nat }),
    'err' : IDL.Vec(IDL.Text),
  });
  const GetItemByIdOutputType = IDL.Variant({
    'ok' : ItemOutputType,
    'err' : IDL.Vec(IDL.Text),
  });
  const BatchGetItemByIdOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'notFoundIds' : IDL.Vec(IDL.Text),
      'items' : IDL.Vec(ItemOutputType),
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const ScanOutputType = IDL.Variant({
    'ok' : IDL.Vec(
      IDL.Record({
        'id' : IDL.Text,
        'item' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
      })
    ),
    'err' : IDL.Vec(IDL.Text),
  });
  const QueryOpsOutputType = IDL.Variant({
    'GetTableMetadataOutput' : GetTableMetadataOutputType,
    'PaginatedScanOutput' : PaginatedScanOutputType,
    'ScanAndGetIdsOutput' : ScanAndGetIdsOutputType,
    'GetDatabasesOutput' : GetDatabasesOutputType,
    'GetItemCountOutput' : GetItemCountOutputType,
    'GetItemByIdOutput' : GetItemByIdOutputType,
    'BatchGetItemByIdOutput' : BatchGetItemByIdOutputType,
    'ScanOutput' : ScanOutputType,
  });
  const StoreFileInputType = IDL.Record({
    'fileName' : IDL.Text,
    'fileType' : IDL.Text,
    'fileDataObject' : IDL.Vec(IDL.Nat8),
  });
  const CollectMetricsRequestType = IDL.Variant({
    'force' : IDL.Null,
    'normal' : IDL.Null,
  });
  const UpdateInformationRequest = IDL.Record({
    'metrics' : IDL.Opt(CollectMetricsRequestType),
  });
  const UpdateEventMetadataPayload = IDL.Record({
    'status' : EventStatus,
    'calendar_id' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'end_date' : IDL.Opt(IDL.Nat),
    'created_by' : IDL.Opt(IDL.Principal),
    'start_date' : IDL.Opt(IDL.Nat),
    'event_id' : IDL.Text,
  });
  const AttendeeEventMetadataRequestPayload = IDL.Record({
    'status' : EventStatus,
    'calendar_id' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'end_date' : IDL.Opt(IDL.Nat),
    'created_by' : IDL.Opt(IDL.Principal),
    'start_date' : IDL.Opt(IDL.Nat),
    'event_id' : IDL.Text,
  });
  const DeleteTableInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const DeleteDatabaseInputType = IDL.Record({ 'name' : IDL.Text });
  const DropAttributeInputType = IDL.Record({
    'attributeName' : IDL.Text,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const DeleteItemInputType = IDL.Record({
    'id' : IDL.Text,
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
  });
  const UpdateItemInputType = IDL.Record({
    'id' : IDL.Text,
    'databaseName' : IDL.Text,
    'attributeDataValues' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
    'tableName' : IDL.Text,
  });
  const CreateDatabaseInputType = IDL.Record({ 'name' : IDL.Text });
  const CreateTableInputType = IDL.Record({
    'name' : IDL.Text,
    'databaseName' : IDL.Text,
    'attributes' : IDL.Vec(AttributeMetadata),
    'indexes' : IDL.Vec(TableIndexMetadata),
  });
  const CreateItemInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'attributeDataValues' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
    'tableName' : IDL.Text,
  });
  const AddAttributeInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
    'attribute' : AttributeMetadata,
  });
  const CreateIndexInputType = IDL.Record({
    'databaseName' : IDL.Text,
    'tableName' : IDL.Text,
    'index' : TableIndexMetadata,
  });
  const UpdateOpsInputType = IDL.Variant({
    'DeleteTableInput' : DeleteTableInputType,
    'DeleteDatabaseInput' : DeleteDatabaseInputType,
    'DropAttributeInput' : DropAttributeInputType,
    'DeleteItemInput' : DeleteItemInputType,
    'UpdateItemInput' : UpdateItemInputType,
    'CreateDatabaseInput' : CreateDatabaseInputType,
    'CreateTableInput' : CreateTableInputType,
    'CreateItemInput' : CreateItemInputType,
    'AddAttributeInput' : AddAttributeInputType,
    'CreateIndexInput' : CreateIndexInputType,
  });
  const AddAttributeOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'databaseName' : IDL.Text,
      'attributeNames' : IDL.Text,
      'tableName' : IDL.Text,
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const CreateIndexOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'indexName' : IDL.Text,
      'databaseName' : IDL.Text,
      'tableName' : IDL.Text,
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const DeleteTableOutputType = IDL.Variant({
    'ok' : IDL.Record({}),
    'err' : IDL.Vec(IDL.Text),
  });
  const CreateItemOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'id' : IDL.Text,
      'item' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const DeleteDatabaseOutputType = IDL.Variant({
    'ok' : IDL.Record({}),
    'err' : IDL.Vec(IDL.Text),
  });
  const UpdateItemOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'id' : IDL.Text,
      'item' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const CreateDatabaseOutputType = IDL.Variant({
    'ok' : IDL.Record({}),
    'err' : IDL.Vec(IDL.Text),
  });
  const CreateTableOutputType = IDL.Variant({
    'ok' : IDL.Record({}),
    'err' : IDL.Vec(IDL.Text),
  });
  const DropAttributeOutputType = IDL.Variant({
    'ok' : IDL.Record({
      'databaseName' : IDL.Text,
      'attributeNames' : IDL.Text,
      'tableName' : IDL.Text,
    }),
    'err' : IDL.Vec(IDL.Text),
  });
  const DeleteItemOutputType = IDL.Variant({
    'ok' : IDL.Record({}),
    'err' : IDL.Vec(IDL.Text),
  });
  const UpdateOpsOutputType = IDL.Variant({
    'AddAttributeOutput' : AddAttributeOutputType,
    'CreateIndexOutput' : CreateIndexOutputType,
    'DeleteTableOutput' : DeleteTableOutputType,
    'CreateItemOutput' : CreateItemOutputType,
    'DeleteDatabaseOutput' : DeleteDatabaseOutputType,
    'UpdateItemOutput' : UpdateItemOutputType,
    'CreateDatabaseOutput' : CreateDatabaseOutputType,
    'CreateTableOutput' : CreateTableOutputType,
    'DropAttributeOutput' : DropAttributeOutputType,
    'DeleteItemOutput' : DeleteItemOutputType,
  });
  const CalendarRequestPayload = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const UserRequestPayload = IDL.Record({
    'bio' : IDL.Opt(IDL.Text),
    'categories' : IDL.Opt(IDL.Vec(IDL.Text)),
    'timezone' : IDL.Text,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'username' : IDL.Text,
    'introduction_video_link' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'principal_id' : IDL.Opt(IDL.Text),
    'profilepic' : IDL.Opt(IDL.Text),
    'coverphoto' : IDL.Opt(IDL.Text),
    'lastname' : IDL.Text,
  });
  return IDL.Service({
    'approveCycleWithdrawal' : IDL.Func([IDL.Nat], [], []),
    'createEventMetaData' : IDL.Func(
        [CreateEventMetadataPayload],
        [Result],
        [],
      ),
    'fetchCanisterStatus' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [CanisterStatus],
        [],
      ),
    'generateSchema' : IDL.Func([], [IDL.Text], []),
    'getAllEventsMetadata' : IDL.Func([], [Result_2], ['query']),
    'getCalendarId' : IDL.Func([], [IDL.Text], ['query']),
    'getCanistergeekInformation' : IDL.Func(
        [GetInformationRequest],
        [GetInformationResponse],
        ['query'],
      ),
    'getEventMetaDataFromStartToEndDate' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Vec(IDL.Text)],
        [Result_2],
        ['query'],
      ),
    'getEventMetadataById' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getEventMetadataId' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        ['query'],
      ),
    'getFile' : IDL.Func([IDL.Text], [GetFileOutputType], ['query']),
    'getUser' : IDL.Func([], [IDL.Opt(UserPayload)], ['query']),
    'getUserForEventCanister' : IDL.Func(
        [IDL.Text],
        [EventUserResponsePayload],
        ['query'],
      ),
    'get_trusted_origins' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_streaming_callback' : IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'icrc28_trusted_origins' : IDL.Func(
        [],
        [IDL.Record({ 'trusted_origins' : IDL.Vec(IDL.Text) })],
        ['query'],
      ),
    'queryOperation' : IDL.Func(
        [IDL.Record({ 'queryOpsInput' : QueryOpsInputType })],
        [QueryOpsOutputType],
        ['query'],
      ),
    'removeCalendarEvent' : IDL.Func([IDL.Text], [Result], []),
    'saveFile' : IDL.Func([StoreFileInputType], [IDL.Text], []),
    'updateCanistergeekInformation' : IDL.Func(
        [UpdateInformationRequest],
        [],
        [],
      ),
    'updateEventMetaData' : IDL.Func(
        [IDL.Text, UpdateEventMetadataPayload],
        [Result],
        [],
      ),
    'updateEventMetadataForAttendee' : IDL.Func(
        [
          IDL.Record({
            'eventId' : IDL.Text,
            'eventMetadataPayload' : AttendeeEventMetadataRequestPayload,
          }),
        ],
        [Result],
        [],
      ),
    'updateOperation' : IDL.Func(
        [IDL.Record({ 'updateOpsInput' : UpdateOpsInputType })],
        [UpdateOpsOutputType],
        [],
      ),
    'upsertCalendarData' : IDL.Func(
        [IDL.Text, CalendarRequestPayload],
        [IDL.Text],
        [],
      ),
    'upsertUser' : IDL.Func([UserRequestPayload], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };