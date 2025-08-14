export const idlFactory = ({ IDL }) => {
  const QueryFilter = IDL.Rec();
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const EventAttendeeActions = IDL.Variant({
    'Invited' : IDL.Null,
    'Applied' : IDL.Null,
    'Withdrawn' : IDL.Null,
    'Accepted' : IDL.Null,
    'Declined' : IDL.Null,
    'Joined' : IDL.Null,
  });
  const StringAttributeDataValue = IDL.Variant({
    'char' : IDL.Nat32,
    'text' : IDL.Text,
  });
  const EventAttendeeRequestPayload = IDL.Record({
    'invitee_user_id' : IDL.Principal,
    'action' : EventAttendeeActions,
    'event_status' : IDL.Text,
    'metadata' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Text, StringAttributeDataValue))
    ),
    'timestamp' : IDL.Nat,
    'event_id' : IDL.Text,
    'event_type' : IDL.Text,
    'participation_type' : IDL.Text,
  });
  const Result_9 = IDL.Variant({ 'ok' : IDL.Vec(IDL.Text), 'err' : IDL.Text });
  const EventStatus = IDL.Variant({
    'Draft' : IDL.Null,
    'Created' : IDL.Null,
    'Canceled' : IDL.Null,
  });
  const Token = IDL.Variant({
    'ICP' : IDL.Null,
    'FREE' : IDL.Null,
    'CKBTC' : IDL.Null,
  });
  const RecordingVisibility = IDL.Variant({
    'Private' : IDL.Null,
    'Public' : IDL.Null,
  });
  const EventType = IDL.Variant({ 'Request' : IDL.Null, 'Offer' : IDL.Null });
  const ParticipationType = IDL.Variant({
    'PersonToMultiplePersons' : IDL.Null,
    'PersonToPerson' : IDL.Null,
  });
  const EventRequestPayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'status' : EventStatus,
    'token_amount' : IDL.Opt(IDL.Float64),
    'price_token' : IDL.Opt(Token),
    'interests' : IDL.Opt(IDL.Vec(IDL.Text)),
    'metadata' : IDL.Opt(
      IDL.Vec(
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
      )
    ),
    'name' : IDL.Text,
    'recording_visibility' : IDL.Opt(RecordingVisibility),
    'description' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Opt(IDL.Principal),
    'consultations' : IDL.Opt(IDL.Vec(IDL.Text)),
    'language' : IDL.Opt(IDL.Text),
    'start_date' : IDL.Nat,
    'expertise' : IDL.Opt(IDL.Text),
    'showcase_link' : IDL.Opt(IDL.Text),
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'is_recording_available' : IDL.Opt(IDL.Bool),
    'location' : IDL.Text,
    'event_type' : EventType,
    'coverphoto' : IDL.Opt(
      IDL.Record({
        'fileName' : IDL.Text,
        'fileType' : IDL.Text,
        'fileDataObject' : IDL.Vec(IDL.Nat8),
      })
    ),
    'participation_type' : IDL.Opt(ParticipationType),
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
  const EventAttendeeResponsePayload = IDL.Record({
    'id' : IDL.Text,
    'invitee_user_id' : IDL.Text,
    'action' : IDL.Text,
    'event_status' : IDL.Text,
    'metadata' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Text, StringAttributeDataValue))
    ),
    'timestamp' : IDL.Nat,
    'event_id' : IDL.Text,
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Vec(EventAttendeeResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Vec(UserResponsePayload),
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
  const EventWithUserDataPayload = IDL.Record({
    'categories' : IDL.Vec(IDL.Text),
    'userData' : UserResponsePayload,
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
    'name' : IDL.Text,
    'recording_visibility' : IDL.Text,
    'description' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Text,
    'consultations' : IDL.Vec(IDL.Text),
    'language' : IDL.Text,
    'start_date' : IDL.Nat,
    'expertise' : IDL.Text,
    'showcase_link' : IDL.Text,
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'event_id' : IDL.Text,
    'is_recording_available' : IDL.Bool,
    'location' : IDL.Text,
    'event_type' : IDL.Text,
    'coverphoto' : IDL.Text,
    'participation_type' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(EventWithUserDataPayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const EventWithUserDataTupleArray = IDL.Vec(
    IDL.Tuple(IDL.Text, EventWithUserDataPayload)
  );
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
    'name' : IDL.Text,
    'recording_visibility' : IDL.Text,
    'description' : IDL.Text,
    'end_date' : IDL.Nat,
    'user_id' : IDL.Text,
    'consultations' : IDL.Vec(IDL.Text),
    'language' : IDL.Text,
    'start_date' : IDL.Nat,
    'expertise' : IDL.Text,
    'showcase_link' : IDL.Text,
    'subaccount_id_hex' : IDL.Text,
    'subaccount_id_index' : IDL.Nat,
    'event_id' : IDL.Text,
    'is_recording_available' : IDL.Bool,
    'location' : IDL.Text,
    'event_type' : IDL.Text,
    'coverphoto' : IDL.Text,
    'participation_type' : IDL.Text,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Vec(EventResponsePayload),
    'err' : IDL.Vec(IDL.Text),
  });
  const ItemOutputType = IDL.Record({
    'id' : IDL.Text,
    'item' : IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue)),
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
  const Result_5 = IDL.Variant({
    'ok' : IDL.Record({
      'items' : IDL.Vec(EventWithUserDataPayload),
      'totalRecords' : IDL.Nat,
    }),
    'err' : IDL.Vec(IDL.Text),
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
  const ProposalResponsePayload = IDL.Record({
    'proposalMetadata' : IDL.Opt(
      IDL.Vec(IDL.Tuple(IDL.Text, StringAttributeDataValue))
    ),
    'eventData' : EventWithUserDataPayload,
  });
  const PaginatedProposalsResponse = IDL.Record({
    'hasMore' : IDL.Bool,
    'items' : IDL.Vec(ProposalResponsePayload),
    'totalRecords' : IDL.Nat,
    'nextCursor' : IDL.Opt(PaginatedScanCursor),
  });
  const Result_4 = IDL.Variant({
    'ok' : PaginatedProposalsResponse,
    'err' : IDL.Vec(IDL.Text),
  });
  const PaginatedEventWithUserDataPayload = IDL.Record({
    'hasMore' : IDL.Bool,
    'items' : IDL.Vec(EventWithUserDataPayload),
    'totalRecords' : IDL.Nat,
    'nextCursor' : IDL.Opt(PaginatedScanCursor),
  });
  const Result_3 = IDL.Variant({
    'ok' : PaginatedEventWithUserDataPayload,
    'err' : IDL.Vec(IDL.Text),
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
  const CollectMetricsRequestType = IDL.Variant({
    'force' : IDL.Null,
    'normal' : IDL.Null,
  });
  const UpdateInformationRequest = IDL.Record({
    'metrics' : IDL.Opt(CollectMetricsRequestType),
  });
  const UpdateMultipleEventsPayload = IDL.Record({
    'eventId' : IDL.Text,
    'payload' : EventRequestPayload,
  });
  const UpdateMultipleEventsResponse = IDL.Record({
    'successful' : IDL.Vec(IDL.Text),
    'failed' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const WithdrawAttendeeRequestPayload = IDL.Record({
    'invitee_user_id' : IDL.Principal,
    'action' : EventAttendeeActions,
    'event_status' : IDL.Text,
    'timestamp' : IDL.Nat,
    'event_id' : IDL.Text,
    'event_type' : IDL.Text,
  });
  const Result = IDL.Variant({
    'ok' : EventWithUserDataPayload,
    'err' : IDL.Text,
  });
  return IDL.Service({
    'acceptApplication' : IDL.Func([IDL.Text, IDL.Principal], [Result_1], []),
    'addEventAttendee' : IDL.Func(
        [EventAttendeeRequestPayload],
        [Result_1],
        [],
      ),
    'cancelEvent' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text],
        [Result_9],
        [],
      ),
    'checkIfAttendeeOrAcceptedUserExistsForEvent' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'createEvent' : IDL.Func([IDL.Text, EventRequestPayload], [IDL.Text], []),
    'declineApplication' : IDL.Func([IDL.Text, IDL.Principal], [Result_1], []),
    'fetchUserData' : IDL.Func(
        [IDL.Text, IDL.Text],
        [UserResponsePayload],
        ['composite_query'],
      ),
    'generateSchema' : IDL.Func([], [IDL.Text], []),
    'getAllAttendeesIds' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'getAppliedUsersWithData' : IDL.Func(
        [IDL.Text],
        [Result_7],
        ['composite_query'],
      ),
    'getAttendeeStatusForEvent' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [IDL.Text],
        ['query'],
      ),
    'getAttendeesByActionWithUserDetails' : IDL.Func(
        [IDL.Text, EventAttendeeActions],
        [Result_7],
        ['composite_query'],
      ),
    'getAttendeesByActionWithUserDetailsAsync' : IDL.Func(
        [IDL.Text, EventAttendeeActions],
        [Result_7],
        [],
      ),
    'getCanistergeekInformation' : IDL.Func(
        [GetInformationRequest],
        [GetInformationResponse],
        ['query'],
      ),
    'getCompletedEventsForCron' : IDL.Func([IDL.Nat, IDL.Nat], [Result_2], []),
    'getEventArrayFromEventIdArray' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [EventWithUserDataTupleArray],
        ['composite_query'],
      ),
    'getEventDetailsWithUserData' : IDL.Func(
        [IDL.Text],
        [EventWithUserDataPayload],
        ['composite_query'],
      ),
    'getEventDetailsWithUserDataAsync' : IDL.Func(
        [IDL.Text],
        [EventWithUserDataPayload],
        [],
      ),
    'getEventTableMetadata' : IDL.Func(
        [],
        [GetTableMetadataOutputType],
        ['query'],
      ),
    'getEventsForAttendeeWithEventData' : IDL.Func(
        [IDL.Text],
        [Result_6],
        ['query'],
      ),
    'getEventsWithUserData' : IDL.Func(
        [IDL.Vec(ItemOutputType)],
        [IDL.Vec(EventWithUserDataPayload)],
        ['composite_query'],
      ),
    'getFile' : IDL.Func([IDL.Text], [GetFileOutputType], ['query']),
    'getFilteredEvents' : IDL.Func(
        [
          IDL.Record({
            'categories' : IDL.Opt(IDL.Vec(IDL.Text)),
            'status' : IDL.Opt(IDL.Text),
            'recordingType' : IDL.Opt(IDL.Vec(IDL.Bool)),
            'userId' : IDL.Opt(IDL.Principal),
            'offset' : IDL.Nat,
            'limit' : IDL.Nat,
            'currentTimestamp' : IDL.Nat,
            'isFuture' : IDL.Bool,
            'eventType' : IDL.Opt(IDL.Text),
          }),
        ],
        [Result_5],
        ['composite_query'],
      ),
    'getMyPaginatedProposals' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_4],
        ['composite_query'],
      ),
    'getMyProposals' : IDL.Func(
        [IDL.Principal],
        [Result_2],
        ['composite_query'],
      ),
    'getPaginatedEventsForAttendee' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Opt(PaginatedScanCursor)],
        [Result_3],
        ['composite_query'],
      ),
    'getPaginatedFilteredEvents' : IDL.Func(
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
        [Result_3],
        ['composite_query'],
      ),
    'getServiceRequestsForUser' : IDL.Func(
        [IDL.Principal],
        [Result_2],
        ['composite_query'],
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
    'isWhiteListUser' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'updateCanistergeekInformation' : IDL.Func(
        [UpdateInformationRequest],
        [],
        [],
      ),
    'updateEvent' : IDL.Func(
        [IDL.Text, IDL.Text, EventRequestPayload],
        [Result_1],
        [],
      ),
    'updateEventAttendeeStatus' : IDL.Func(
        [IDL.Text, IDL.Principal, EventAttendeeActions, EventAttendeeActions],
        [Result_1],
        [],
      ),
    'updateMultipleEvents' : IDL.Func(
        [IDL.Text, IDL.Vec(UpdateMultipleEventsPayload)],
        [UpdateMultipleEventsResponse],
        [],
      ),
    'withdrawEventAttendee' : IDL.Func(
        [WithdrawAttendeeRequestPayload],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };