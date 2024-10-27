import { LogOutIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { IInstance, IInstanceStatus } from '@/types/IInstance'
import useLocalStorage from '@/hooks/use-local-storage'
import { useEffect } from 'react'
import axiosApiInstance from '@/services/api.services'
import { extractWANumber } from '@/lib/fn'

const timestamp = new Date().getTime() // Unique timestamp

export default function WAStatus() {
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

  const WA_Logout = () => {
    axiosApiInstance
      .delete(`/instance/logout/${auth?.name}?_=${timestamp}`)
      .then(() => {
        window.location.reload()
      })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>WA Connections Status</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div>
          <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
            <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {instance?.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {extractWANumber(instance?.ownerJid)}
              </p>
            </div>
          </div>

          <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
            <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {instance?.connectionStatus}
              </p>
              <p className='text-sm text-muted-foreground'>
                {instance?.Whatsapp?.connection?.state} -
                {instance?.Whatsapp?.connection?.statusReason}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='destructive' className='w-full' onClick={WA_Logout}>
          <LogOutIcon /> Logout Whatsapp Device
        </Button>
      </CardFooter>
    </Card>
  )
}
