import { defineChain } from 'viem'
import { chainConfig } from 'viem/zksync'

export const zkSyncEra = defineChain({
  ...chainConfig,
  id: 324,
  name: 'zkSync Era',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: {
      http: [
        'https://zksync2-mainnet.zksync.io',
        'https://rpc.ankr.com/zksync_era',
        'https://1rpc.io/zksync2-era',
        'https://zksync.meowrpc.com',
        'https://zksync.drpc.org',
        'https://zksync-era.blockpi.network/v1/rpc/public',
        'https://mainnet.era.zksync.io'
      ]
    },
    default: { http: ['https://zksync2-mainnet.zksync.io'] }
  },
  blockExplorers: {
    etherscan: {
      name: 'zkSync Era Explorer',
      url: 'https://www.oklink.com/zksync'
    },
    default: {
      name: 'zkSync Era Explorer',
      url: 'https://www.oklink.com/zksync'
    }
  },
  contracts: {
    multicall3: {
      address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
    }
  }
})
