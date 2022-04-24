import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Heading,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NavLink from './nav-link'
import Footer from './footer'
import WalletData from './wallet-data'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Links: { name: string; to: string }[] = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Punks',
    to: '/punks',
  },
]

interface LinkToAnotherProject {
  title: string
  url: string
}

const VercelURL = 'https://platzipunks.jesuscova.com'
const DEV_URL = 'http://localhost:3000'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [otherAppLink, setOtherAppLink] = useState<LinkToAnotherProject>()

  useEffect(() => {
    const url = window.location.origin
    console.log({ url })
    if (url === VercelURL || url === DEV_URL) {
      setOtherAppLink({
        title: 'IPFS APP',
        url: 'http://platzipunksipfs.jesuscova.com',
      })
      return
    }
    setOtherAppLink({
      title: 'Vercel APP',
      url: 'https://platzipunks.jesuscova.com',
    })
  }, [setOtherAppLink])

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={'7xl'}
        width="100%"
        bg={useColorModeValue('white', 'gray.800')}
        px={4}
      >
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Flex alignItems="center">
              <Image src="/platzi.svg" width="80px" />
              <Heading size="md" color="purple" mt={0.2} ml={1}>
                Punks
              </Heading>
            </Flex>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(({ name, to }) => (
                <NavLink key={name} href={to}>
                  {name}
                </NavLink>
              ))}
              <a
                href={otherAppLink?.url}
                target="_blank"
                rel="no opener"
                className="font-bold text-indigo-500"
              >
                {otherAppLink?.title}
              </a>
            </HStack>
          </HStack>
          <WalletData />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, to }) => (
                <NavLink key={name} href={to}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}

export default MainLayout
