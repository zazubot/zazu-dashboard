import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useLocalStorage from '@/hooks/use-local-storage'
import { extractWANumber } from '@/lib/fn'
import axiosApiInstance from '@/services/api.services'
import { IInstance, IInstanceStatus } from '@/types/IInstance'
import React, { useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const timestamp = new Date().getTime() // Unique timestamp

const WAStatus: React.FC = () => {
  const auth = useAuthUser<IInstance>()
  const [instance, setInstance] = useLocalStorage<IInstanceStatus | undefined>({
    key: 'instance-status',
    defaultValue: {},
  })
  useEffect(() => {
    const checkStatus = () => {
      axiosApiInstance
        .get(`/instance/fetchInstance/${auth?.name}?_=${timestamp}`)
        .then((res) => {
          setInstance(res.data)
        })
        .catch((error) => {
          console.error(error)
          setInstance({})
        })
    }
    checkStatus()
  }, [auth?.name, setInstance])

  return (
    <Card>
      <CardHeader>
        <CardContent className='pl-2'>
          <div>
            <div className='space-y-1'>
              <h4 className='text-sm font-medium leading-none'>
                {instance?.name}
              </h4>
              <p className='text-sm text-muted-foreground'>
                {extractWANumber(instance?.ownerJid)}
              </p>
            </div>
            <Separator className='my-4' />
            <div className='flex h-5 items-center space-x-4 text-sm'>
              <div> {instance?.connectionStatus}</div>
              <Separator orientation='vertical' />
              <div>{instance?.Whatsapp?.connection?.state}</div>
              <Separator orientation='vertical' />
              <div>{instance?.Whatsapp?.connection?.statusReason}</div>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default WAStatus
