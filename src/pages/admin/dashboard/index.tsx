import { Layout } from '@/components/custom/layout'
import QRCodeGenerator from './components/qr-connect'

export default function Dashboard() {
  return (
    <Layout.Body>
      <QRCodeGenerator />
    </Layout.Body>
  )
}
