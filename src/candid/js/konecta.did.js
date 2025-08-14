export const idlFactory = ({ IDL }) => {
  const QueryFilter = IDL.Rec();
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const ApplyToServiceRequestPayload = IDL.Record({
    'note' : IDL.Text,
    'event_id' : IDL.Text,
    'location' : IDL.Text,
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
  const Result_17 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
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
  const TransactionResponsePayload = IDL.Record({
    'fee' : IDL.Nat,
    'transaction_id' : IDL.Text,
    'beneficiary_user_id' : IDL.Text,
    'transferred_to_type' : IDL.Text,
    'block_index' : IDL.Nat,
    'memo' : IDL.Vec(IDL.Nat8),
    'source_account_id_hex' : IDL.Text,
    'narration' : IDL.Text,
    'remitter_user_id' : IDL.Text,
    'event_id' : IDL.Text,
    'created_at_time' : IDL.Nat64,
    'destination_account_id_hex' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const PaginatedTransactionResponsePayload = IDL.Record({
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'nonScannedItemCount' : IDL.Int,
    'items' : IDL.Vec(TransactionResponsePayload),
    'totalRecords' : IDL.Nat,
    'scannedItemCount' : IDL.Int,
  });
  const Result_16 = IDL.Variant({
    'ok' : PaginatedTransactionResponsePayload,
    'err' : IDL.Text,
  });
  const TransactionUser = IDL.Record({
    'firstname' : IDL.Text,
    'username' : IDL.Text,
    'email' : IDL.Text,
    'lastname' : IDL.Text,
  });
  const FeedResponsePayloadWithoutUser = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'status' : IDL.Text,
    'token_amount' : IDL.Float64,
    'price_token' : IDL.Text,
    'interests' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'recording_visibility' : IDL.Text,
    'description' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Text,
    'consultations' : IDL.Vec(IDL.Text),
    'language' : IDL.Text,
    'start_date' : IDL.Nat,
    'expertise' : IDL.Text,
    'konectaMetadata' : IDL.Vec(
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
    'showcase_link' : IDL.Text,
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'konecta_event_id' : IDL.Text,
    'event_id' : IDL.Text,
    'is_recording_available' : IDL.Bool,
    'location' : IDL.Text,
    'event_type' : IDL.Text,
    'coverphoto' : IDL.Text,
    'participation_type' : IDL.Text,
    'eventMetadata' : IDL.Vec(
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
  });
  const TransactionWithUserDataResponse = IDL.Record({
    'fee' : IDL.Nat,
    'url' : IDL.Text,
    'transaction_id' : IDL.Text,
    'beneficiary_user_id' : IDL.Text,
    'transferred_to_type' : IDL.Text,
    'block_index' : IDL.Nat,
    'beneficiary_user_data' : IDL.Opt(TransactionUser),
    'memo' : IDL.Vec(IDL.Nat8),
    'source_account_id_hex' : IDL.Text,
    'narration' : IDL.Text,
    'remitter_user_id' : IDL.Text,
    'event_id' : IDL.Text,
    'created_at_time' : IDL.Nat64,
    'destination_account_id_hex' : IDL.Text,
    'amount' : IDL.Nat,
    'eventData' : FeedResponsePayloadWithoutUser,
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
  const PaginatedTransactionWithUserDataResponse = IDL.Record({
    'hasMore' : IDL.Bool,
    'items' : IDL.Vec(TransactionWithUserDataResponse),
    'totalRecords' : IDL.Nat,
    'nextCursor' : IDL.Opt(PaginatedScanCursor),
  });
  const Result_5 = IDL.Variant({
    'ok' : PaginatedTransactionWithUserDataResponse,
    'err' : IDL.Vec(IDL.Text),
  });
  const Result_15 = IDL.Variant({
    'ok' : IDL.Vec(TransactionResponsePayload),
    'err' : IDL.Text,
  });
  const UserResponsePayload = IDL.Record({
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
  const ApplicantDetailsPayload = IDL.Record({
    'userData' : UserResponsePayload,
    'applicationStatus' : IDL.Text,
    'applicationTimestamp' : IDL.Nat,
    'applicationMetadata' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Text, StringAttributeDataValue))
    ),
  });
  const ApplicationStatusOfMyCreatedEvents = IDL.Record({
    'event_description' : IDL.Text,
    'event_id' : IDL.Text,
    'applied_users_details' : IDL.Vec(ApplicantDetailsPayload),
    'event_name' : IDL.Text,
  });
  const PaginatedApplicationStatusOfMyCreatedEvents = IDL.Record({
    'hasMore' : IDL.Bool,
    'items' : IDL.Vec(ApplicationStatusOfMyCreatedEvents),
    'totalRecords' : IDL.Nat,
    'nextCursor' : IDL.Opt(PaginatedScanCursor),
  });
  const Result_7 = IDL.Variant({
    'ok' : PaginatedApplicationStatusOfMyCreatedEvents,
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
  const UserFeedbackResponsePayload = IDL.Record({
    'id' : IDL.Text,
    'timezone' : IDL.Text,
    'recording_link' : IDL.Text,
    'firstname' : IDL.Text,
    'user_type' : IDL.Text,
    'username' : IDL.Text,
    'user_id' : IDL.Text,
    'email' : IDL.Text,
    'rating' : IDL.Nat,
    'event_id' : IDL.Text,
    'successful' : IDL.Text,
    'lastname' : IDL.Text,
    'reason' : IDL.Text,
  });
  const Result_14 = IDL.Variant({
    'ok' : UserFeedbackResponsePayload,
    'err' : IDL.Vec(IDL.Text),
  });
  const EventCompletionResponsePayload = IDL.Record({
    'id' : IDL.Text,
    'to' : IDL.Text,
    'user_type' : IDL.Text,
    'from' : IDL.Text,
    'template_name' : IDL.Text,
    'user_id' : IDL.Text,
    'notification_type' : IDL.Text,
    'event_id' : IDL.Text,
    'message_id' : IDL.Text,
    'idempotency_key' : IDL.Text,
    'recipient_type' : IDL.Text,
  });
  const Result_13 = IDL.Variant({
    'ok' : IDL.Vec(EventCompletionResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const ExpertFeedbackResponsePayload = IDL.Record({
    'agreeWithUserFeedback' : IDL.Text,
    'remitter_feedback_missing' : IDL.Bool,
    'transfer_or_refund' : IDL.Text,
    'user_id' : IDL.Text,
    'user_feedback' : IDL.Opt(UserFeedbackResponsePayload),
    'event_id' : IDL.Text,
    'event_recording_link' : IDL.Text,
    'reason' : IDL.Text,
    'user_feedback_id' : IDL.Text,
  });
  const Result_12 = IDL.Variant({
    'ok' : IDL.Vec(ExpertFeedbackResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const FeedResponsePayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'userData' : UserResponsePayload,
    'status' : IDL.Text,
    'token_amount' : IDL.Float64,
    'price_token' : IDL.Text,
    'interests' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'recording_visibility' : IDL.Text,
    'description' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Text,
    'consultations' : IDL.Vec(IDL.Text),
    'language' : IDL.Text,
    'start_date' : IDL.Nat,
    'expertise' : IDL.Text,
    'konectaMetadata' : IDL.Vec(
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
    'showcase_link' : IDL.Text,
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'konecta_event_id' : IDL.Text,
    'event_id' : IDL.Text,
    'is_recording_available' : IDL.Bool,
    'location' : IDL.Text,
    'event_type' : IDL.Text,
    'coverphoto' : IDL.Text,
    'participation_type' : IDL.Text,
    'eventMetadata' : IDL.Vec(
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
  });
  const Result_11 = IDL.Variant({
    'ok' : IDL.Vec(FeedResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const UserActionEmailResponse = IDL.Record({
    'to' : IDL.Text,
    'action' : IDL.Text,
    'to_user_id' : IDL.Text,
    'from' : IDL.Text,
    'template_name' : IDL.Text,
    'from_user_id' : IDL.Text,
    'timestamp' : IDL.Nat,
    'event_id' : IDL.Text,
    'message_id' : IDL.Text,
    'idempotency_key' : IDL.Text,
  });
  const Result_10 = IDL.Variant({
    'ok' : IDL.Vec(UserActionEmailResponse),
    'err' : IDL.Vec(IDL.Text),
  });
  const ForwardToExpertResponsePayload = IDL.Record({
    'id' : IDL.Text,
    'to' : IDL.Text,
    'from' : IDL.Text,
    'template_name' : IDL.Text,
    'event_id' : IDL.Text,
    'message_id' : IDL.Text,
    'idempotency_key' : IDL.Text,
    'user_feedback_id' : IDL.Text,
  });
  const Result_9 = IDL.Variant({
    'ok' : IDL.Vec(ForwardToExpertResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Vec(UserFeedbackResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const MissingFeedbackEvent = IDL.Record({
    'name' : IDL.Text,
    'end_date' : IDL.Nat,
    'start_date' : IDL.Nat,
    'event_id' : IDL.Text,
  });
  const PaginatedFeedResponsePayload = IDL.Record({
    'hasMore' : IDL.Bool,
    'items' : IDL.Vec(FeedResponsePayload),
    'totalRecords' : IDL.Nat,
    'nextCursor' : IDL.Opt(PaginatedScanCursor),
  });
  const Result_6 = IDL.Variant({
    'ok' : PaginatedFeedResponsePayload,
    'err' : IDL.Vec(IDL.Text),
  });
  const FeedbackActions = IDL.Variant({ 'No' : IDL.Null, 'Yes' : IDL.Null });
  const MoneyTransferActions = IDL.Variant({
    'RefundToRemitter' : IDL.Null,
    'TransferToBeneficiary' : IDL.Null,
  });
  const ExpertFeedbackRequestPayload = IDL.Record({
    'agreeWithUserFeedback' : IDL.Opt(FeedbackActions),
    'remitter_feedback_missing' : IDL.Bool,
    'transfer_or_refund' : IDL.Opt(MoneyTransferActions),
    'user_id' : IDL.Opt(IDL.Text),
    'event_id' : IDL.Text,
    'event_recording_link' : IDL.Opt(IDL.Text),
    'reason' : IDL.Opt(IDL.Text),
    'user_feedback_id' : IDL.Opt(IDL.Text),
  });
  const UserFeedbackRequestPayload = IDL.Record({
    'timezone' : IDL.Text,
    'recording_link' : IDL.Opt(IDL.Text),
    'firstname' : IDL.Text,
    'username' : IDL.Text,
    'email' : IDL.Text,
    'rating' : IDL.Opt(IDL.Nat),
    'event_id' : IDL.Text,
    'successful' : FeedbackActions,
    'lastname' : IDL.Text,
    'reason' : IDL.Opt(IDL.Text),
  });
  const EventResponsePayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'status' : IDL.Text,
    'token_amount' : IDL.Float64,
    'price_token' : IDL.Text,
    'interests' : IDL.Vec(IDL.Text),
    'metadata' : IDL.Vec(
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
    'event_description' : IDL.Text,
    'recording_visibility' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Text,
    'consultations' : IDL.Vec(IDL.Text),
    'start_date' : IDL.Nat,
    'expertise' : IDL.Text,
    'showcase_link' : IDL.Text,
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'konecta_event_id' : IDL.Text,
    'event_id' : IDL.Text,
    'is_recording_available' : IDL.Bool,
    'event_name' : IDL.Text,
    'event_type' : IDL.Text,
    'participation_type' : IDL.Text,
  });
  const CreateUserFeedbackResponsePayload = IDL.Record({
    'konectaEventData' : EventResponsePayload,
    'feedbackId' : IDL.Text,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(CreateUserFeedbackResponsePayload),
    'err' : IDL.Text,
  });
  const Result_3 = IDL.Variant({
    'ok' : CreateUserFeedbackResponsePayload,
    'err' : IDL.Text,
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
  const Timestamp = IDL.Nat64;
  const LedgerIcrc1TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'FetchTxHistoryError' : IDL.Record({ 'message' : IDL.Text }),
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'GetAcceptedUserError' : IDL.Record({ 'message' : IDL.Text }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : Timestamp }),
    'FetchEventDetailsError' : IDL.Record({ 'message' : IDL.Text }),
    'TooOld' : IDL.Null,
    'SendEmailError' : IDL.Record({ 'message' : IDL.Text }),
    'AddTxHistoryError' : IDL.Record({ 'message' : IDL.Text }),
    'FreeEventError' : IDL.Record({ 'message' : IDL.Text }),
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Text,
    'err' : IDL.Vec(LedgerIcrc1TransferError),
  });
  const Token = IDL.Variant({
    'ICP' : IDL.Null,
    'FREE' : IDL.Null,
    'CKBTC' : IDL.Null,
  });
  const TransferRequestPayload = IDL.Record({
    'fee' : IDL.Opt(IDL.Nat),
    'eventId' : IDL.Text,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'priceToken' : Token,
    'amount' : IDL.Nat,
  });
  const LedgerIcrc2TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'FetchTxHistoryError' : IDL.Record({ 'message' : IDL.Text }),
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : IDL.Record({ 'allowance' : IDL.Nat }),
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'CreateEventMetadataError' : IDL.Record({ 'message' : IDL.Text }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'FetchEventDetailsError' : IDL.Record({ 'message' : IDL.Text }),
    'TooOld' : IDL.Null,
    'AddTxHistoryError' : IDL.Record({ 'message' : IDL.Text }),
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Text,
    'err' : LedgerIcrc2TransferError,
  });
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponsePayload = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponsePayload,
  });
  const CollectMetricsRequestType = IDL.Variant({
    'force' : IDL.Null,
    'normal' : IDL.Null,
  });
  const UpdateInformationRequest = IDL.Record({
    'metrics' : IDL.Opt(CollectMetricsRequestType),
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
  return IDL.Service({
    'acceptUserApplication' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'applyToServiceRequest' : IDL.Func(
        [ApplyToServiceRequestPayload],
        [Result],
        [],
      ),
    'cancelKonectaEvent' : IDL.Func([IDL.Text], [Result], []),
    'checkFeedbackByUserForEvent' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(RelationalExpressionAttributeDataValue)],
        [IDL.Bool],
        ['query'],
      ),
    'checkIfUserFeedbackExistsForEvent' : IDL.Func(
        [IDL.Text],
        [Result_17],
        ['composite_query'],
      ),
    'declineServiceRequestApplication' : IDL.Func(
        [IDL.Text, IDL.Text],
        [Result],
        [],
      ),
    'eventCompletionNotificationTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'expertEmailTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'expertFeedbackTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'generateSchema' : IDL.Func([], [IDL.Text], []),
    'generateTransactionResponse' : IDL.Func(
        [Result_16],
        [Result_5],
        ['composite_query'],
      ),
    'getAllPaginatedTransactions' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_5],
        ['composite_query'],
      ),
    'getAllTransactions' : IDL.Func([], [Result_15], ['query']),
    'getApplicationStatusOfMyCreatedEvents' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_7],
        ['composite_query'],
      ),
    'getCanistergeekInformation' : IDL.Func(
        [GetInformationRequest],
        [GetInformationResponse],
        ['query'],
      ),
    'getDefaultAccountIdentifier' : IDL.Func([], [IDL.Text], ['query']),
    'getFeedbackById' : IDL.Func([IDL.Text], [Result_14], ['query']),
    'getListOfEventCompletionEmails' : IDL.Func([], [Result_13], ['query']),
    'getListOfExpertFeedbacks' : IDL.Func([], [Result_12], ['query']),
    'getListOfMissingFeedbackEvents' : IDL.Func(
        [],
        [Result_11],
        ['composite_query'],
      ),
    'getListOfUserActionEmails' : IDL.Func([], [Result_10], ['query']),
    'getListOfUserFeedbackForwardedEmailsToExpert' : IDL.Func(
        [],
        [Result_9],
        ['query'],
      ),
    'getListOfUserFeedbacks' : IDL.Func([], [Result_8], ['query']),
    'getMissingFeedbackEventArray' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [IDL.Vec(MissingFeedbackEvent)],
        ['composite_query'],
      ),
    'getMyServiceOffers' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_6],
        ['composite_query'],
      ),
    'getPaginatedApplicationStatusOfMyCreatedEvents' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_7],
        ['composite_query'],
      ),
    'getPaginatedFeed' : IDL.Func(
        [
          IDL.Record({
            'categories' : IDL.Opt(IDL.Vec(IDL.Text)),
            'status' : IDL.Opt(IDL.Text),
            'recordingType' : IDL.Opt(IDL.Vec(IDL.Bool)),
            'cursor' : IDL.Opt(PaginatedScanCursor),
            'userId' : IDL.Opt(IDL.Principal),
            'limit' : IDL.Nat,
            'currentTimestamp' : IDL.Nat,
            'isFuture' : IDL.Bool,
            'eventType' : IDL.Opt(IDL.Text),
          }),
        ],
        [Result_6],
        ['composite_query'],
      ),
    'getPaginatedJoinedOffersForMyProfile' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_6],
        ['composite_query'],
      ),
    'getPaginatedJoinedRequestsForMyProfile' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_6],
        ['composite_query'],
      ),
    'getPaginatedServiceOffersForMyProfile' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_6],
        ['composite_query'],
      ),
    'getTransactionTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'getTransactionsForEventByType' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor), IDL.Text, IDL.Text],
        [Result_5],
        ['composite_query'],
      ),
    'getTransactionsForUser' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_5],
        ['composite_query'],
      ),
    'getTransactionsForUserByType' : IDL.Func(
        [IDL.Nat, IDL.Opt(PaginatedScanCursor), IDL.Text],
        [Result_5],
        ['composite_query'],
      ),
    'getUserDetailsByCompositeQuery' : IDL.Func(
        [IDL.Text],
        [UserResponsePayload],
        ['composite_query'],
      ),
    'getUserFeedbackTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'getUserStatusForServiceOffers' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [IDL.Text],
        ['composite_query'],
      ),
    'get_trusted_origins' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'icrc28_trusted_origins' : IDL.Func(
        [],
        [IDL.Record({ 'trusted_origins' : IDL.Vec(IDL.Text) })],
        ['query'],
      ),
    'insertExpertFeedback' : IDL.Func(
        [ExpertFeedbackRequestPayload],
        [Result],
        [],
      ),
    'insertMultipleUserFeedback' : IDL.Func(
        [IDL.Vec(UserFeedbackRequestPayload)],
        [Result_4],
        [],
      ),
    'insertUserFeedback' : IDL.Func(
        [UserFeedbackRequestPayload],
        [Result_3],
        [],
      ),
    'isWhiteListUser' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'joinPublicEvent' : IDL.Func([IDL.Text], [Result], []),
    'queryOperation' : IDL.Func(
        [IDL.Record({ 'queryOpsInput' : QueryOpsInputType })],
        [QueryOpsOutputType],
        ['query'],
      ),
    'resolutionResponseTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'runMoneyTransferJob' : IDL.Func([], [Result], []),
    'sendEventCompletionEmail' : IDL.Func([], [Result], []),
    'transferAmountFromSubAccountToUserForEvent' : IDL.Func(
        [IDL.Text],
        [Result_2],
        [],
      ),
    'transferAmountFromUserToEventSubAccount' : IDL.Func(
        [TransferRequestPayload],
        [Result_1],
        [],
      ),
    'transform' : IDL.Func([TransformArgs], [HttpResponsePayload], ['query']),
    'updateCanistergeekInformation' : IDL.Func(
        [UpdateInformationRequest],
        [],
        [],
      ),
    'updateOperation' : IDL.Func(
        [IDL.Record({ 'updateOpsInput' : UpdateOpsInputType })],
        [UpdateOpsOutputType],
        [],
      ),
    'withdrawFromEvent' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };