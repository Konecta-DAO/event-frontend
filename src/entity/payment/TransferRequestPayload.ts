import { Token } from 'entity/konecta/KonectaEventRequestModel'

export interface TransferRequestPayload {
  fee: [] | [bigint]
  eventId: string
  memo: [] | [Uint8Array | number[]]
  priceToken: Token
  amount: bigint
}
