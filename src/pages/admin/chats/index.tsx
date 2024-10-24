import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import dayjs from 'dayjs'
import {
  IconArrowLeft,
  IconDotsVertical,
  IconEdit,
  IconMessages,
  IconPaperclip,
  IconPhone,
  IconPhotoPlus,
  IconPlus,
  IconSearch,
  IconSend,
  IconVideo,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Layout } from '@/components/custom/layout'

import { Button } from '@/components/custom/button'

// Fake Data
import axiosApiInstance from '@/services/api.services'
import {
  IChatUser,
  IContact,
  IInstance,
  IMessageRecived,
} from '@/types/IInstance'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Loader from '@/components/loader'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { extractBearerToken, printMessage } from '@/lib/ws'
import { toast } from '@/components/ui/use-toast'
import useLocalStorage from '@/hooks/use-local-storage'

const unknownProfileImage = '/images/profile.jpg'
const unknownProfile = {
  pushName: null,
  profilePicUrl: unknownProfileImage,
  remoteJid: '',
}
export default function Chats() {
  const [search, setSearch] = useState('')
  const auth = useAuthUser<IInstance>()
  const [chats, setChats] = useState<IChatUser[] | undefined>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessageRecived[] | undefined>()
  const [contact, setContact] = useState<IContact>(unknownProfile)
  const authHeader = useAuthHeader()
  const [isConnected] = useLocalStorage({
    key: 'connection-status',
    defaultValue: 'init',
  })
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8084/ws/events?event=messages.upsert&token=${extractBearerToken(authHeader!)}`
    )

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      toast({
        title: 'New messages.upsert',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  }, [authHeader])

  useEffect(() => {
    axiosApiInstance
      .get(`/chat/findChats/${auth?.name}`, { params: { type: 'groub' } })
      .then((res) => {
        setChats(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }, [auth?.name])

  const fetchMessages = (remoteJid: string) => {
    setIsLoading(true)
    axiosApiInstance
      .post(`/chat/findContacts/${auth?.name}`, {
        where: { remoteJid },
      })
      .then((res) => {
        if (res.data?.length > 0) {
          setContact(res.data[0])
        } else {
          setContact({ ...unknownProfile, remoteJid })
        }
      })
      .finally(() => {})

    axiosApiInstance
      .post(`/chat/findMessages/${auth?.name}`, {
        where: { keyRemoteJid: remoteJid, messageType: 'conversation' },
      })
      .then((res) => {
        setMessages(res.data.messages.records)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }

  const currentMessage = messages?.reduce(
    (acc: Record<string, IMessageRecived[]>, obj) => {
      const key = dayjs(new Date(obj.messageTimestamp)).format('D MMM, YYYY')

      // Create an array for the category if it doesn't exist
      if (!acc[key]) {
        acc[key] = []
      }

      // Push the current object to the array
      acc[key].push(obj)

      return acc
    },
    {}
  )

  return (
    <Layout.Body className='sm:overflow-hidden'>
      <section className='flex h-[44rem] gap-6 overflow-y-scroll'>
        {/* Left Side */}
        <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
          {isConnected !== 'open' && (
            <Alert variant='destructive'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your Whatsapp status is not open please reconnect again ...
              </AlertDescription>
            </Alert>
          )}
          <div className='sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
            <div className='flex items-center justify-between py-2'>
              <div className='flex gap-2'>
                <h1 className='text-2xl font-bold'>Inbox</h1>
                <IconMessages size={20} />
              </div>

              <Button size='icon' variant='ghost' className='rounded-lg'>
                <IconEdit size={24} className='stroke-muted-foreground' />
              </Button>
            </div>

            <label className='flex h-12 w-full items-center space-x-0 rounded-md border border-input pl-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'>
              <IconSearch size={15} className='mr-2 stroke-slate-500' />
              <span className='sr-only'>Search</span>
              <input
                type='text'
                className='w-full flex-1 bg-inherit text-sm focus-visible:outline-none'
                placeholder='Search chat...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          <div className='-mx-3 h-full overflow-auto p-3'>
            {chats?.map((chatUsr) => {
              const { id, remoteJid, createdAt } = chatUsr

              return (
                <Fragment key={id}>
                  <button
                    type='button'
                    className={cn(
                      `-mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary/75`
                      // selectedUser.id === id && 'sm:bg-muted'
                    )}
                    onClick={() => fetchMessages(remoteJid)}
                  >
                    <div className='flex gap-2'>
                      <Avatar>
                        <AvatarImage src='/images/' alt={remoteJid} />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className='col-start-2 row-span-2 font-medium'>
                          {remoteJid}
                        </span>
                        <span className='col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground'>
                          {createdAt}
                        </span>
                      </div>
                    </div>
                  </button>
                  <Separator className='my-1' />
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* Right Side */}
        <div
          className={cn(
            'absolute inset-0 left-full z-50 flex w-full flex-1 flex-col rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex'
          )}
        >
          {/* Top Part */}
          <div className='mb-1 flex flex-none justify-between rounded-t-md bg-secondary p-4 shadow-lg'>
            {/* Left */}
            <div className='flex gap-3'>
              <Button
                size='icon'
                variant='ghost'
                className='-ml-2 h-full sm:hidden'
              >
                <IconArrowLeft />
              </Button>
              <div className='flex items-center gap-2 lg:gap-4'>
                <Avatar className='size-9 lg:size-11'>
                  <AvatarImage
                    src={
                      contact?.profilePicUrl
                        ? contact?.profilePicUrl
                        : unknownProfileImage
                    }
                    alt='pic'
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                    {contact?.pushName ? contact?.pushName : contact?.remoteJid}
                  </span>
                  <span className='col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-ellipsis text-nowrap text-xs text-muted-foreground lg:max-w-none lg:text-sm'>
                    {contact?.remoteJid}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='-mr-1 flex items-center gap-1 lg:gap-2'>
              <Button
                size='icon'
                variant='ghost'
                className='hidden size-8 rounded-full sm:inline-flex lg:size-10'
              >
                <IconVideo size={22} className='stroke-muted-foreground' />
              </Button>
              <Button
                size='icon'
                variant='ghost'
                className='hidden size-8 rounded-full sm:inline-flex lg:size-10'
              >
                <IconPhone size={22} className='stroke-muted-foreground' />
              </Button>
              <Button
                size='icon'
                variant='ghost'
                className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'
              >
                <IconDotsVertical className='stroke-muted-foreground sm:size-5' />
              </Button>
            </div>
          </div>

          {/* Conversation */}
          {isLoading ? (
            <Loader />
          ) : (
            <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pb-4 pt-0'>
              <div className='flex size-full flex-1'>
                <div className='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
                  <div className='chat-flex flex h-40 w-full flex-grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pb-4 pr-4'>
                    {currentMessage &&
                      Object.keys(currentMessage).map((key) => (
                        <Fragment key={key}>
                          {currentMessage[key].map((msg) => (
                            <div
                              key={msg.keyId}
                              className={cn(
                                'chat-box max-w-72 break-words px-3 py-2 shadow-lg',
                                msg.keyFromMe
                                  ? 'self-end rounded-[16px_16px_0_16px] bg-primary/85 text-primary-foreground/75'
                                  : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                              )}
                            >
                              {printMessage(msg.content)}
                              <span
                                className={cn(
                                  'mt-1 block text-xs font-light italic text-muted-foreground',
                                  msg.keyFromMe && 'text-right'
                                )}
                              >
                                {dayjs(msg.messageTimestamp).format('h:mm a')}
                              </span>
                            </div>
                          ))}
                          <div className='text-center text-xs'>{key}</div>
                        </Fragment>
                      ))}
                  </div>
                </div>
              </div>

              <form className='flex w-full flex-none gap-2'>
                <div className='flex flex-1 items-center gap-2 rounded-md border border-input px-2 py-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring lg:gap-4'>
                  <div className='space-x-1'>
                    <Button
                      size='icon'
                      type='button'
                      variant='ghost'
                      className='h-8 rounded-md'
                    >
                      <IconPlus size={20} className='stroke-muted-foreground' />
                    </Button>
                    <Button
                      size='icon'
                      type='button'
                      variant='ghost'
                      className='hidden h-8 rounded-md lg:inline-flex'
                    >
                      <IconPhotoPlus
                        size={20}
                        className='stroke-muted-foreground'
                      />
                    </Button>
                    <Button
                      size='icon'
                      type='button'
                      variant='ghost'
                      className='hidden h-8 rounded-md lg:inline-flex'
                    >
                      <IconPaperclip
                        size={20}
                        className='stroke-muted-foreground'
                      />
                    </Button>
                  </div>
                  <label className='flex-1'>
                    <span className='sr-only'>Chat Text Box</span>
                    <input
                      type='text'
                      placeholder='Type your messages...'
                      className='h-8 w-full bg-inherit focus-visible:outline-none'
                    />
                  </label>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='hidden sm:inline-flex'
                  >
                    <IconSend size={20} />
                  </Button>
                </div>
                <Button
                  className='h-full sm:hidden'
                  rightSection={<IconSend size={18} />}
                >
                  Send
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout.Body>
  )
}
