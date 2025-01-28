import { Principal } from '@dfinity/principal'

export interface Account {
  owner: Principal
  subaccount: [] | [Uint8Array | number[]]
}

export interface ApproveArgs {
  fee: [] | [number]
  memo: [] | [Uint8Array | number[]]
  from_subaccount: [] | [Uint8Array | number[]]
  created_at_time: [] | [number]
  amount: number
  expected_allowance: [] | [number]
  expires_at: [] | [number]
  spender: Account
}
