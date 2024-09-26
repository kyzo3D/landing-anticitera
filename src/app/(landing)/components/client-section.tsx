import Image from 'next/image'

const ClientSection = () => {
  return (
    <section
      id='clients'
      className='mx-auto max-w-7xl px-6 text-center md:px-8'
    >
      <div className='py-14'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          <h2 className='text-center text-sm font-semibold text-muted-foreground/80'>
            Currently in beta, but...
          </h2>
          <div className='mt-6'>
            We are developing and integrating third party platforms to make your work easier!
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientSection
