import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>
            © {new Date().getFullYear()} Original designs by
            <Link ml={1} href="https://twitter.com/pablostanley">
              Pablo Stanley 🎨
            </Link>
          </Text>
          <div className="flex flex-row items-center justify-center space-x-4">
            <a
              href="https://jesuscova.com"
              target="_blank"
              rel="no opener"
              className="cursor-pointer text-indigo-400 underline"
            >
              Nextjs@12 & Web3@8 version by Jesus Cova
            </a>
            <a
              href="https://github.com/jesuscovam/app-platziPunks"
              target="_blank"
              rel="no opener"
              className="cursor-pointer text-indigo-400 underline"
            >
              Código de esta app
            </a>
          </div>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
