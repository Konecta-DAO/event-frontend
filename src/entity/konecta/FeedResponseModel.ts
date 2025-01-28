import { UserResponsePayload } from './UserResponsePayload'

export interface FeedResponsePayload {
  categories: Array<string>
  userData: UserResponsePayload
  status: string
  token_amount: number
  price_token: string
  interests: Array<string>
  metadata: any
  name: string
  description: string
  end_date: bigint
  user_id: string
  consultations: Array<string>
  language: string
  start_date: bigint
  expertise: string
  showcase_link: string
  subaccount_id_hex: string
  subaccount_id_index: bigint
  konecta_event_id: string
  event_id: string
  location: string
  event_type: string
  coverphoto: string
}
