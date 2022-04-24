import { LayoutTitle } from '@/components/layout/LayoutTitle'
import { PunkCard } from '@/components/punkCard'
import { RequestAccess } from '@/components/requestAccess'
import { Loading } from '@/components/spinner'
import { usePlatziPunks } from '@/src/usePlatziPunks'
import { usePlatziPunkData } from '@/src/usePlatziPunksData'
import { useToastTransactions } from '@/src/useToastTransactions'
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
  useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Web3 from 'web3'

export default function Punk(): JSX.Element {
  const { isActive, account } = useWeb3React()
  const router = useRouter()
  const { tokenId } = router?.query as { tokenId: string }
  const platziPunks = usePlatziPunks()
  const { punk, loading, update } = usePlatziPunkData(tokenId)
  const isOwner = punk?.owner === account

  const toast = useToast()
  const toastTransaction = useToastTransactions()
  const [transfering, setTransfering] = useState<boolean>(false)
  const transfer = () => {
    setTransfering(true)
    const address = prompt('Ingresa la direccion')
    if (!address) {
      toast({
        status: 'error',
        title: 'No hay dirección',
      })
      return
    }

    // @ts-ignore
    const web3 = new Web3(window.ethereum)
    const isAddress = web3.utils.isAddress(address)

    if (!isAddress) {
      toast({
        status: 'error',
        title: 'dirección invalida',
        description: 'la dirección no es de ethereum',
      })
      setTransfering(false)
      return
    }

    platziPunks?.methods
      .safeTransferFrom(punk?.owner, address, punk?.tokenId)
      .send({
        from: account,
      })
      .on('error', (error: Error) => {
        setTransfering(false)
        toastTransaction.toastError(error)
      })
      .on('transactionHash', (txHash: string) =>
        toastTransaction.toastTxHash(txHash)
      )
      .on('receipt', () => {
        setTransfering(false)
        toastTransaction.toastSuccess(
          undefined,
          `El punk ahora pertenece a ${address}`
        )
        update()
      })
  }

  if (!isActive) return <RequestAccess />

  if (loading) return <Loading />

  return (
    <LayoutTitle>
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
          <Button
            onClick={transfer}
            disabled={!isOwner}
            isLoading={transfering}
            colorScheme="green"
          >
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
    </LayoutTitle>
  )
}
