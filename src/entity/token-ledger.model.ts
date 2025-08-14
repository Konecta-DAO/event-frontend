import { JSX } from "react"

export interface TokenLedgerModel {
  icon: JSX.Element
  canisterId: string
  token: string
  balance: string
}
