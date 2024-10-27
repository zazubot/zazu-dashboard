import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom'
import { IInstance, IInstanceStatus } from '@/types/IInstance'
import axiosApiInstance from '@/services/api.services'
import useLocalStorage from '@/hooks/use-local-storage'
import { extractWANumber } from '@/lib/fn'
import { Badge } from './ui/badge'
export function UserNav() {
  const auth = useAuthUser<IInstance>()
  const signOut = useSignOut()
  const navigate = useNavigate()
  const [instance] = useLocalStorage<IInstanceStatus | undefined>({
    key: 'instance-status',
    defaultValue: {},
  })
  const signOutNavigate = () => {
    axiosApiInstance.delete('/instance/logout/' + auth?.name).finally(() => {
      signOut()
      localStorage.clear()
      navigate('/')
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={instance?.profilePicUrl} alt='@shadcn' />
            <AvatarFallback>WA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-xs leading-none text-muted-foreground'>
              {auth?.name}
            </p>
            <p className='text-sm font-medium leading-none'>
              {extractWANumber(instance?.ownerJid)}
            </p>
            <Badge variant='destructive'>{instance?.connectionStatus}</Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOutNavigate}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
