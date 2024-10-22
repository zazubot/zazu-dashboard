import { Card } from '@/components/ui/card'
// import { IUser } from '../../../../types/IUser'
// import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { GoogleLogin } from '@react-oauth/google'
import { cn } from '@/lib/utils'
import axiosApiInstance from '@/services/api.services'
// import { useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

export default function Login() {
  const isAuthenticated = useIsAuthenticated()
  const authHeader = useAuthHeader()

  console.log('isAuthenticated', isAuthenticated)
  console.log('authHeader', authHeader)
  // const navigate = useNavigate()
  const signIn = useSignIn()
  const getInstance = async (payload: { instanceName: string }) => {
    try {
      const data = await axiosApiInstance.post('/instance/create', payload, {
        headers: { apikey: import.meta.env.VITE_API_GLOBAL_AUTH_KEY },
      })

      if (data.status === 200) {
        console.log(data.data.Auth.token)
        console.log(data.data)

        if (
          signIn({
            auth: {
              token: data.data.Auth.token,
              type: 'Bearer',
            },
            // refresh: data.data.Auth.token,
            userState: {
              name: data.data.name,
              id: data.data.id,
              createdAt: data.data.createdAt,
            },
          })
        ) {
          // navigate('/')
          // window.location.reload()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[580px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            <h1 className='text-xl font-medium'>Zazu Bot</h1>
          </div>

          <Card className='p-8'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below to log into your account
              </p>
            </div>
            <div className={cn('grid gap-8')}>
              <div className='grid gap-2'>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse)
                    // console.log('call API')
                    getInstance({
                      instanceName: credentialResponse.credential!,
                    })
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                  useOneTap
                />
              </div>
            </div>
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
