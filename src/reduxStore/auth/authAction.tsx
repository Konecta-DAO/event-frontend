import { Identity } from '@dfinity/agent'
import {
  RESET_STATE,
  SET_IDENTITY,
  SET_PRINCIPAL_ID,
  SET_USER_CANISTER_ID,
  SET_LOADER,
  SET_ADDRESS,
  SET_WALLET,
} from './authActionTypes'
import { TokenLedgerModel } from 'entity/token-ledger.model'

export const setPrincipalId = (pid: string) => {
  return {
    type: SET_PRINCIPAL_ID,
    payload: {
      pid,
    },
  }
}

export const setAddress = (address: string) => {
  return {
    type: SET_ADDRESS,
    payload: {
      address,
    },
  }
}

export const setWalletArr = (walletArr: TokenLedgerModel[]) => {
  return {
    type: SET_WALLET,
    payload: {
      walletArr,
    },
  }
}

export const setIdentity = (identity: Identity) => {
  return {
    type: SET_IDENTITY,
    payload: {
      identity,
    },
  }
}

export const setUserCanisterId = (cid: string) => {
  return {
    type: SET_USER_CANISTER_ID,
    payload: {
      cid,
    },
  }
}

export const setLoader = (loader: boolean) => {
  return {
    type: SET_LOADER,
    payload: {
      loader,
    },
  }
}

export const resetAuthState = () => {
  return {
    type: RESET_STATE,
    payload: {},
  }
}
