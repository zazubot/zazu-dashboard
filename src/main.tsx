import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthProvider from 'react-auth-kit'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import authStore from '@/lib/authStore'
import '@/index.css'
import Approuter from './routes/Router'
import { Suspense } from 'react'
import Loader from './components/loader'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loader />}>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider store={authStore}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
          <RouterProvider router={Approuter} />
        </GoogleOAuthProvider>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  </Suspense>
)
