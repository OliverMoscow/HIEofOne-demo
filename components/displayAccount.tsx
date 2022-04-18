import { useAccount, useConnect } from 'wagmi'

export const DisplayAccount = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (accountData) {
    return (
      <div>
        <img src={accountData.ens?.avatar} alt="ENS Avatar" />
        <div>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address}
        </div>
        <div>Connected to {accountData.connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return <h1>DisplayAccount</h1>
}