import { Button } from '@/components/custom/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import axiosApiInstance from '@/services/api.services'
import { IInstance } from '@/types/IInstance'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

function extractBearerToken(text: string): string | null {
  const match = text.match(/Bearer\s+([a-zA-Z0-9.\-_]+)/)
  return match ? match[1] : null
}
const timestamp = new Date().getTime() // Unique timestamp

const QRCodeGenerator: React.FC = () => {
  const auth = useAuthUser<IInstance>()
  const authHeader = useAuthHeader()
  const [qrcode, setQRCode] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('close')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8084/ws/events?event=connection.update&token=${extractBearerToken(authHeader!)}`
    )
    ws.onopen = () => {
      toast({
        title: 'Connected to the WS server',
      })
    }
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      toast({
        title: 'WS onmessage',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      if (data.event === 'qrcode.updated') {
        setQRCode(data.msg.base64)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      toast({
        title: 'WebSocket connection error',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      })
      setError('WebSocket connection error.')
    }

    ws.onclose = (event) => {
      toast({
        title: `Connection closed: ${event.code} - ${event.reason}`,
      })
      setTimeout(() => {
        // Attempt to reconnect or handle closure
      }, 5000)
    }
    return () => {
      ws.close()
    }
  }, [authHeader])

  const generateQRCode = () => {
    setIsLoading(true)
    axiosApiInstance
      .get(`/instance/connect/${auth?.name}?_=${timestamp}`)
      .then((res) => {
        setQRCode(res.data.base64)
      })
      .catch((error) => {
        console.error('Error generating QR code:', error)
        setError('Failed to generate QR code.')
      })
      .finally(() => setIsLoading(false))
  }

  const checkStatus = () => {
    setIsLoading(true)

    axiosApiInstance
      .get(`/instance/connectionState/${auth?.name}?_=${timestamp}`)
      .then((res) => {
        setStatus(res.data.state)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
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
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-2'
                onClick={generateQRCode}
              >
                Connect to WhatsApp
              </Button>
            )}
          </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardContent className='pl-2'>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-2'>
              <Button disabled={isLoading} onClick={checkStatus}>
                Check Connection Status
              </Button>
              <Badge variant='outline'>{status}</Badge>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default QRCodeGenerator
