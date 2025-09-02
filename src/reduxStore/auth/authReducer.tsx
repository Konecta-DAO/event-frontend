import { Identity } from '@dfinity/agent'
import { AnyAction } from 'redux'
import {
  RESET_STATE,
  SET_ADDRESS,
  SET_IDENTITY,
  SET_LOADER,
  SET_PRINCIPAL_ID,
  SET_SIGNUP_REQUIRED,
  SET_USER_CANISTER_ID,
  SET_WALLET,
} from './authActionTypes.tsx'
import { NFID } from '@nfid/embed'
import { TokenLedgerModel } from 'entity/token-ledger.model.ts'

interface AuthState {
  pid: string
  address: string
  nfid: typeof NFID
  identity?: Identity
  userCanisterId: string
  loader: boolean
  walletArr: TokenLedgerModel[]   // `T[] | []` -> just `T[]`
  isSignUpRequired: boolean
}

const initialState: AuthState = {
  pid: '',
  address: '',
  nfid: NFID,
  identity: undefined,
  userCanisterId: '',
  loader: false,
  walletArr: [],
  isSignUpRequired: false,
}

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  const { type, payload } = action

  switch (type) {
    case SET_PRINCIPAL_ID: {
      const { pid } = payload as { pid: string }
      return { ...state, pid }
    }

    case SET_ADDRESS: {
      const { address } = payload as { address: string }
      return { ...state, address }
    }

    case SET_WALLET: {
      const { walletArr } = payload as { walletArr: TokenLedgerModel[] }
      return { ...state, walletArr }
    }

    case SET_IDENTITY: {
      const { identity } = payload as { identity?: Identity }
      return { ...state, identity }
    }

    case SET_USER_CANISTER_ID: {
      const { cid } = payload as { cid: string }
      return { ...state, userCanisterId: cid }
    }

    case SET_SIGNUP_REQUIRED: {
      const { required } = payload as { required: boolean }
      return { ...state, isSignUpRequired: required }
    }

    case SET_LOADER: {
      const { loader } = payload as { loader: boolean }
      return { ...state, loader }
    }

    case RESET_STATE:
      return initialState

    default:
      return state
  }
}
