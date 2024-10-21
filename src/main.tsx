import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthProvider from 'react-auth-kit'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import authStore from '@/lib/authStore'
import router from '@/router'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider store={authStore}>
      <GoogleOAuthProvider clientId='383283859819-vl8n18ad3oq8fh0mkee0vrhlj4hqiaad.apps.googleusercontent.com'>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
)
