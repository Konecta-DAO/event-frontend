import bigInt from 'big-integer'

export const hexToNumber = (hexFormat: string) => {
  if (hexFormat.slice(0, 2) !== '0x') return undefined
  const hex = hexFormat.substring(2)
  if (/^[a-fA-F0-9]+$/.test(hex)) {
    let numb = bigInt()
    for (let index = 0; index < hex.length; index++) {
      const digit = hex[hex.length - index - 1]
      numb = numb.add(
        bigInt(16)
          .pow(bigInt(index))
          .multiply(bigInt(`0x${digit}`)),
      )
    }
    return numb
  } else {
    return undefined
  }
}

const hexToUint8Array = (hex: string) => {
  const zero = bigInt(0)
  const n256 = bigInt(256)
  let bigNumber = hexToNumber(hex)
  if (bigNumber) {
    const result = new Uint8Array(32)
    let i = 0
    while (bigNumber.greater(zero)) {
      result[32 - i - 1] = bigNumber.mod(n256).toJSNumber()
      bigNumber = bigNumber.divide(n256)
      i += 1
    }
    return result
  } else return new Uint8Array(32)
}

export const toFullDecimal = (
  numb: bigint | string,
  decimal: number,
  maxDecimals?: number,
) => {
  if (BigInt(numb) === BigInt(0)) return '0'
  let numbStr = numb.toString()
  if (decimal === numbStr.length) {
    if (maxDecimals === 0) return '0'
    const newNumber = numbStr
      .slice(0, maxDecimals ?? decimal)
      .replace(/0+$/, '')
    return '0.' + newNumber
  } else if (decimal > numbStr.length) {
    for (let index = 0; index < decimal; index++) {
      numbStr = '0' + numbStr
      if (numbStr.length > decimal) break
    }
  }
}

export const randomString = (length: number, chars: string) => {
  let result = ''
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export const toFixed = (num: string, fixed: number) => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  const matches = num?.match(re)

  if (!matches) {
    return ''
  }

  return matches && typeof matches?.[0] === 'string'
    ? parseFloat(matches[0]).toFixed(fixed)
    : ''
}

const videoPatterns = {
  youtube: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
  vimeo:
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/,
}

export function getVideoEmbedUrl(url: string): string {
  const youtubeMatch = url.match(videoPatterns.youtube)
  if (youtubeMatch && youtubeMatch[2].length === 11) {
    return `https://www.youtube.com/embed/${youtubeMatch[2]}`
  }

  const vimeoMatch = url.match(videoPatterns.vimeo)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return url
}

export function isVideoUrl(url: string): boolean {
  return videoPatterns.youtube.test(url) || videoPatterns.vimeo.test(url)
}
