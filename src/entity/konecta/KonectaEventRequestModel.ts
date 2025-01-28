import { Principal } from '@dfinity/principal'
import { ImageType } from '../ImageType'
import { EventStatus } from 'entity/EventRequestModel'

export type EventType = { Request: null } | { Offer: null }
export type Token = { ICP: null } | { CKBTC: null } | { FREE: null }
export interface KonectaEventRequestModel {
  status: EventStatus
  categories: Array<string>
  token_amount: [] | [number]
  price_token: [] | [Token]
  interests: [] | [Array<string>]
  metadata: any
  user_id: [] | [string]
  consultations: [] | [Array<string>]
  expertise: [] | [string]
  event_id: string
  event_type: EventType
  showcase_link: [] | [string]
  end_date: bigint
  start_date: bigint
}
