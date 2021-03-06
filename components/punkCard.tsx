import { Box, useColorModeValue, Heading, Stack, Image } from '@chakra-ui/react'
import NavLink from './layout/nav-link'

interface CardProps {
  mx?: {
    base: string
    md: number
  }
  image: string
  name: string
  tokenId: string
}

export const PunkCard = ({ image, name, tokenId, ...props }: CardProps) => {
  const route = `/punk/${tokenId}`
  return (
    <NavLink href={route}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        {...props}
      >
        <Box
          rounded={'lg'}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
        </Stack>
      </Box>
    </NavLink>
  )
}
