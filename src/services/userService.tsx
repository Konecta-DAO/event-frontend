import { Actor, HttpAgent, HttpAgentOptions, Identity } from '@dfinity/agent'
import { idlFactory as UserFactory } from '../candid/js/user.did.js'
import { _SERVICE as UserActor } from '../candid/ts/user.did.js'
import { UserPayload } from 'entity/UserModel'
import { UserRequestModel } from 'entity/UserRequestModel.js'
import { FileOutputType } from 'entity/FileOutputType.js'

class UserActorService {
  userActor: UserActor | undefined

  constructor() {
    this.userActor = undefined
  }

  async initV2(canisterId: string, agent: HttpAgent): Promise<boolean> {
    try {
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }

      this.userActor = Actor.createActor(UserFactory, {
        agent,
        canisterId,
      })

      return true
    } catch (e) {
      return false
    }
  }

  async init(canisterId: string, identity?: Identity): Promise<boolean> {
    try {
      const args: HttpAgentOptions = {}
      args.identity = identity
      args.host = 'https://ic0.app'

      const agent = new HttpAgent(args)
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }
      this.userActor = Actor.createActor(UserFactory, {
        agent,
        canisterId,
      })
      return true
    } catch (e) {
      return false
    }
  }

  async initDynamic(
    canisterId: string,
    identity?: Identity,
  ): Promise<undefined | UserActor> {
    try {
      const args: HttpAgentOptions = {}
      args.identity = identity
      args.host = 'https://ic0.app'

      const agent = new HttpAgent(args)
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }
      return await Actor.createActor(UserFactory, {
        agent,
        canisterId,
      })
    } catch (e) {}
  }

  getActor(): undefined | UserActor {
    return this.userActor
  }

  async getUser(appActor?: UserActor): Promise<undefined | UserPayload> {
    console.log('this.userActor - getUser - userService111', this.userActor)
    if (!this.userActor) {
      return undefined
    }

    const userDataResponse: any = await this.userActor?.getUser()
    console.log('userDataResponse - getUser - userService111', userDataResponse)

    if (userDataResponse.length === 0) {
      return undefined
    } else {
      const profilePicId = userDataResponse[0].profilepic
      const coverPhotoId = userDataResponse[0].coverphoto
      console.log(
        'profilePicId - coverPhotoId - getUser - userService111',
        profilePicId,
        coverPhotoId,
      )
      const allPromise = []
      if (profilePicId.length > 0) {
        allPromise.push(this.userActor?.getFile(profilePicId))
      }

      if (coverPhotoId.length > 0) {
        allPromise.push(this.userActor?.getFile(coverPhotoId))
      }
      const files = await Promise.all(allPromise)
      console.log('files - getUser - userService111', files)
      userDataResponse[0].profilepic = files.length > 0 ? files[0] : []
      userDataResponse[0].coverphoto = files.length > 1 ? files[1] : []
    }
    console.log(
      'FINAL - userDataResponse - getUser - userService111',
      userDataResponse,
    )
    return userDataResponse[0]
  }

  async updateUser(data: any): Promise<undefined | string> {
    if (!this.userActor) {
      return
    }
    console.log('userReq - updateUser - userService111', data)

    let profilePicId = ''
    let coverPhotoId = ''
    if (data.profilepic.length > 0) {
      profilePicId = await this.userActor.saveFile(data.profilepic[0])
    }

    if (data.coverphoto.length > 0) {
      coverPhotoId = await this.userActor.saveFile(data.coverphoto[0])
    }

    const userUpdateReq: UserRequestModel = {
      id: data.id.length > 0 ? [data.id] : [],
      bio: data.bio,
      categories: data.categories,
      timezone: data.timezone,
      firstname: data.firstname,
      country: data.country,
      username: data.username,
      email: data.email,
      profilepic: profilePicId ? [profilePicId] : [],
      coverphoto: coverPhotoId ? [coverPhotoId] : [],
      lastname: data.lastname,
      introduction_video_link: data.introductionvideolink,
    }

    const userResp = await this.userActor.upsertUser(userUpdateReq)
    console.log('userResp - updateUser - userService111', userResp)
    return userResp
  }

  async getAllEventsMetadataForUser(): Promise<undefined | any> {
    if (!this.userActor) {
      return undefined
    }

    const userEventsResp = await this.userActor?.getAllEventsMetadataForUser()
    console.log(
      'userEventsResp - getAllEventsMetadataForUser - userService111',
      userEventsResp,
    )
    if (!userEventsResp || (userEventsResp as { err: Array<string> })?.err) {
      throw new Error('Error response while fetching events metadata for user')
    }
    return userEventsResp
  }

  async getUserByPrincipalId(
    principalId: string,
    canisterId: string,
  ): Promise<undefined | UserPayload> {
    if (!this.userActor) {
      throw new Error('Error response while fetching user by principal id')
    }
    const actor: UserActor | undefined = await this.initDynamic(canisterId)
    const userDataResponse: any = await actor?.getUserByPrincipalId(principalId)
    console.log(
      'userDataResponse - getUserByPrincipalId - principalId - userService111',
      principalId,
      userDataResponse,
    )
    if (userDataResponse.length === 0) {
      return undefined
    }
    return userDataResponse[0]
  }

  getUserImageUrl(
    userCanisterId: undefined | string,
    fileId: string,
  ): string | undefined {
    if (fileId.length === 0) {
      return undefined
    }
    return `https://${userCanisterId}.raw.icp0.io/d3?file_id=${fileId}`
  }
}

const userActorServiceInstance = new UserActorService()

export default userActorServiceInstance
