import { SiweMessage } from "siwe";
import { useConnect } from "wagmi";

export default function ConnectWallet() {
  const [{ data, error }, connect] = useConnect();

  //@ts-ignore
  const signIn = async (connector) => {
    try {
      const res = await connect(connector); // connect from useConnect
      if (!res.data) throw res.error ?? new Error("Something went wrong");

      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address: res.data.account,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: res.data.chain?.id,
        nonce: await nonceRes.text(),
      });

      const signer = await connector.getSigner();
      const signature = await signer.signMessage(message.prepareMessage());

      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      //@ts-ignore

      window.location.reload(false);
    } catch (error) {
      // Do something with the error
    }
  };
  return (
    <div className="section">
      <hr className="solid" />
      <div className="section-num">
        <h3> 1. </h3>
      </div>

      <div className="section-content">
        <h2>Connect Etherium Wallet</h2>
        {data.connectors.map((connector) => (
          <button
            // disabled={!connector.ready}
            key={connector.id}
            onClick={() => signIn(connector)}
          >
            {connector.name}
            {/* {!connector.ready} */}
          </button>
        ))}
        {error && <div>{error?.message ?? "Failed to connect"}</div>}
      </div>
    </div>
  );
}
