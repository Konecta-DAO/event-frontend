import ledgerActorServiceInstance from './ledgerService.tsx'
import konectaActorServiceInstance from './konectaService.tsx'
import type { TransferRequestPayload } from 'candid/ts/konecta.did.d.ts'

export const getICPApproval = async (
  principalId: string,
  subAccountHex: string,
  eventId: string,
  tokenAmount: number,
  agent: any,
) => {
  const transferFee = await ledgerActorServiceInstance.getICPFee()
  const amount = BigInt(Math.round(tokenAmount * 10 ** 8))
  console.log(
    'transfer_fee - amount - createEvent111  - ICP',
    BigInt(transferFee),
    amount,
  )

  const icrc2ApprovalResp =
    await ledgerActorServiceInstance.getIcrc2ApprovalForICP(
      principalId,
      subAccountHex,
      BigInt(transferFee),
      amount,
      agent,
    )
  console.log(
    'icrc2ApprovalResp - subAccountHex - getIcrc2ApprovalForICP - paymentService111',
    icrc2ApprovalResp,
    subAccountHex,
  )

  if (typeof icrc2ApprovalResp.Err !== 'undefined') {
    throw 'Error in ICP Approval'
  }

  const payload: TransferRequestPayload = {
    fee: [BigInt(transferFee)],
    eventId,
    memo: [],
    priceToken: { ICP: null },
    amount,
  };

  const transferResp = await konectaActorServiceInstance.transferAmountFromUserToEventSubAccount(payload);
  console.log(
    'transferAmountFromUserToEventSubAccount - ICP - paymentService111',
    transferResp,
  )
}

export const getCKBTCApproval = async (
  principalId: string,
  subAccountHex: string,
  eventId: string,
  tokenAmount: number,
  agent: any,
) => {
  const transferFee = await ledgerActorServiceInstance.getCKBTCFee()
  const amount = BigInt(Math.round(tokenAmount * 10 ** 8))
  console.log(
    'transfer_fee - amount - createEvent111  - CKBTC',
    BigInt(transferFee),
    amount,
  )

  const icrc2ApprovalResp =
    await ledgerActorServiceInstance.getIcrc2ApprovalForCKBTC(
      principalId,
      subAccountHex,
      BigInt(transferFee),
      amount,
      agent,
    )
  console.log(
    'icrc2ApprovalResp - subAccountHex - getIcrc2ApprovalForCKBTC - paymentService111',
    icrc2ApprovalResp,
    subAccountHex,
  )

  if (typeof icrc2ApprovalResp.Err !== 'undefined') {
    throw 'Error in CKBTC Approval'
  }

  const payload: TransferRequestPayload = {
    fee: [BigInt(transferFee)],
    eventId,
    memo: [],
    priceToken: { CKBTC: null },
    amount,
  };

  const transferResp = await konectaActorServiceInstance.transferAmountFromUserToEventSubAccount(payload);

  console.log(
    'transferAmountFromUserToEventSubAccount - ICP - paymentService111',
    transferResp,
  )
}
