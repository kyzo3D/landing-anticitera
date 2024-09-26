'use client'

import { ArrowDown } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant='outline'
      size='icon'
      className={cn(
        'right-1/2 top-1 z-10 mx-auto translate-x-1/2 bg-background transition-opacity duration-300 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ArrowDown className='h-4 w-4' />
      <span className='sr-only'>Scroll to bottom</span>
    </Button>
  )
}
