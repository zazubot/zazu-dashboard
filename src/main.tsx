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
  <GoogleOAuthProvider clientId='383283859819-vl8n18ad3oq8fh0mkee0vrhlj4hqiaad.apps.googleusercontent.com'>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider store={authStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  </GoogleOAuthProvider>
)
