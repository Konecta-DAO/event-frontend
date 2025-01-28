import { Identity } from '@dfinity/agent'
import { AnyAction } from 'redux'
import {
  RESET_STATE,
  SET_ADDRESS,
  SET_IDENTITY,
  SET_LOADER,
  SET_PRINCIPAL_ID,
  SET_USER_CANISTER_ID,
  SET_WALLET,
} from './authActionTypes'
import { NFID } from '@nfid/embed'
import update from 'immutability-helper'
import { TokenLedgerModel } from 'entity/token-ledger.model'

interface AuthState {
  pid: string
  address: string
  nfid: typeof NFID
  identity?: Identity
  userCanisterId: string
  loader: boolean
  walletArr: TokenLedgerModel[] | []
}

const initialState: AuthState = {
  pid: '',
  address: '',
  nfid: NFID,
  identity: undefined,
  userCanisterId: '',
  loader: false,
  walletArr: [],
}

export const authReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action

  switch (type) {
    case SET_PRINCIPAL_ID: {
      const { pid } = payload
      return update(state, { pid: { $set: pid } })
    }

    case SET_ADDRESS: {
      const { address } = payload
      return update(state, { address: { $set: address } })
    }

    case SET_WALLET: {
      const { walletArr } = payload
      return update(state, { walletArr: { $set: walletArr } })
    }

    case SET_IDENTITY: {
      const { identity } = payload
      return update(state, { identity: { $set: identity } })
    }

    case SET_USER_CANISTER_ID: {
      const { cid } = payload
      return update(state, { userCanisterId: { $set: cid } })
    }

    case SET_LOADER: {
      const { loader } = payload
      return update(state, { loader: { $set: loader } })
    }

    case RESET_STATE: {
      return initialState
    }

    default:
      return state
  }
}
