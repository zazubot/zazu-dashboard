import { lazy } from 'react'

/****Layouts*****/
const DashboardLayout = lazy(() => import('../layouts/dashboardLayout.tsx'))
const SettingsLayout = lazy(() => import('../pages/admin/settings/index.tsx'))

/*** ERROR  */
const ErrorPage = lazy(() => import('../pages/public/errors/general-error.tsx'))

/***** Admin Pages ****/
const DashboardPage = lazy(() => import('../pages/admin/dashboard/index.tsx'))
const AnalysisPage = lazy(() => import('../pages/admin/analysis/index.tsx'))
const CampaignPage = lazy(() => import('../pages/admin/campaign/index.tsx'))
const ContactsPage = lazy(() => import('../pages/admin/contacts/index.tsx'))
const ChatsPage = lazy(() => import('../pages/admin/chats/index.tsx'))
const AppsPage = lazy(() => import('../pages/admin/apps/index.tsx'))

/***** Settings Pages ****/
const ProfilePage = lazy(
  () => import('../pages/admin/settings/profile/index.tsx')
)
const AccountPage = lazy(
  () => import('../pages/admin/settings/account/index.tsx')
)
const AppearancePage = lazy(
  () => import('../pages/admin/settings/appearance/index.tsx')
)
const DisplayPage = lazy(
  () => import('../pages/admin/settings/display/index.tsx')
)
const NotificationsPage = lazy(
  () => import('../pages/admin/settings/notifications/index.tsx')
)

/*****Routes******/
const DashboardRoutes = {
  path: '/dashboard',
  element: <DashboardLayout />,
  children: [
    { path: '/dashboard', element: <DashboardPage />, exact: true },
    { path: '/dashboard/contacts', element: <ContactsPage />, exact: true },
    { path: '/dashboard/campaign', element: <CampaignPage />, exact: true },
    { path: '/dashboard/chats', element: <ChatsPage />, exact: true },
    { path: '/dashboard/apps', element: <AppsPage />, exact: true },
    {
      path: '/dashboard/settings',
      element: <SettingsLayout />,
      children: [
        { path: '/dashboard/settings', element: <ProfilePage />, exact: true },
        {
          path: '/dashboard/settings/appearance',
          element: <AppearancePage />,
          exact: true,
        },
        {
          path: '/dashboard/settings/notifications',
          element: <NotificationsPage />,
          exact: true,
        },
        {
          path: '/dashboard/settings/display',
          element: <DisplayPage />,
          exact: true,
        },
        {
          path: '/dashboard/settings/account',
          element: <AccountPage />,
          exact: true,
        },
      ],
    },
    { path: '/dashboard/analysis', element: <AnalysisPage />, exact: true },

    {
      path: '*',
      element: <ErrorPage />,
    },
  ],
}

export default DashboardRoutes
