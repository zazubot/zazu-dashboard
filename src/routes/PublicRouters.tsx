import { lazy } from 'react'

/*** Layout  */
const PublicLayout = lazy(() => import('../layouts/PublicLayout.tsx'))

/*** Layout  */
const LandingPage = lazy(() => import('../pages/public/landing/landing.tsx'))
const PrivacyPage = lazy(() => import('../pages/public/law/privacy.tsx'))
const TermsPage = lazy(() => import('../pages/public/law/terms.tsx'))
const LoginPage = lazy(() => import('../pages/public/auth/login.tsx'))
const ErrorPage = lazy(() => import('../pages/public/errors/general-error.tsx'))

/*****Routes******/
const PublicRoutes = {
  path: '/',
  element: <PublicLayout />,
  children: [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/privacy', element: <PrivacyPage /> },
    { path: '/terms', element: <TermsPage /> },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ],
}

export default PublicRoutes
