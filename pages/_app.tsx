import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import Layout from "../components/layout";
import '../styles/globals.css'


// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID;

// Chains for connectors to support
const chains = defaultChains;

// Set up connectors
//@ts-ignore
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    // new InjectedConnector({
    //   chains,
    //   options: { shimDisconnect: true },
    // }),
    // new WalletConnectConnector({
    //   options: {
    //     infuraId,
    //     qrcode: true,
    //   },
    // }),
    new WalletLinkConnector({
      options: {
        appName: "HIE of One",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

//@ts-ignore
const MyApp = ({ Component, pageProps, auth }) => {
  return (
    //@ts-ignore
    <Provider autoConnect connectors={connectors}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default MyApp;
