import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthProvider from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import authStore from '@/lib/authStore'
import '@/index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
    <AuthProvider store={authStore}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
    <Toaster />
  </ThemeProvider>
)
