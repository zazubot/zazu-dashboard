import { Layout } from '@/components/custom/layout'
import QRCodeGenerator from './components/qr-connect'
import WAStatus from './components/wa-status'
import { Counters } from './components/counters'
import { RecentSales } from './components/recent-sales'
import { ChartSales } from './components/chart-sales'

export default function Dashboard() {
  return (
    <Layout.Body>
      <div className='space-y-6'>
        <Counters />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          <QRCodeGenerator />
          <WAStatus />
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          <ChartSales />
          <RecentSales />
        </div>
      </div>
    </Layout.Body>
  )
}
