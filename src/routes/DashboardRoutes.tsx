import { lazy } from 'react'

/****Layouts*****/
const DashboardLayout = lazy(() => import('../layouts/dashboardLayout.tsx'))

/*** ERROR  */
const ErrorPage = lazy(() => import('../pages/public/errors/general-error.tsx'))

/***** Admin Pages ****/
const DashboardPage = lazy(() => import('../pages/admin/dashboard/index.tsx'))

/*****Routes******/
const DashboardRoutes = {
  path: '/dashboard',
  element: <DashboardLayout />,
  children: [
    { path: '/dashboard', element: <DashboardPage />, exact: true },

    {
      path: '*',
      element: <ErrorPage />,
    },
  ],
}

export default DashboardRoutes
