import { PunkCard } from '@/components/punkCard'
import { RequestAccess } from '@/components/requestAccess'
import { Loading } from '@/components/spinner'
import { usePlatziPunksData } from '@/src/usePlatziPunksData'
import { Grid } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { NextPage } from 'next'

export default function Punks() {
  const { isActive } = useWeb3React()
  const { punks, loading } = usePlatziPunksData()
  if (!isActive) return <RequestAccess />

  return loading ? (
    <Loading />
  ) : (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
      {punks?.map(({ image, name, tokenId }) => (
        <PunkCard key={tokenId} image={image} name={name} tokenId={tokenId} />
      ))}
    </Grid>
  )
}
