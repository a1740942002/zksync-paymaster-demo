export const greeterContract = {
  address: '0xbC54fF78808BfD4C0B5dE7FE1ec646345CC3EdCa',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_greeting',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'greet',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_greeting',
          type: 'string',
        },
      ],
      name: 'setGreeting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const;
