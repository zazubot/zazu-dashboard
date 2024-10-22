import axiosApiInstance from '@/services/api.services'
import { Link, useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { GoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/custom/button'
import { toast } from '@/components/ui/use-toast'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { IUser } from '@/types/IUser'

export default function LandingPage() {
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser<IUser>()

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
          toast({
            title: 'You Authenticated By Gmail',
            description: (
              <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>
                  {JSON.stringify(
                    {
                      email: data.name,
                      id: data.id,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            ),
          })
          navigate('/')
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
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
            Zazu AI Bot For Whatsapp
          </div>

          <img
            src='/images/zazu.png'
            className='relative m-auto'
            width={301}
            height={60}
            alt='Vite'
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                I've been using the Zazu AI bot for marketing and sales over
                WhatsApp, and it's been incredibly helpful! The bot streamlines
                communication, making it easy to engage with customers and drive
                sales. Its user-friendly interface and quick response times have
                significantly improved our outreach efforts. Highly recommend it
                for anyone looking to enhance their marketing strategy!
              </p>
              <footer className='text-sm'>Ahmed Khaled</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            {isAuthenticated ? (
              <>
                <div className='flex flex-col space-y-2 text-left'>
                  <h1 className='text-2xl font-semibold tracking-tight'>
                    Welcome {auth?.name}
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                    We're excited to have you here! Zazu is your go-to AI
                    assistant for marketing and sales on WhatsApp. boost your
                    sales, we've got you covered.
                  </p>
                </div>
                <Link to='/dashboard'>
                  <Button className='mt-2'>Open Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <div className='flex flex-col space-y-2 text-left'>
                  <h1 className='text-2xl font-semibold tracking-tight'>
                    Login
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                    Authenticate usign gmail your email and password below{' '}
                    <br />
                  </p>
                </div>
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
                <p className='px-8 text-center text-sm text-muted-foreground'>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
