import { usePlatziPunks } from '@/src/usePlatziPunks'
import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import { useState, useEffect, useCallback } from 'react'

const Home: NextPage = () => {
  const [maxSupply, setMaxSupply] = useState<number>(0)
  const { isActive } = useWeb3React()
  const platziPunks = usePlatziPunks()
  const getMaxSupply = useCallback(async () => {
    if (platziPunks) {
      const result = await platziPunks.methods.maxSupply().call()
      setMaxSupply(result)
    }
  }, [platziPunks])

  useEffect(() => {
    getMaxSupply()
  }, [getMaxSupply])

  if (!isActive) return <p>Conecta tu wallet</p>

  return (
    <div>
      <p>maxSupply: {maxSupply}</p>
    </div>
  )
}

export default Home
