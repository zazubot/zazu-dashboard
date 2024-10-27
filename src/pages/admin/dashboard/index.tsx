import { Layout } from '@/components/custom/layout'
import WAStatus from './components/wa-status'
import { Counters } from './components/counters'
import { RecentSales } from './components/recent-sales'
import { ChartSales } from './components/chart-sales'

export default function Dashboard() {
  return (
    <Layout.Body>
      <div className='space-y-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          <Counters />
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
