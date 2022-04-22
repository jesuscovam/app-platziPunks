import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { PlatziPunksArtifact } from './artifacts/PlatziPunks'
import Web3 from 'web3'
import type { Contract } from 'web3-eth-contract'

const { address, abi } = PlatziPunksArtifact

export function usePlatziPunks(): Contract | undefined {
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
