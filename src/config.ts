import {
  http,
  createPublicClient,
  createWalletClient,
  custom,
  Address
} from 'viem'
import { eip712WalletActions } from 'viem/zksync'
import { zkSync } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: zkSync,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: zkSync,
  transport: custom(window.ethereum!)
}).extend(eip712WalletActions())

export const PAYMASTER_CONTRACT_ADDRESS: Address =
  '0x069246dFEcb95A6409180b52C071003537B23c27'
export const USDT_ADDRESS: Address =
  '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C'
export const USDC_ADDRESS: Address =
  '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
export const PARTNER_CODE = 'XYFINANCE'

export const RECEIVER = '0x62AD9E5224f930C5a0558B6D36DF0Bba90FF8892'
