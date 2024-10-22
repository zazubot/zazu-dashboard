import { Card } from '@/components/ui/card'
import axiosApiInstance from '@/services/api.services'
import { Link, useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { GoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/custom/button'

export default function LandingPage() {
  const isAuthenticated = useIsAuthenticated()
  const authHeader = useAuthHeader()

  console.log('isAuthenticated', isAuthenticated)
  console.log('authHeader', authHeader)
  const navigate = useNavigate()
  const signIn = useSignIn()

  const getInstance = async (payload: { instanceName: string }) => {
    try {
      const old = await axiosApiInstance.post('/instance/create', payload, {
        headers: { apikey: import.meta.env.VITE_API_GLOBAL_AUTH_KEY },
      })

      await axiosApiInstance.put('/instance/refreshToken/' + old.data.name, {
        oldToken: old.data.Auth.token,
      })

      const { data, status } = await axiosApiInstance.post(
        '/instance/create',
        payload,
        {
          headers: { apikey: import.meta.env.VITE_API_GLOBAL_AUTH_KEY },
        }
      )

      if (status === 200) {
        console.log(data.Auth.token)
        console.log(data)
        if (
          signIn({
            auth: {
              token: data.Auth.token,
              type: 'Bearer',
            },
            // refresh: data.data.Auth.token,
            userState: {
              name: data.name,
              id: data.id,
            },
          })
        ) {
          navigate('/')
          window.location.reload()
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
              {isAuthenticated ? (
                <Link to='/dashboard'>
                  <Button className='mt-2'>Open Dashboard</Button>
                </Link>
              ) : (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    getInstance({
                      instanceName: credentialResponse.credential!,
                    })
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                  useOneTap
                />
              )}
            </div>

            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              By using zazu WA, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service{' '}
              </a>
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
