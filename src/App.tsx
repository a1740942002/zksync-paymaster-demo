import { useEffect, useState } from 'react'
import { Address, Hash, TransactionReceipt, stringToHex, stringify } from 'viem'
import 'viem/window'
import {
  HOLD_ADDRESS,
  PARTNER_CODE,
  PAYMASTER_CONTRACT_ADDRESS,
  RECEIVER,
  USDT_ADDRESS,
  publicClient,
  walletClient
} from './config'
import { getApprovalBasedPaymasterInput } from 'viem/zksync'

export default function App() {
  const [account, setAccount] = useState<Address>()
  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()

  const connect = async () => {
    const [address] = await walletClient.requestAddresses()
    setAccount(address)
  }

  const handleClick = async () => {
    if (!account) return
    try {
      const hash = await walletClient.sendTransaction({
        account,
        to: RECEIVER,
        value: 1000000000n,
        paymaster: PAYMASTER_CONTRACT_ADDRESS,
        paymasterInput: getApprovalBasedPaymasterInput({
          innerInput: stringToHex(PARTNER_CODE, { size: 32 }),
          minAllowance: 1000000000n,
          token: USDT_ADDRESS
        }),
        gas: 1_500_000n,
        maxPriorityFeePerGas: 100000n
      })
      setHash(hash)
    } catch (error) {
      if (error instanceof Error) {
        console.error('handleClick error: ', error.message)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash
        })
        setReceipt(receipt)
      }
    })()
  }, [hash])

  return (
    <>
      {account ? (
        <div>
          <div>Connected: {account}</div>
          <button onClick={handleClick}>send</button>
          {receipt && (
            <>
              <div>
                Receipt:{' '}
                <pre>
                  <code>{stringify(receipt, null, 2)}</code>
                </pre>
              </div>
            </>
          )}
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </>
  )
}
