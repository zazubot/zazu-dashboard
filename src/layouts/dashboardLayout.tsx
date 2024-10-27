import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from '../components/skip-to-main'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'
import useLocalStorage from '@/hooks/use-local-storage'
import { IInstanceStatus } from '@/types/IInstance'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useEffect } from 'react'
import { socket } from '@/lib/ws'
import { toast } from '@/components/ui/use-toast'

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [instance] = useLocalStorage<IInstanceStatus | undefined>({
    key: 'instance-status',
    defaultValue: {},
  })

  useEffect(() => {
    socket('connection.update', (msg) => {
      toast({
        title: 'connection.update',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(msg, null, 2)}</code>
          </pre>
        ),
      })
      if (msg.state === 'open' || msg.state === 'close')
        return window.location.reload()
    })

    socket('messages.upsert', (msg) => {
      if (msg.keyFromMe === false)
        toast({
          title: `New ${msg.messageType} Message from ${msg.pushName}`,
          description:
            msg.messageType === 'conversation' ? msg.content?.text : '',
        })
    })
  }, [])
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Layout>
          {/* ===== Top Heading ===== */}
          <Layout.Header>
            <TopNav links={topNav} />
            <div className='ml-auto flex items-center space-x-4'>
              <Search />

              <ThemeSwitch />
              <UserNav />
            </div>
          </Layout.Header>
          {instance?.Whatsapp?.connection.state !== 'open' && (
            <Layout.Body>
              <Alert variant='destructive'>
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>
                  Your WhatsApp status is currently not accessible. Please
                  reconnect to continue.
                </AlertDescription>
              </Alert>
            </Layout.Body>
          )}
          <Outlet />
        </Layout>
      </main>
    </div>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
  },
]
