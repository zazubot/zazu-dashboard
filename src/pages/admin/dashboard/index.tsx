import { Layout } from '@/components/custom/layout'
import QRCodeGenerator from './components/qr-connect'
import WAStatus from './components/wa-status'

export default function Dashboard() {
  return (
    <Layout.Body>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        <QRCodeGenerator />
        <WAStatus />
      </div>
    </Layout.Body>
  )
}
