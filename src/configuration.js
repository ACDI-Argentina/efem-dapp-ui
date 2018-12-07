const {
  REACT_APP_ENVIRONMENT = 'localhost', // optional
  REACT_APP_DECIMALS = 8, // optional
  REACT_APP_FEATHERJS_CONNECTION_URL,
  REACT_APP_ETH_NODE_CONNECTION_URL,
  REACT_APP_LIQUIDPLEDGING_ADDRESS,
  REACT_APP_CAMPAIGN_FACTORY_ADDRESS,
  REACT_APP_CAPPED_MILESTONE_FACTORY_ADDRESS,
  REACT_APP_TOKEN_ADDRESSES,
  REACT_APP_BLOCKEXPLORER,
  REACT_APP_BUGS_EMAIL = 'bugs@giveth.io',
  REACT_APP_DEFAULT_GASPRICE = 10,
} = process.env;

const configurations = {
  localhost: {
    title: 'RSK Ganache',
    liquidPledgingAddress: '0x46579394802b5e4d2C0647436BFcc71A2d9E8478',
    lppCampaignFactoryAddress: '0x743DC1A12911e3FeEAe76344A465fF480466400e',
    lppCappedMilestoneFactoryAddress: '0xf810f023A14A26d89A26430DeB972baFE6d88a58',
    etherscan: 'https://etherscan.io/', // this won't work, only here so we can see links during development
    feathersConnection: 'http://localhost:3030',
    nodeConnection: 'http://localhost:8548',
    nodeId: 88,
    networkName: 'RSK Ganache',
    ipfsGateway: 'http://localhost:8080/ipfs/',
    sendErrors: false,
    analytics: {
      ga_UA: 'UA-103956937-3',
      useGoogleAnalytics: true,
      useHotjar: false,
    },
  },
  rsk: {
    title: 'RSK',
    liquidPledgingAddress: '0x6aAEB5Bc96E54668e8dc02296554f1901aA12900',
    lppCampaignFactoryAddress: '0xe340b1ec0034c80E12f95552B10E4f83Eb514064',
    lppCappedMilestoneFactoryAddress: '0x8696dBC9E10451fA60EBAD176cD540968ba1e87a',
    etherscan: 'https://etherscan.io/', // this won't work, only here so we can see links during development
    feathersConnection: 'http://18.130.79.53:3031',
    nodeConnection: 'https://rinkeby.infura.io',
    networkName: 'Home Ganache',
    sendErrors: false,
    analytics: {
      ga_UA: 'UA-103956937-3',
      useGoogleAnalytics: false,
      useHotjar: false,
    },
  },
  develop: {
    title: 'develop',
    liquidPledgingAddress: '0xf0e0F5A752f69Ee6dCfEed138520f6821357dc32',
    lppCampaignFactoryAddress: '0x3FE8A2f8FE8F5846A428F46B29F3Ed57D23bf2A4',
    lppCappedMilestoneFactoryAddress: '0x3293E0B22b63550994e994E729C0A98610fD0E2f',
    etherscan: 'https://rinkeby.etherscan.io/',
    feathersConnection: 'https://feathers.develop.giveth.io',
    nodeConnection: 'https://rinkeby.giveth.io',
    nodeId: 3,
    networkName: 'Ropsten',
    ipfsGateway: 'https://ipfs.giveth.io/ipfs/',
    analytics: {
      ga_UA: 'UA-103956937-5',
      useGoogleAnalytics: true,
      useHotjar: false,
    },
  },
  release: {
    title: 'release',
    liquidPledgingAddress: '0x8e17d4f6BD5fC32626B4224D0e372E380cfa1082',
    lppCampaignFactoryAddress: '0xDf1a5AEbF8b4B8a0be6a638b9FBF18FcDDA1A9f5',
    lppCappedMilestoneFactoryAddress: '0x8A20c8C505648Bfd14e5051A756ccab37912C45f',
    etherscan: 'https://rinkeby.etherscan.io/',
    feathersConnection: 'https://feathers.release.giveth.io',
    nodeConnection: 'https://rinkeby.giveth.io',
    nodeId: 3,
    networkName: 'Ropsten',
    ipfsGateway: 'https://ipfs.giveth.io/ipfs/',
    analytics: {
      ga_UA: 'UA-103956937-4',
      useGoogleAnalytics: true,
      useHotjar: false,
    },
  },
  beta: {
    title: 'beta',
    liquidPledgingAddress: '0x8eB047585ABeD935a73ba4b9525213F126A0c979',
    lppCampaignFactoryAddress: '0x71408CE2125b1F07f614b93C8Bd0340e8Fc31CFA',
    lppCappedMilestoneFactoryAddress: '0x19e88e279844f0201079b39c736a94b87b32b6b6',
    etherscan: 'https://rinkeby.etherscan.io/',
    feathersConnection: 'https://feathers.beta.giveth.io',
    nodeConnection: 'https://rinkeby.giveth.io',
    nodeId: 1,
    networkName: 'Mainnet',
    ipfsGateway: 'https://ipfs.giveth.io/ipfs/',
    analytics: {
      ga_UA: 'UA-103956937-2',
      useGoogleAnalytics: true,
      useHotjar: true,
    },
  },
};

// Unknown environment
if (configurations[REACT_APP_ENVIRONMENT] === undefined)
  throw new Error(
    `There is no configuration object for environment: ${REACT_APP_ENVIRONMENT}. Expected REACT_APP_ENVIRONMENT to be empty or one of: ${Object.keys(
      configurations,
    )}`,
  );

// Create config object based on environment setup
const config = Object.assign({}, configurations[REACT_APP_ENVIRONMENT]);

// Overwrite the environment values with parameters
config.liquidPledgingAddress = REACT_APP_LIQUIDPLEDGING_ADDRESS || config.liquidPledgingAddress;
config.campaignFactoryAddress =
  REACT_APP_CAMPAIGN_FACTORY_ADDRESS || config.lppCampaignFactoryAddress;
config.cappedMilestoneFactoryAddress =
  REACT_APP_CAPPED_MILESTONE_FACTORY_ADDRESS || config.lppCappedMilestoneFactoryAddress;
config.tokenAddresses = REACT_APP_TOKEN_ADDRESSES
  ? JSON.parse(REACT_APP_TOKEN_ADDRESSES)
  : config.tokenAddresses;
config.etherscan = REACT_APP_BLOCKEXPLORER || config.etherscan;
config.feathersConnection = REACT_APP_FEATHERJS_CONNECTION_URL || config.feathersConnection;
config.nodeConnection = REACT_APP_ETH_NODE_CONNECTION_URL || config.nodeConnection;
config.decimals = REACT_APP_DECIMALS;
config.bugsEmail = REACT_APP_BUGS_EMAIL;
config.defaultGasPrice = REACT_APP_DEFAULT_GASPRICE;
config.sendErrors = ['develop', 'release', 'beta'].includes(REACT_APP_ENVIRONMENT);

export default config;
