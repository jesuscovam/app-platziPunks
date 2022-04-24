import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useWeb3React } from '@web3-react/core'
import {} from '@web3-react/types'
import { hooks, metaMask, useTruncatedAddress } from '@/src/web3'
import { useCallback, useEffect, useState } from 'react'
const { useProvider } = hooks

const LOCAL_STORAGE_KEY = 'previouslyConnected' as const

const WalletData = (): JSX.Element => {
  const [balance, setBalance] = useState(0)
  const { isActive, account, connector } = useWeb3React()
  const library = useProvider()

  const connect = useCallback(() => {
    metaMask.activate(connector)
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
  }, [metaMask, connector])

  const disconnect = () => {
    metaMask.deactivate()
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  const getBalance = useCallback(async () => {
    const toSet = await library?.getBalance(account as string)
    // @ts-ignore
    setBalance((toSet / 1e18).toFixed(2))
  }, [library, account])

  useEffect(() => {
    if (isActive) getBalance()
  }, [isActive, getBalance])

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') connect()
  }, [connect])

  const truncatedAddress = useTruncatedAddress(account as string)

  return (
    <Flex alignItems={'center'}>
      {isActive ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link href={`/punks?address=${account}`}>{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            d={{
              base: 'none',
              md: 'block',
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={'solid'}
          colorScheme={'green'}
          size={'sm'}
          leftIcon={<AddIcon />}
          onClick={connect}
        >
          Conectar wallet
        </Button>
      )}
    </Flex>
  )
}

export default WalletData
