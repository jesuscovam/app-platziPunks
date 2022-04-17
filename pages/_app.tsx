import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import { metaMask, hooks } from '@/src/web3'
import MainLayout from '@/components/layout/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3ReactProvider
        network={{ name: 'Rinkeby', chainId: 4 }}
        connectors={[[metaMask, hooks]]}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Web3ReactProvider>
    </ChakraProvider>
  )
}

export default MyApp
