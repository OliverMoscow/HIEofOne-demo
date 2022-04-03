import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "./styles.css"
import { WagmiProvider } from "wagmi"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiProvider>
  )
}