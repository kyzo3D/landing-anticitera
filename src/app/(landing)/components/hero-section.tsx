'use client'

import { useInView } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

import { BorderBeam } from '@/components/ui/border-beam'
import { buttonVariants } from '@/components/ui/button'
import TextShimmer from '@/components/ui/text-shimmer'

export default function HeroSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id='hero'
      className='relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8'
    >
      <div className='backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 animate-fade-in items-center justify-between gap-1 rounded-full border border-background/5 bg-background/10 px-3 text-xs text-background opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-background/20'>
        <TextShimmer className='inline-flex items-center justify-center'>
          <span>✨ Introducing Multimodal Containerized Agents (MCA)</span>{' '}
          <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
        </TextShimmer>
      </div>
      <h1 className='-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-foreground from-30% to-foreground/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl'>
        Anticitera is the new way
        <br className='hidden md:block' /> to expand human capabilities
      </h1>
      <p className='mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-muted-foreground opacity-0 [--animation-delay:400ms] md:text-xl'>
        Autonomous avatars based on advanced technologies, designed
        <br className='hidden md:block' /> to perform complex tasks in digital
        and virtual environments.
      </p>
      <Link
        href='https://qk7dv3gm785.typeform.com/to/dTYySvlt'
        className={buttonVariants({
          className:
            '-translate-y-4 animate-fade-in gap-1 opacity-0 ease-in-out [--animation-delay:600ms]'
        })}
      >
        <span>Join waitlist</span>
        <ArrowRightIcon className='ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
      </Link>
      <div
        ref={ref}
        className='relative mt-32 animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]'
      >
        <div
          className={`rounded-xl border border-background/10 bg-background bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-three),var(--color-three),transparent_40%)] before:[filter:blur(180px)] ${
            inView ? 'before:animate-image-glow' : ''
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom='#5aefbd'
            colorTo='#005ab7'
          />

          <img
            src='/images/hero.png'
            alt='Hero Image'
            className='relative size-full rounded-[inherit] border object-contain'
          />
        </div>
      </div>
    </section>
  )
}
