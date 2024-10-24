import { Button } from '@/components/custom/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import useLocalStorage from '@/hooks/use-local-storage'
import { extractBearerToken } from '@/lib/ws'
import axiosApiInstance from '@/services/api.services'
import { IInstance } from '@/types/IInstance'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const timestamp = new Date().getTime() // Unique timestamp

const QRCodeGenerator: React.FC = () => {
  const auth = useAuthUser<IInstance>()
  const authHeader = useAuthHeader()
  const [qrcode, setQrcode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useLocalStorage({
    key: 'connection-status',
    defaultValue: 'init',
  })
  useEffect(() => {
    const checkStatus = () => {
      axiosApiInstance
        .get(`/instance/connectionState/${auth?.name}?_=${timestamp}`)
        .then((res) => {
          setIsConnected(res.data.state)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    checkStatus()
  }, [auth?.name, setIsConnected])

  useEffect(() => {
    if (status === 'open') {
      setQrcode(null)
    }
  }, [status])

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8084/ws/events?event=connection.update&token=${extractBearerToken(authHeader!)}`
    )

    const qrws = new WebSocket(
      `ws://localhost:8084/ws/events?event=qrcode.updated&token=${extractBearerToken(authHeader!)}`
    )

    qrws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.event === 'qrcode.updated') {
        setQrcode(data.msg.base64)
        toast({
          title: 'QR updated ',
        })
      }
    }

    ws.onopen = () => {
      toast({
        title: 'Connected to the WS server',
      })
    }
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.state) setIsConnected(data.state)
      toast({
        title: 'WS onmessage',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
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
                disabled={status === 'open' || status === 'connecting'}
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
              <Badge variant='outline'>
                <h2>WA Status : {isConnected}</h2>
              </Badge>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default QRCodeGenerator
