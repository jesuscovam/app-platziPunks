import { useCallback, useEffect, useState } from 'react'
import type { Contract } from 'web3-eth-contract'
import { usePlatziPunks } from './usePlatziPunks'

interface PunksMetadata {
  description: string
  image: string
  name: string
}

interface PunkData extends PunksMetadata {
  tokenURI: string
  tokenId: string
  dna: string
  owner: string
  attributes: PunkAttributes
}

interface PunkAttributes {
  accesoriesType: string
  clotheColor: string
  clotheType: string
  eyeType: string
  eyebrowType: string
  facialHairColor: string
  gatColor: string
  graphicType: string
  nouthType: string
  skinColor: string
  topType: string
  zodiacSign: string
}

async function getPunkData(
  platziPunks: Contract,
  tokenId: string
): Promise<PunkData> {
  const [
    tokenURI,
    dna,
    owner,
    accesoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyebrowType,
    facialHairColor,
    gatColor,
    graphicType,
    nouthType,
    skinColor,
    topType,
    zodiacSign,
  ] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.tokenDNA(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
    platziPunks.methods.getAccesoriesType(tokenId).call(),
    platziPunks.methods.getClotheColor(tokenId).call(),
    platziPunks.methods.getClotheType(tokenId).call(),
    platziPunks.methods.getEyeType(tokenId).call(),
    platziPunks.methods.getEyebrowType(tokenId).call(),
    platziPunks.methods.getFacialHairColor(tokenId).call(),
    platziPunks.methods.getHatColor(tokenId).call(),
    platziPunks.methods.getGraphicType(tokenId).call(),
    platziPunks.methods.getMouthType(tokenId).call(),
    platziPunks.methods.getSkinColor(tokenId).call(),
    platziPunks.methods.getTopType(tokenId).call(),
    platziPunks.methods.getZodiacSign(tokenId).call(),
  ])

  const responseMetadata = await fetch(tokenURI)
  const metadata: PunksMetadata = await responseMetadata.json()

  return {
    tokenId,
    attributes: {
      accesoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyebrowType,
      facialHairColor,
      gatColor,
      graphicType,
      nouthType,
      skinColor,
      topType,
      zodiacSign,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  }
}

// Plural
export function usePlatziPunksData(): { punks: PunkData[]; loading: boolean } {
  const [punks, setPunks] = useState<PunkData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const platziPunks = usePlatziPunks()

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true)

      const totalSupply = Number(await platziPunks.methods.totalSupply().call())
      const tokenIds = new Array(totalSupply)
        .fill(totalSupply)
        .map((_, index) => index)

      const punksPromise = tokenIds.map((tokenId) =>
        getPunkData(platziPunks, String(tokenId))
      )

      const punks = await Promise.all(punksPromise)

      setPunks(punks)

      setLoading(false)
    }
  }, [platziPunks])

  useEffect(() => {
    update()
  }, [update])

  return { punks, loading }
}

export function usePlatziPunkData(tokenId: string): {
  punk: PunkData | undefined
  loading: boolean
} {
  const [punk, setPunk] = useState<PunkData>()
  const [loading, setLoading] = useState<boolean>(true)
  const platziPunks = usePlatziPunks()

  const update = useCallback(async () => {
    if (platziPunks && tokenId) {
      setLoading(true)
      const punk = await getPunkData(platziPunks, tokenId)
      setPunk(punk)
      setLoading(false)
    }
  }, [setPunk, platziPunks, tokenId])

  useEffect(() => {
    update()
  }, [update])

  return { punk, loading }
}
