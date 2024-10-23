import { Layout } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { IContact, IInstance } from '@/types/IInstance'
import axiosApiInstance from '@/services/api.services'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Loader from '@/components/loader'

export default function Contacts() {
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [contacts, setContacts] = useState<IContact[]>([])
  const auth = useAuthUser<IInstance>()

  useEffect(() => {
    axiosApiInstance
      .post(`/chat/findContacts/${auth?.name}`)
      .then((res) => {
        setContacts(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsloading(false))
  }, [auth?.name])
  return (
    <Layout.Body>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Contacts</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your cantacts
          </p>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable data={contacts!} columns={columns} />
        )}
      </div>
    </Layout.Body>
  )
}
