import Link from 'next/link'

const footerNavs = [
  {
    label: 'Product',
    items: [
      {
        href: '/',
        name: 'Email Collection'
      },
      {
        href: '/pricing',
        name: 'Pricing'
      },
      {
        href: '/faq',
        name: 'FAQ'
      }
    ]
  },

  {
    label: 'Reach us',
    items: [
      {
        href: 'https://www.linkedin.com/company/anticiteraapp/posts/?feedView=all',
        name: 'LinkedIn'
      },
      {
        href: 'mailto:kam.europe@anticitera.app',
        name: 'Email'
      }
    ]
  },
  {
    label: 'Legal',
    items: [
      {
        href: '/terms',
        name: 'Terms'
      },

      {
        href: '/privacy',
        name: 'Privacy'
      }
    ]
  }
]

const footerSocials = [
  {
    href: 'https://www.linkedin.com/company/anticiteraapp/posts/?feedView=all',
    name: 'LinkedIn',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='24'
        height='24'
        viewBox='0 0 48 48'
      >
        <path
          fill='#0288D1'
          d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'
        ></path>
        <path
          fill='#FFF'
          d='M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z'
        ></path>
      </svg>
    )
  }
]

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto w-full max-w-screen-xl xl:pb-2'>
        <div className='gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between'>
          <div className='mb-12 flex flex-col gap-4'>
            <Link href='/' className='flex items-center gap-2'>
              <img
                src='/images/isotype.png'
                alt='Anticitera Logo'
                className='size-8 text-primary'
              />
              <span className='self-center whitespace-nowrap text-2xl font-semibold'>
                Anticitera
              </span>
            </Link>
            <p className='max-w-xs'>The Next Step in Human and AI Evolution</p>
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10'>
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className='mb-6 text-sm font-medium uppercase tracking-tighter text-foreground'>
                  {nav.label}
                </h2>
                <ul className='grid gap-2'>
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='hover:secondary-foreground/60 cursor-pointer text-sm font-[450] text-secondary-foreground/80 duration-200'
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2 rounded-md border-secondary/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex space-x-5 sm:mt-0 sm:justify-center'>
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className='fill-muted-foreground text-muted-foreground hover:fill-foreground hover:text-foreground'
              >
                {social.icon}
                <span className='sr-only'>{social.name}</span>
              </Link>
            ))}
          </div>
          <span className='text-sm text-muted-foreground sm:text-center'>
            Copyright © {new Date().getFullYear()}{' '}
            <Link href='/' className='cursor-pointer'>
              Anticitera
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
