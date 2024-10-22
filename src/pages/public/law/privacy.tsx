export default function Privacy() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none   '>
        <div>
          <div className='mx-auto max-w-4xl rounded-lg   p-6 shadow-md'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Privacy Policy
              </h1>
            </div>
            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Introduction</h2>
              <p className='mt-2'>
                At Zazu, we value your privacy and are committed to protecting
                your personal information. This Privacy Policy outlines our
                practices regarding the collection, use, and disclosure of your
                information.
              </p>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Data Collection</h2>
              <p className='mt-2'>
                We may collect the following types of information:
              </p>
              <ul className='mt-2 list-inside list-disc'>
                <li>Personal Information (e.g., name, email address)</li>
                <li>Usage Data (e.g., app interactions, log files)</li>
              </ul>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Data Usage</h2>
              <p className='mt-2'>
                We use the collected data for various purposes:
              </p>
              <ul className='mt-2 list-inside list-disc'>
                <li>To provide and maintain our app</li>
                <li>To notify you about changes to our app</li>
                <li>To allow you to participate in interactive features</li>
              </ul>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Contact Information</h2>
              <p className='mt-2'>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <p className='mt-2'>Email: ahmedkhaled4d@gmail.com</p>
            </section>

            <footer className='mt-8 text-center'>
              <p className='text-sm text-gray-500'>
                Last updated: October 21, 2024
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
