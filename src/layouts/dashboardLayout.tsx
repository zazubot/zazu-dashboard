import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from '../components/skip-to-main'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'
import { StatusProvider } from '@/context/StatusContext'

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()

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
          <StatusProvider>
            <Outlet />
          </StatusProvider>
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
