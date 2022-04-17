import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { hooks, metaMask } from '@/src/web3'

import { PlatziPunksArtifact } from './artifacts/PlatziPunks'
import Web3 from 'web3'

const { address, abi } = PlatziPunksArtifact

export function usePlatziPunks() {
  const { chainId, isActive } = useWeb3React()

  const platziPunks = useMemo(() => {
    if (isActive) {
      // @ts-ignore
      const web3 = new Web3(window?.ethereum)
      // @ts-ignore
      return new web3.eth.Contract(abi, address[chainId as 4])
    }
  }, [isActive, chainId])

  return platziPunks
}
