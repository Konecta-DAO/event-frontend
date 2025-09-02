import { Actor, HttpAgent, HttpAgentOptions, Identity } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import { idlFactory as ICPLedgerFactory } from '../candid/js/ledger.did.js'
import { _SERVICE as ICPLedgerActor } from '../candid/ts/ledger.did.js'
import { idlFactory as ckBTCLedgerFactory } from '../candid/js/ckbtc-ledger.did.js'
import { _SERVICE as ckBTCLedgerActor } from '../candid/ts/ckbtc-ledger.did.js'
import indexActorServiceInstance from './indexService.tsx'
import moment from 'moment'
import { ApproveArgs } from 'entity/payment/ApproveArgs.js'
import konectaActorServiceInstance from './konectaService.tsx'

import { TokenLedgerModel } from 'entity/token-ledger.model.js'
import { toFixed } from 'utils/common/common.ts'
import { tokenLedgerArr } from './values.tsx'

class LedgerActorService {
  ledgerActor: ICPLedgerActor | undefined
  ckBTCLedgerActor: ckBTCLedgerActor | undefined

  constructor() {
    this.ledgerActor = undefined
    this.ckBTCLedgerActor = undefined
  }

  async init(canisterId: string, identity?: Identity): Promise<ICPLedgerActor> {
    try {
      const args: HttpAgentOptions = {}
      args.identity = identity
      args.host = 'https://ic0.app'

      const agent = new HttpAgent(args)
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }
      return await Actor.createActor(ICPLedgerFactory, {
        agent,
        canisterId,
      })
    } catch (e) {
      console.error(e)
      return {} as ICPLedgerActor
    }
  }

  async initCKBTC(
    canisterId: string,
    identity?: Identity,
  ): Promise<ckBTCLedgerActor> {
    try {
      const args: HttpAgentOptions = {}
      args.identity = identity
      args.host = 'https://ic0.app'

      const agent = new HttpAgent(args)
      if (process.env.NODE_ENV === 'development') {
        agent.fetchRootKey()
      }
      return await Actor.createActor(ckBTCLedgerFactory, {
        agent,
        canisterId,
      })
    } catch (e) {
      console.error(e)
      return {} as ckBTCLedgerActor
    }
  }

  async getAccountBalance(
    canisterId: string,
    principal: string,
    identity?: Identity,
  ): Promise<bigint> {
    this.ledgerActor = await this.init(canisterId)

    const balance = await this.ledgerActor?.icrc1_balance_of({
      owner: Principal.fromText(principal),
      subaccount: [],
    })

    return balance ?? BigInt(0)
  }

  async getAllAccountBalance(principal: string) {
    const array = tokenLedgerArr.map(async (row) => {
      const canisterId = row.canisterId
        ? row.canisterId
        : import.meta.env.VITE_ANONYMOUS_PRINCIPAL
      const subAccountBalance = await this.getAccountBalance(
        canisterId,
        principal.toString(),
      )

      console.log(
        'subAccountBalance - getSubAccountBalance111',
        subAccountBalance,
      )

      const ONE_TRILLION = BigInt(100000000)

      const x: TokenLedgerModel = {
        ...row,
        balance: toFixed(
          (Number(subAccountBalance) / Number(ONE_TRILLION)).toString(),
          5,
        ),
      }
      return x
    })

    const tokenArray = await Promise.all(array)
    return tokenArray
  }

  async getICPFee(): Promise<bigint> {
    const canisterId = tokenLedgerArr.at(0)?.canisterId
    console.log('canisterId - getICPFee', canisterId)
    if (typeof canisterId === 'undefined') {
      throw 'Some error occured. Please try again.'
    }
    this.ledgerActor = await this.init(canisterId)
    console.log('this.ledgerActor - getICPFee', this.ledgerActor)
    const transferFee = await this.ledgerActor?.transfer_fee({})
    console.log('transfer_fee method  - ICP', transferFee.transfer_fee.e8s)
    return transferFee.transfer_fee.e8s
  }

  async getCKBTCFee(): Promise<bigint> {
    const canisterId = tokenLedgerArr.at(3)?.canisterId
    console.log('canisterId - getCKBTCFee', canisterId)
    if (typeof canisterId === 'undefined') {
      throw 'Some error occured. Please try again.'
    }
    this.ckBTCLedgerActor = await this.initCKBTC(canisterId)
    const icrc1Fee = await this.ckBTCLedgerActor.icrc1_fee()
    console.log('icrc1_fee - CKBTC', icrc1Fee, canisterId)
    return icrc1Fee
  }

  hexStringToArrayBuffer(hexString: string) {
    hexString = hexString.replace(/^0x/, '')

    if (hexString.length % 2 !== 0) {
      console.log(
        'WARNING: expecting an even number of characters in the hexString',
      )
    }

    const bad = hexString.match(/[G-Z\s]/i)
    if (bad) {
      console.log('WARNING: found non-hex characters', bad)
    }

    const pairs = hexString.match(/[\dA-F]{2}/gi)

    const integers = pairs?.map(function (s) {
      return parseInt(s, 16)
    })

    if (!integers) {
      return
    }

    const array = new Uint8Array(integers)

    return array
  }

  async getIcrc2ApprovalForICP(
    principalId: string,
    subAccountHex: string,
    fee: bigint,
    amount: bigint,
    agent: any,
  ): Promise<any> {
    const _amount = amount
    const _fee = fee
    const _totalAmount = _amount + _fee

    const canisterId = tokenLedgerArr.at(0)?.canisterId
    if (typeof canisterId === 'undefined') {
      throw 'Some error occured. Please try again.'
    }
    console.log(
      'amount - fee - total_amount - account - subAccountHex - ICP',
      _amount,
      _fee,
      _totalAmount,
      subAccountHex,
    )

    const pid = Principal.fromText(principalId)

    const hexArray = this.hexStringToArrayBuffer(subAccountHex) as Uint8Array

    console.log(
      'pid - arr1 - konectaCanisterId - ICP - hexStringToArrayBuffer',
      pid,
      hexArray,
      indexActorServiceInstance.konectaCanisterId,
    )

    const account: any = {
      owner: Principal.fromText(indexActorServiceInstance.konectaCanisterId),
      subaccount: [Object.values(hexArray)],
    }

    console.log('account - subAccountHex - ICP', account)
    const address =
      await konectaActorServiceInstance.getDefaultAccountIdentifier()

    console.log('address - getIcrc2ApprovalForICP - ICP', address)

    if (typeof address === 'undefined') throw 'Address not found'

    const actor = Actor.createActor(ICPLedgerFactory, {
      agent,
      canisterId,
    })

    const approvalReq: ApproveArgs = {
      fee: [Number(_fee)],
      memo: [],
      from_subaccount: [],
      created_at_time: [Number(moment().utc().unix() * 1000000000)],
      amount: Number(_totalAmount),
      expected_allowance: [],
      expires_at: [Number(moment().utc().add(3, 'day').unix() * 1000000000)],
      spender: account,
    }

    const response = await actor.icrc2_approve(approvalReq)
    console.log('approvalRespICP - getIcrc2ApprovalForICP', response)
    return response
  }

  async getIcrc2ApprovalForCKBTC(
    principalId: string,
    subAccountHex: string,
    fee: bigint,
    amount: bigint,
    agent: any,
  ): Promise<any> {
    const _amount = amount
    const _fee = fee
    const _totalAmount = _amount + _fee

    const canisterId = tokenLedgerArr.at(3)?.canisterId
    console.log('canisterId - getIcrc2ApprovalForCKBTC', canisterId)
    if (typeof canisterId === 'undefined') {
      throw 'Some error occured. Please try again.'
    }

    console.log(
      'amount - fee - total_amount - account - subAccountHex - CKBTC',
      _amount,
      _fee,
      _totalAmount,
      subAccountHex,
    )

    const pid = Principal.fromText(principalId)

    const hexArray = this.hexStringToArrayBuffer(subAccountHex) as Uint8Array

    const account: any = {
      owner: Principal.fromText(indexActorServiceInstance.konectaCanisterId),
      subaccount: [Object.values(hexArray)],
    }

    const actor = Actor.createActor(ckBTCLedgerFactory, {
      agent,
      canisterId,
    })

    const IRCRC2_APPROVE_ARGS: ApproveArgs = {
      fee: [Number(_fee)],
      memo: [],
      from_subaccount: [],
      created_at_time: [Number(moment().utc().unix() * 1000000000)],
      amount: Number(_totalAmount),
      expected_allowance: [],
      expires_at: [Number(moment().utc().add(3, 'day').unix() * 1000000000)],
      spender: account,
    }

    const response = await actor.icrc2_approve(IRCRC2_APPROVE_ARGS)
    console.log('approvalRespCKBTC - getIcrc2ApprovalForCKBTC', response)
    return response
  }
}

const ledgerActorServiceInstance = new LedgerActorService()

export default ledgerActorServiceInstance
