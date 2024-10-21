export default function Terms() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none   '>
        <div>
          <div className='mx-auto max-w-4xl rounded-lg   p-6 shadow-md'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Terms of Service
              </h1>
            </div>
            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Introduction</h2>
              <p className='mt-2'>
                Welcome to Zazu! By using our app, you agree to comply with and
                be bound by these Terms of Service. If you do not agree to these
                terms, please do not use our app.
              </p>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>User Obligations</h2>
              <p className='mt-2'>As a user of Zazu, you agree to:</p>
              <ul className='mt-2 list-inside list-disc'>
                <li>
                  Provide accurate and complete information during registration.
                </li>
                <li>Keep your password confidential and secure.</li>
                <li>
                  Notify us immediately of any unauthorized use of your account.
                </li>
                <li>Use the app only for lawful purposes.</li>
              </ul>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>
                Limitation of Liability
              </h2>
              <p className='mt-2'>
                To the fullest extent permitted by law, Zazu shall not be liable
                for any direct, indirect, incidental, special, or consequential
                damages arising from your use of or inability to use the app.
              </p>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Modifications</h2>
              <p className='mt-2'>
                We reserve the right to modify these Terms at any time. We will
                notify you of any changes by posting the new Terms on this page.
                Your continued use of the app after changes are made constitutes
                your acceptance of the new Terms.
              </p>
            </section>

            <section className='mb-6'>
              <h2 className='text-2xl font-semibold'>Contact Information</h2>
              <p className='mt-2'>
                If you have any questions about these Terms of Service, please
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
