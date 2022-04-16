import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { metaMask, hooks } from '@/src/web3'
import MainLayout from '@/components/layout/index'

declare let window: {
  ethereum: any
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!window.ethereum) {
      alert('Por favor descarga un proveedor de ethereum')
      return
    }

    const web3 = new Web3(window.ethereum)
    web3.eth.requestAccounts().then(console.log)
  }, [])
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
