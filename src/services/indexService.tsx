import {
  Actor,
  HttpAgent,
  HttpAgentOptions,
  Identity,
  makeNonceTransform,
} from '@dfinity/agent'
import { idlFactory as IndexFactory } from '../candid/js/index.did.js'
import {
  CanisterMapPayload,
  _SERVICE as IndexActor,
  UserAccountInfoPayload,
  UserPayload,
} from '../candid/ts/index.did.js'
import nfidServiceInstance from './nfidServices'
import { DelegationIdentity } from '@dfinity/identity'
import userActorServiceInstance from './userService'
import eventActorServiceInstance from './eventService'
import konectaActorServiceInstance from './konectaService'
import { tokenLedgerArr } from './values'

interface LoginAttemptResponseV2 {
  type: 'login' | 'signup_required'
  success: boolean
  userCanisterId: string | undefined
}

interface LoginAttemptResponse {
  type: 'login' | 'signup_required'
  success: boolean
}

interface UpdateIdentityResponse {
  type: 'user_canister_unavailable' | 'index_actor_update' | 'user_actor_update'
  success: boolean
}

class IndexActorService {
  indexActor: IndexActor | undefined
  identity: undefined | Identity | DelegationIdentity
  indexCanisterId: string
  eventCanisterId: string
  konectaCanisterId: string
  userCanisterId: string | undefined
  userSubaccLedgerIdentifier: string | undefined
  icpLedgerCanisterId: string

  constructor() {
    this.indexActor = undefined
    this.identity = undefined
    this.indexCanisterId = 'xnp5v-5aaaa-aaaap-qccda-cai'
    this.eventCanisterId = 'xemwj-liaaa-aaaap-qcccq-cai'
    this.konectaCanisterId = 'yg2ow-xiaaa-aaaap-qceza-cai'
    this.icpLedgerCanisterId = tokenLedgerArr.at(0)?.canisterId as string
  }

  async initV2(
    agent: HttpAgent,
    identity: Identity,
  ): Promise<LoginAttemptResponseV2 | undefined> {
    this.identity = identity

    if (process.env.NODE_ENV === 'development') {
      agent.fetchRootKey()
    }

    this.indexActor = Actor.createActor(IndexFactory, {
      agent,
      canisterId: this.indexCanisterId,
    })

    const userAccountInfo = await this.getUserAccountInfo()
    const userCanisterId = userAccountInfo?.canister_id
    this.userSubaccLedgerIdentifier =
      userAccountInfo?.subaccount_ledger_identifier

    if (userCanisterId === undefined || userCanisterId?.length === 0) {
      return {
        type: 'signup_required',
        success: true,
        userCanisterId,
      }
    }

    this.userCanisterId = userCanisterId

    const isSuccess = await userActorServiceInstance.initV2(
      this.userCanisterId,
      agent,
    )

    if (isSuccess) {
      return {
        type: 'login',
        success: true,
        userCanisterId,
      }
    } else {
      return {
        type: 'login',
        success: true,
        userCanisterId,
      }
    }
  }

  // async init(
  //   identity?: Identity,
  //   skipUserCanisterCall: boolean = false,
  // ): Promise<boolean> {
  //   try {
  //     const identityToUse = identity ?? nfidServiceInstance.nfid?.getIdentity()
  //     this.identity = identityToUse
  //     const args: HttpAgentOptions = {}
  //     args.identity = identityToUse
  //     args.host = 'https://ic0.app'

  //     const agent = new HttpAgent(args)
  //     if (process.env.NODE_ENV === 'development') {
  //       agent.fetchRootKey()
  //     }
  //     this.indexActor = Actor.createActor(IndexFactory, {
  //       agent,
  //       canisterId: this.indexCanisterId,
  //     })

  //     if (!skipUserCanisterCall) {
  //       const userAccountInfo = await this.getUserAccountInfo()
  //       const userCanisterId = userAccountInfo?.canister_id
  //       this.userCanisterId = userCanisterId
  //       this.userSubaccLedgerIdentifier =
  //         userAccountInfo?.subaccount_ledger_identifier
  //     }

  //     return true
  //   } catch (e) {
  //     console.error('initIndexActor error', e)
  //     return false
  //   }
  // }

  async attemptUserActorInit(agent: HttpAgent): Promise<boolean> {
    if (!this.userCanisterId) {
      return false
    }

    return await userActorServiceInstance.initV2(
      this.userCanisterId,
      agent,
      // this.identity,
    )
  }

  async eventActorInit(): Promise<boolean> {
    console.log('this.identity111 - eventActorInit111', this.identity)
    return await eventActorServiceInstance.init(
      this.eventCanisterId,
      this.identity,
    )
  }

  async konectaActorInit(): Promise<boolean> {
    console.log('this.identity111 - konectaActorInit111', this.identity)
    return await konectaActorServiceInstance.init(
      this.konectaCanisterId,
      this.identity,
    )
  }

  // async attemptNFIDLogin(): Promise<LoginAttemptResponse | undefined> {
  //   if (!this.indexActor) {
  //     return undefined
  //   }

  //   try {
  //     console.log('event target111', this.eventCanisterId)
  //     const identity = await nfidServiceInstance.nfid?.getDelegation({
  //       targets: [
  //         this.indexCanisterId,
  //         this.eventCanisterId,
  //         this.konectaCanisterId,
  //       ],
  //       maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000),
  //     })
  //     this.identity = identity
  //     const actorUpdateSuccess = await this.init(identity, true)

  //     if (!actorUpdateSuccess) {
  //       return undefined
  //     }

  //     const updateUserActorSuccess = await this.updateNFIDIdentity()
  //     const { type, success } = updateUserActorSuccess

  //     if (type === 'user_canister_unavailable') {
  //       // signup required
  //       return {
  //         type: 'signup_required',
  //         success: true,
  //       }
  //     }

  //     if (!success) {
  //       return {
  //         type: 'login',
  //         success: false,
  //       }
  //     }

  //     return {
  //       type: 'login',
  //       success: true,
  //     }
  //   } catch (e) {
  //     console.log('attemptNFIDLogin', e)
  //     return {
  //       type: 'login',
  //       success: false,
  //     }
  //   }
  // }

  async updateNFIDIdentity(
    agent: HttpAgent,
    identity: Identity,
    userAccountInfo: UserAccountInfoPayload,
  ): Promise<UpdateIdentityResponse> {
    // const userAccountInfo = await this.getUserAccountInfo()
    const userCanisterId = userAccountInfo?.canister_id
    console.log(
      'updateNFIDIdentity - target111 - userCanisterId',
      userCanisterId,
    )
    // if (userCanisterId === undefined || userCanisterId?.length === 0) {
    //   return {
    //     type: 'user_canister_unavailable',
    //     success: false,
    //   }
    // }

    this.userCanisterId = userCanisterId
    this.userSubaccLedgerIdentifier =
      userAccountInfo?.subaccount_ledger_identifier
    console.log(
      'updateNFIDIdentity - target111 - eventCanisterId',
      this.eventCanisterId,
    )
    // console.log(
    //   'updateNFIDIdentity - target111 - principalId',
    //   nfidServiceInstance?.nfid?.getIdentity().getPrincipal().toText(),
    // )
    // const updatedIdentity =
    //   await nfidServiceInstance.nfid?.updateGlobalDelegation({
    //     targets: [
    //       this.indexCanisterId,
    //       this.eventCanisterId,
    //       this.konectaCanisterId,
    //       userCanisterId,
    //     ],
    //     maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000),
    //   })
    // this.identity = updatedIdentity
    // const actorLoggedInSuccess = await this.init(updatedIdentity)
    // const actorLoggedInSuccess = await this.initV2(agent, identity)

    // const principalId = nfidServiceInstance.nfid
    //   ?.getIdentity()
    //   .getPrincipal()
    //   .toText()
    // console.log('updateNFIDIdentity - principalId111', principalId)

    // if (!actorLoggedInSuccess) {
    //   return {
    //     type: 'index_actor_update',
    //     success: false,
    //   }
    // }

    const userActorUpdateSuccess = await this.attemptUserActorInit(agent)

    if (!userActorUpdateSuccess) {
      return {
        type: 'user_actor_update',
        success: false,
      }
    }

    return {
      type: 'user_actor_update',
      success: true,
    }
  }

  async getUserCanister(): Promise<string | undefined> {
    if (!this.indexActor) {
      return undefined
    }

    return await this.indexActor.getUserCanister()
  }

  async getUserAccountInfo(): Promise<UserAccountInfoPayload | undefined> {
    if (!this.indexActor) {
      return undefined
    }

    return await this.indexActor.getUserAccountInfo()
  }

  async userSignUp(userName: string): Promise<string | undefined> {
    if (!this.indexActor) {
      return undefined
    }

    return await this.indexActor.signUp(userName)
  }

  async getUserByUserName(userName: string): Promise<undefined | UserPayload> {
    if (!this.indexActor) {
      return undefined
    }
    try {
      const resp = await this.indexActor.getUserByUsername(userName)
      console.log(
        'index getUserByUserName, userName:',
        userName,
        'response:',
        resp,
      )
      if (resp.length === 0) {
        return undefined
      }

      return resp[0]
    } catch (e) {
      console.log('error in index getUserByUserName', e)
      return undefined
    }
  }

  async verifyPayment(): Promise<undefined | boolean> {
    if (!this.indexActor) {
      return undefined
    }
    return await this.indexActor.verifyPayment()
  }

  async getUserCanistersByPrincipal(
    principalIds: Array<string>,
  ): Promise<CanisterMapPayload[]> {
    if (!this.indexActor) {
      throw new Error(
        'Error response while fetching user canisters from principal',
      )
    }
    return await this.indexActor.getUserCanistersByPrincipal(principalIds)
  }
}

const indexActorServiceInstance = new IndexActorService()

export default indexActorServiceInstance
