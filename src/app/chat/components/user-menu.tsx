import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type Session } from '@/lib/types'

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export interface UserMenuProps {
  session: Session
  open: boolean
}

export function UserMenu({ session, open }: UserMenuProps) {
  const user = session.user

  return (
    <div className='flex items-center justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='group/sidebar flex items-center justify-start gap-2 py-2 pl-0'
          >
            <div className='flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase'>
              {getUserInitials(user.email ?? '')}
            </div>
            <motion.span
              animate={{
                display: open ? 'inline-block' : 'none',
                opacity: open ? 1 : 0
              }}
              className='!m-0 inline-block whitespace-pre !p-0 text-sm text-secondary-foreground hover:text-foreground/80'
            >
              {user.email}
            </motion.span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align='start' className='w-fit'>
          <DropdownMenuItem className='flex-col items-start'>
            <div className='text-xs text-zinc-500'>{user.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <Link
            href='/signout'
            className='relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-destructive hover:text-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          >
            Sign Out
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
