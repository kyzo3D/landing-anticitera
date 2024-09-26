import { Badge } from '@/components/ui/badge'

const Navbar = async () => {
  return (
    <nav className='sticky inset-x-0 top-0 hidden h-14 w-full rounded-tl-3xl border-b border-secondary bg-background backdrop-blur-lg transition-all md:flex'>
      <div className='mx-auto flex h-14 w-full items-center justify-between border-b border-secondary px-8'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-bold'>Casual chat</p>
            <Badge variant='secondary'>
              <div className='flex items-center gap-2'>
                <img
                  src='https://www.cdnlogo.com/logos/m/59/meta.svg'
                  className='h-3 w-3'
                  alt='Logo of Meta'
                />
                <p>Llama 3.1</p>
              </div>
            </Badge>
          </div>
          <p className='text-xs text-muted-foreground/80'>
            Wake up your mind with the power of collective intelligence. Your
            personal assistant is ready to help you with any task you need.
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
