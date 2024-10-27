import { Button } from '@/components/custom/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import useLocalStorage from '@/hooks/use-local-storage'
import { socket } from '@/lib/ws'
import axiosApiInstance from '@/services/api.services'
import { IInstance, IInstanceStatus } from '@/types/IInstance'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const timestamp = new Date().getTime() // Unique timestamp

const QRCodeGenerator: React.FC = () => {
  const auth = useAuthUser<IInstance>()
  const [qrcode, setQrcode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [instance] = useLocalStorage<IInstanceStatus | undefined>({
    key: 'instance-status',
    defaultValue: {},
  })

  useEffect(() => {
    socket('qrcode.updated', (msg) => {
      setQrcode(msg?.base64)
      toast({
        title: 'qrcode.updated',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(msg, null, 2)}</code>
          </pre>
        ),
      })
    })
  }, [])

  const WA_generateQRCode = () => {
    axiosApiInstance
      .get(`/instance/connect/${auth?.name}?_=${timestamp}`)
      .then((res) => {
        setQrcode(res.data.base64)
      })
      .catch((error) => {
        console.error('Error generating QR code:', error)
        setError('Failed to generate QR code.')
      })
  }

  const WA_Logout = () => {
    axiosApiInstance
      .delete(`/instance/logout/${auth?.name}?_=${timestamp}`)
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <Card>
      {error && (
        <Alert variant='destructive'>
          <IconAlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <CardHeader>
        <CardContent className='pl-2'>
          {qrcode ? (
            <>
              <img
                className='img-thumbnail w-50 mt-2'
                alt='QR Code'
                src={qrcode}
              />
              <h2>Connecting...</h2>
            </>
          ) : (
            <div className='flex h-5 items-center space-x-4 text-sm'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-2'
                onClick={WA_generateQRCode}
                disabled={
                  instance?.Whatsapp?.connection?.state === 'open' ||
                  instance?.Whatsapp?.connection?.state === 'connecting'
                }
              >
                Connect to WhatsApp
              </Button>
              {instance?.Whatsapp?.connection?.state === 'open' && (
                <>
                  <Button
                    type='button'
                    size='sm'
                    className='mt-2'
                    variant='destructive'
                    onClick={WA_Logout}
                  >
                    Disconnect WA
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default QRCodeGenerator
