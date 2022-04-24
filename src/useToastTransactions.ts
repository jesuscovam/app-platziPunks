import { useToast } from '@chakra-ui/react'

interface ToastTransaction {
  toastSuccess: (title?: string, description?: string) => void
  toastTxHash: (hash: string) => void
  toastError: (error: Error) => void
}

export function useToastTransactions(): ToastTransaction {
  const toast = useToast()

  const toastSuccess = (title?: string, description?: string) => {
    toast({
      position: 'top',
      title: title ?? 'Transacción completada',
      description: description ?? 'nunca pares de aprender',
      status: 'success',
    })
  }

  const toastTxHash = (hash: string) => {
    toast({
      position: 'top',
      title: 'Transacción enviada',
      description: hash,
      status: 'info',
    })
  }

  const toastError = (error: Error) => {
    toast({
      position: 'top',
      title: 'Transacción fallida',
      description: error.message,
      status: 'error',
    })
  }

  return { toastError, toastSuccess, toastTxHash }
}
