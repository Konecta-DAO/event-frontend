import { NFID } from '@nfid/embed'

const NFID_PROVIDER_URL = 'https://nfid.one'
class NFIDService {
  nfid: NFID | undefined

  async init() {
    this.nfid = await NFID.init({ origin: NFID_PROVIDER_URL })
  }

  async logout() {
    this.nfid?.logout()
    console.log('logout111 called3')
  }
}

const nfidServiceInstance = new NFIDService()

export default nfidServiceInstance
