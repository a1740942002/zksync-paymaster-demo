import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  http,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  stringify,
} from 'viem';
import { eip712WalletActions } from 'viem/zksync';
import { utils } from 'zksync-ethers';
import { zkSyncSepoliaTestnet } from 'viem/chains';
import 'viem/window';
import { greeterContract } from './greeterContract';

const publicClient = createPublicClient({
  chain: zkSyncSepoliaTestnet,
  transport: http(),
});
const walletClient = createWalletClient({
  chain: zkSyncSepoliaTestnet,
  transport: custom(window.ethereum!),
}).extend(eip712WalletActions());

const usePaymasterHelper = async () => {
  const PAYMASTER_CONTRACT_ADDRESS = 'PAYMASTER-ADDRESS';
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_CONTRACT_ADDRESS, {
    type: 'General',
    innerInput: new Uint8Array(),
  });
  return {
    gasPerPubdata: BigInt(utils.DEFAULT_GAS_PER_PUBDATA_LIMIT) + 80000n,
    paymaster: paymasterParams.paymaster as `0x${string}`,
    paymasterInput: paymasterParams.paymasterInput,
  };
};

function Example() {
  const [account, setAccount] = useState<Address>();
  const [hash, setHash] = useState<Hash>();
  const [greeting, setGreeting] = useState<string>('');
  const [newGreeting, setNewGreeting] = useState<string>('');
  const [receipt, setReceipt] = useState<TransactionReceipt>();

  const connect = async () => {
    const [address] = await walletClient.requestAddresses();
    setAccount(address);
    readGreet();
  };

  const updateGreeting = async () => {
    const GREETER_CONTRACT_ADDRESS =
      '0xbC54fF78808BfD4C0B5dE7FE1ec646345CC3EdCa';
    const paymasterParams = await usePaymasterHelper();
    if (!account || !newGreeting) return;
    const { request } = await publicClient.simulateContract({
      address: GREETER_CONTRACT_ADDRESS,
      abi: greeterContract.abi,
      functionName: 'setGreeting',
      args: [newGreeting],
      account,
      maxFeePerGas: 100000000n,
      ...paymasterParams,
    });

    const hash = await walletClient.writeContract(request);
    setHash(hash);
  };

  const readGreet = async () => {
    const msg = await publicClient.readContract({
      ...greeterContract,
      functionName: 'greet',
      account,
    });

    setGreeting(msg as string);
  };

  useEffect(() => {
    (async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        setReceipt(receipt);
      }
    })();
  }, [hash]);

  useEffect(() => {
    if (receipt) {
      readGreet();
    }
  }, [receipt]);

  return (
    <>
      {account ? (
        <>
          <div>Connected: {account}</div>
          <div>Greeting Message: {greeting}</div>
          <input
            type="text"
            placeholder="Enter new greeting"
            value={newGreeting}
            onChange={(e) => setNewGreeting(e.target.value)}
          />
          <button onClick={updateGreeting}>Set New Greeting</button>
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
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Example />
);
