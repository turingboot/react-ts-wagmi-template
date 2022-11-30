import { configureChains, chain, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


const { chains, provider, webSocketProvider } = configureChains(
  [chain.localhost,chain.hardhat,chain.sepolia],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [new MetaMaskConnector({ chains }),]
})


export default function WagmiProvider({ children }: { children: JSX.Element }) {

  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )

}