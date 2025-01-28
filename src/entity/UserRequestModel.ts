import { ImageType } from './ImageType'

export interface UserRequestModel {
  id: [] | [string]
  bio: [] | [string] | any
  categories: [] | [Array<string>]
  timezone: string
  firstname: string
  country: string
  username: string
  email: string
  profilepic: [] | [string]
  coverphoto: [] | [string]
  lastname: string
  introduction_video_link: [] | [string]
}
