export interface EventMetadataResponsePayload {
  categories: Array<string>
  interests: Array<string>
  calendar_id: string
  name: string
  end_date: bigint
  created_by: string
  start_date: bigint
  event_id: string
  event_metadata_id: string
}
