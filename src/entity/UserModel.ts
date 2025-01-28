import { Principal } from '@dfinity/principal'
import { FileOutputType } from './FileOutputType'

export interface UserPayload {
  id: string
  bio: string
  categories: Array<string>
  timezone: string
  firstname: string
  country: string
  username: string
  email: string
  canister_id: Principal
  principal_id: Principal
  profilepic: [] | [FileOutputType]
  coverphoto: [] | [FileOutputType]
  lastname: string
  introduction_video_link: string
}
