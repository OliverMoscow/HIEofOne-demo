import * as React from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import ConnectWallet from "../components/connectWallet";
import CreateAccount from "../components/createAccount";

//Landing Page
const Home = () => {
  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();

  //state variables update ui when changed
  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});
  const [, signMessage] = useSignMessage();

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } finally {
        setState((x) => ({ ...x, loading: false }));
      }
    };
    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  if (state.address) {
    return (
      <div>
        <hr className="solid" />
        <h1>Sign-in to Trustee</h1>
        <div className="section">
          <hr className="solid" />
          <div className="section-num">
            <h2> 1. </h2>
          </div>
          <div className="section-content">
            <h2>Etherium Account Connected</h2>
            <div className="etheriumAddress">Signed in as {state.address}</div>
            <button
              onClick={async () => {
                await fetch("/api/logout");
                setState({});
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
        <CreateAccount />
      </div>
    );
  }

  return (
    <div>
      <hr className="solid" />
      <h1>Sign-in to Trustee</h1>
      <ConnectWallet />
    </div>
  );
};

export default Home;
