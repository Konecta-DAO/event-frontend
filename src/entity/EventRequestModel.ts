import { Principal } from '@dfinity/principal'
import { ImageType } from './ImageType'

export type EventStatus =
  | { Draft: null }
  | { Created: null }
  | { Canceled: null }
export interface EventRequestModel {
  status: EventStatus
  metadata: any
  name: string
  description: string
  end_date: bigint
  user_id: [] | [Principal]
  language: [] | [string]
  start_date: bigint
  location: string
  coverphoto: [] | [ImageType]
}

export interface CreateEventInputs {
  name: string
  categories: string[]
  interests: string[]
  startDate: bigint
  endDate: bigint
  priceCourse: string
  price: number
  language: string
  email: string
  description: string
  location: string
  yearsOfExperience: string
  consultations: string
  showcaselink: string
  participationType: string
}
