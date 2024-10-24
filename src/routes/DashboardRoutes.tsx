import { lazy } from 'react'

/****Layouts*****/
const DashboardLayout = lazy(() => import('../layouts/dashboardLayout.tsx'))

/*** ERROR  */
const ErrorPage = lazy(() => import('../pages/public/errors/general-error.tsx'))

/***** Admin Pages ****/
const DashboardPage = lazy(() => import('../pages/admin/dashboard/index.tsx'))
const AnalysisPage = lazy(() => import('../pages/admin/analysis/index.tsx'))
const CampaignPage = lazy(() => import('../pages/admin/campaign/index.tsx'))
const ContactsPage = lazy(() => import('../pages/admin/contacts/index.tsx'))
const ChatsPage = lazy(() => import('../pages/admin/chats/index.tsx'))
const AppsPage = lazy(() => import('../pages/admin/apps/index.tsx'))

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
    { path: '/dashboard/analysis', element: <AnalysisPage />, exact: true },

    {
      path: '*',
      element: <ErrorPage />,
    },
  ],
}

export default DashboardRoutes
