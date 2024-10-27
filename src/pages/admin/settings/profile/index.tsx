import ContentSection from '../components/content-section'
import QRCodeGenerator from './qr-connect'
import WAStatus from './wa-status'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
          timezone.'
    >
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        <QRCodeGenerator />
        <WAStatus />
      </div>
    </ContentSection>
  )
}
