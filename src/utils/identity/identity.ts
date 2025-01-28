import { Identity } from '@dfinity/agent'
import { Ed25519KeyIdentity } from '@dfinity/identity'

const byteLength = import.meta.env.VITE_BYTE_LENGTH

export const seedToIdentity: (seed: string) => Identity | null = (seed) => {
  const seedBuf = new Uint8Array(new ArrayBuffer(byteLength))
  if (seed.length && seed.length > 0 && seed.length <= byteLength) {
    seedBuf.set(new TextEncoder().encode(seed))
    return Ed25519KeyIdentity.generate(seedBuf)
  }
  return null
}
