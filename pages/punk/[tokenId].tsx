import { PunkCard } from '@/components/punkCard'
import { RequestAccess } from '@/components/requestAccess'
import { Loading } from '@/components/spinner'
import { usePlatziPunkData } from '@/src/usePlatziPunksData'
import {
  Stack,
  Button,
  Heading,
  Tag,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

export default function Punk(): JSX.Element {
  const { isActive, account } = useWeb3React()
  const router = useRouter()
  const { tokenId } = router?.query as { tokenId: string }

  const { punk, loading } = usePlatziPunkData(tokenId)
  console.log({ account, owner: punk?.owner })
  const isOwner = punk?.owner === account

  if (!isActive) return <RequestAccess />

  if (loading) return <Loading />

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack>
        <PunkCard
          tokenId={tokenId}
          mx={{
            base: 'auto',
            md: 0,
          }}
          name={punk?.name as string}
          image={punk?.image as string}
        />
        <Button disabled={!isOwner} colorScheme="green">
          {!isOwner ? 'No eres el dueño' : 'Transferir'}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{punk?.name}</Heading>
        <Text fontSize="xl">{punk?.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {punk?.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {punk?.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Atributo</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          {punk && (
            <Tbody>
              {Object.entries(punk?.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Stack>
    </Stack>
  )
}
