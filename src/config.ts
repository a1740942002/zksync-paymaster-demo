import {
  http,
  createPublicClient,
  createWalletClient,
  custom,
  Address,
  publicActions
} from 'viem'
import { eip712WalletActions } from 'viem/zksync'
import { zkSyncEra } from './zksync'

export const publicClient = createPublicClient({
  chain: zkSyncEra,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: zkSyncEra,
  transport: custom(window.ethereum!)
})
  .extend(publicActions)
  .extend(eip712WalletActions())

export const PAYMASTER_CONTRACT_ADDRESS: Address =
  '0x069246dFEcb95A6409180b52C071003537B23c27'
export const SYNC_SWAP_PAYMASTER_CONTRACT_ADDRESS: Address =
  '0x9B5def958d0f3b6955cBEa4D5B7809b2fb26b059'
export const USDT_ADDRESS: Address =
  '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C'
export const USDC_ADDRESS: Address =
  '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
export const HOLD_ADDRESS: Address =
  '0xed4040fD47629e7c8FBB7DA76bb50B3e7695F0f2'
export const PARTNER_CODE = 'XY_FINANCE'

export const RECEIVER: Address = '0x62AD9E5224f930C5a0558B6D36DF0Bba90FF8892'
