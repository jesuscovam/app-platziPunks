import { initializeConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'
import { useMemo, useCallback } from 'react'
import Web3 from 'web3'

// @ts-ignore
export const useGetWeb3 = () => {
  // @ts-ignore
  const web3 = useMemo(() => new Web3(window?.ethereum), [])
  return web3
}

export const [metaMask, hooks] = initializeConnector<Connector>(
  (actions) => new MetaMask(actions)
)

export const useTruncatedAddress = (account: string) => {
  const truncated = useMemo(
    () => `${account?.substr(0, 6)}...${account?.substr(-4)}`,
    [account]
  )

  return truncated
}

export default useTruncatedAddress
