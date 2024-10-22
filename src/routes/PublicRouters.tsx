import { lazy } from 'react'

/*** Layout  */
const PublicLayout = lazy(() => import('../layouts/PublicLayout.tsx'))

/*** Layout  */
const LandingPage = lazy(() => import('../pages/public/landing/landing.tsx'))
const PrivacyPage = lazy(() => import('../pages/public/law/privacy.tsx'))
const TermsPage = lazy(() => import('../pages/public/law/terms.tsx'))
const NotFoundError = lazy(
  () => import('../pages/public/errors/not-found-error.tsx')
)

/*****Routes******/
const PublicRoutes = {
  path: '/',
  element: <PublicLayout />,
  children: [
    { path: '/', element: <LandingPage /> },
    { path: '/privacy', element: <PrivacyPage /> },
    { path: '/terms', element: <TermsPage /> },
    {
      path: '*',
      element: <NotFoundError />,
    },
  ],
}

export default PublicRoutes
