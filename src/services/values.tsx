import CHATCoinICon from 'assets/img/chat-coin.png'
import ckBTCCoinIcon from 'assets/img/ckBTC-coin.png'
import SNS1CoinIcon from 'assets/img/sns1-coin.png'
import ICPCoinIcon from 'assets/svg/icp-coin.svg'
import { ConstantsList } from 'constants/constants.ts'
import { TokenLedgerModel } from 'entity/token-ledger.model.ts'

export const tokenLedgerArr: TokenLedgerModel[] = [
  {
    icon: <img src={ICPCoinIcon} alt="coin icon" />,
    canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    token: ConstantsList.ICP,
    balance: '0',
  },
  {
    icon: <img src={CHATCoinICon} alt="coin icon" />,
    canisterId: '2ouva-viaaa-aaaaq-aaamq-cai',
    token: ConstantsList.CHAT,
    balance: '0',
  },
  {
    icon: <img src={SNS1CoinIcon} alt="coin icon" />,
    canisterId: 'zfcdd-tqaaa-aaaaq-aaaga-cai',
    token: ConstantsList.SNS1,
    balance: '0',
  },
  {
    icon: <img src={ckBTCCoinIcon} alt="coin icon" />,
    canisterId: 'mxzaz-hqaaa-aaaar-qaada-cai',
    token: ConstantsList.CKBTC,
    balance: '0',
  },
]