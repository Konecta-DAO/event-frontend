import moment from 'moment'

export const getMomentFromNanoSeconds = (timestamp: bigint): moment.Moment => {
  return moment.unix(Number(timestamp) / 1e9)
}

export const getNanosecondsFromMoment = (timestamp: moment.Moment): bigint => {
  return BigInt(timestamp.unix() * 1e9)
}
