import { PunkCard } from '@/components/punkCard'
import { RequestAccess } from '@/components/requestAccess'
import { Loading } from '@/components/spinner'
import { usePlatziPunksData } from '@/src/usePlatziPunksData'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Grid,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Input,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'

export default function Punks() {
  const { isActive } = useWeb3React()
  const router = useRouter()

  const [address, setAddress] = useState<string>('')
  useEffect(() => {
    if (router.asPath) {
      // @ts-ignore
      const web3 = new Web3(window.ethereum)
      const searchAddress = router.asPath.slice(7)
      const value = new URLSearchParams(searchAddress).get('address') as string

      const isValid = web3.utils.isAddress(value)

      if (isValid) {
        addSearch(value)
        return
      }
      setAddress('')
      setValidAddress(false)
      setSubmit(false)
    }
  }, [router.asPath, Web3])
  const [submitted, setSubmit] = useState<boolean>(false)
  const [validAddress, setValidAddress] = useState<boolean>(false)
  const { punks, loading } = usePlatziPunksData({
    owner: validAddress && submitted ? address : undefined,
  })

  const clearURL = () => router.push('/punks', undefined, { shallow: true })
  const addSearch = (address: string) => {
    setAddress(address)
    setValidAddress(true)
    setSubmit(true)
    router.push(`/punks?address=${address}`, undefined, { shallow: true })
  }

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { value },
    } = event
    setAddress(value)
    setSubmit(false)
    setValidAddress(false)

    if (value === '') {
      clearURL()
    }
  }

  const searchAddress = (event: React.FormEvent) => {
    event.preventDefault()
    // @ts-ignore
    const web3 = new Web3(window.ethereum)
    if (address) {
      const isValid = web3.utils.isAddress(address)
      setValidAddress(isValid)
      setSubmit(true)
      if (isValid)
        router.push(`/punks?address=${address}`, undefined, { shallow: true })
    } else {
      clearURL()
      setValidAddress(false)
    }
  }

  if (!isActive) return <RequestAccess />

  return (
    <>
      <form onSubmit={searchAddress}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              isInvalid={false}
              value={address ?? ''}
              placeholder="buscar por dirección"
              onChange={handleAddressChange}
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Dirección invalida</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {punks?.map(({ image, name, tokenId }) => (
            <PunkCard
              key={tokenId}
              image={image}
              name={name}
              tokenId={tokenId}
            />
          ))}
        </Grid>
      )}
    </>
  )
}
