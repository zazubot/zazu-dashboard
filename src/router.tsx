import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import GeneralError from './pages/public/errors/general-error.tsx'
import NotFoundError from './pages/public/errors/not-found-error.tsx'
import MaintenanceError from './pages/public/errors/maintenance-error.tsx'
import UnauthorisedError from './pages/public/errors/unauthorised-error.tsx'

/****Layouts*****/

/***** Client Pages ****/

const router = [
  // Auth routes
  // Main routes
  {
    element: <AuthOutlet fallbackPath='/login' />,
    // path: '/',
    // lazy: async () => {
    //   const AppShell = await import('./components/app-shell')
    //   return { Component: AppShell.default }
    // },
    errorElement: <GeneralError />,
    children: [
      {
        path: '/',
        lazy: async () => ({
          Component: (await import('./pages/admin/dashboard/index.tsx'))
            .default,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          Component: (await import('@/pages/admin/tasks/index.tsx')).default,
        }),
      },
      {
        path: 'chats',
        lazy: async () => ({
          Component: (await import('@/pages/admin/chats/index.tsx')).default,
        }),
      },
      {
        path: 'apps',
        lazy: async () => ({
          Component: (await import('@/pages/admin/apps/index.tsx')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },

      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/admin/settings/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/profile/index.tsx')
              ).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/account/index.tsx')
              ).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/appearance/index.tsx')
              ).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/notifications/index.tsx')
              ).default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/display/index.tsx')
              ).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (
                await import('./pages/admin/settings/error-example/index.tsx')
              ).default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },
  {
    path: '/privacy',
    lazy: async () => ({
      Component: (await import('./pages/public/law/privacy.tsx')).default,
    }),
  },
  {
    path: '/terms',
    lazy: async () => ({
      Component: (await import('./pages/public/law/terms.tsx')).default,
    }),
  },
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/public/auth/login.tsx')).default,
    }),
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]

export default router
