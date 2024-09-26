'use client'

import { motion } from 'framer-motion'
import { Check, Loader } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Interval } from '@/lib/types'
import { useRouter } from 'next/navigation'

export function toHumanPrice(price: number, decimals: number = 2) {
  return Number(price / 100).toFixed(decimals)
}

const demoPrices = [
  {
    id: 'price_1',
    name: 'Basic',
    description: 'Try it out for free',
    features: [
      'AI-powered analytics',
      'Basic support',
      '5 prompts limit',
      'Access to basic AI tools'
    ],
    monthlyPrice: 0,
    yearlyPrice: 0,
    isMostPopular: false
  },
  {
    id: 'price_2',
    name: 'Premium',
    description: 'A premium plan for growing businesses',
    features: [
      'Advanced AI insights',
      'Priority support',
      '100 free prompts per month',
      'Access to all AI tools',
      'Custom integrations'
    ],
    monthlyPrice: 2000,
    yearlyPrice: 20000,
    isMostPopular: true
  },
  {
    id: 'price_5',
    name: 'Enterprise',
    description:
      'An enterprise plan with advanced features for large organizations',
    features: [
      'Custom AI solutions',
      '24/7 dedicated support',
      'Unlimited prompts',
      'Access to all AI tools',
      'Custom integrations',
      'Data security and compliance'
    ],
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    isMostPopular: false
  },
  {
    id: 'price_6',
    name: 'Ultimate',
    description: 'The ultimate plan with all features for industry leaders',
    features: [
      'Bespoke AI development',
      'White-glove support',
      'Unlimited prompts',
      'Priority access to new AI tools',
      'Custom integrations',
      'Highest data security and compliance'
    ],
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    isMostPopular: false
  }
]

const PricingSection = () => {
  const [interval, setInterval] = useState<Interval>('month')
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState<string | null>(null)

  const router = useRouter()

  const onSubscribeClick = async (priceId: string) => {
    if (priceId === 'price_1') {
      router.push('/chat')
      return
    }
    setIsLoading(true)
    setId(priceId)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate a delay, TODO: make this a real API call
    setIsLoading(false)
  }

  return (
    <section id='pricing'>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8'>
        <div className='mx-auto max-w-5xl text-center'>
          <h4 className='text-xl font-bold tracking-tight text-foreground'>
            Pricing
          </h4>

          <h2 className='text-5xl font-bold tracking-tight text-foreground sm:text-6xl'>
            Simple pricing for everyone wit all features available.
          </h2>

          {/* <p className='mt-6 text-xl leading-8 text-foreground/80'>
            Choose an <strong>affordable plan</strong> that&apos;s packed with
            the best features for optimize your resources, generate incomes, and
            drive growth.
          </p> */}

          <p className='mt-6 text-xl leading-8 text-foreground/80'>
            But at the moment we are proud to say that this month, <strong>the first users will have a free account</strong> to try and help us to improve the app!
          </p>
        </div>

        {/* <div className='flex w-full items-center justify-center space-x-2'>
          <Switch
            id='interval'
            onCheckedChange={(checked) => {
              setInterval(checked ? 'year' : 'month')
            }}
          />
          <span>Annual</span>
          <span className='inline-block whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-background'>
            2 MONTHS FREE ✨
          </span>
        </div>

        <div className='mx-auto grid w-full flex-col justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {demoPrices.map((price, idx) => (
            <div
              key={price.id}
              className={cn(
                'relative flex max-w-[400px] flex-col gap-8 overflow-hidden rounded-2xl border p-4 text-foreground',
                {
                  'border-2 border-[var(--color-three)]': price.isMostPopular
                }
              )}
            >
              <div className='flex items-center'>
                <div className='ml-4'>
                  <h2 className='text-base font-semibold leading-7'>
                    {price.name}
                  </h2>
                  <p className='h-12 text-sm leading-5 text-foreground/70'>
                    {price.description}
                  </p>
                </div>
              </div>

              <motion.div
                key={`${price.id}-${interval}`}
                initial='initial'
                animate='animate'
                variants={{
                  initial: {
                    opacity: 0,
                    y: 12
                  },
                  animate: {
                    opacity: 1,
                    y: 0
                  }
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className='flex flex-row gap-1'
              >
                <span className='text-4xl font-bold text-foreground'>
                  $
                  {interval === 'year'
                    ? toHumanPrice(price.yearlyPrice, 0)
                    : toHumanPrice(price.monthlyPrice, 0)}
                  <span className='text-xs'> /{interval}</span>
                </span>
              </motion.div>

              <Button
                className={cn(
                  'group relative w-full transform-gpu gap-2 overflow-hidden text-lg font-semibold tracking-tighter ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2',
                  {
                    'bg-secondary text-foreground hover:bg-secondary/90 hover:text-foreground/90 hover:ring-secondary':
                      price.id === 'price_1'
                  }
                )}
                disabled={isLoading}
                onClick={() => void onSubscribeClick(price.id)}
              >
                <span className='absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-background opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96' />
                {(!isLoading || (isLoading && id !== price.id)) && (
                  <p>{price.id === 'price_1' ? 'Get started' : 'Subscribe'}</p>
                )}

                {isLoading && id === price.id && <p>Subscribing</p>}
                {isLoading && id === price.id && (
                  <Loader className='mr-2 size-4 animate-spin' />
                )}
              </Button>

              <hr className='m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0' />
              {price.features && price.features.length > 0 && (
                <ul className='flex flex-col gap-2 font-normal'>
                  {price.features.map((feature: any, idx: any) => (
                    <li
                      key={idx}
                      className='flex items-center gap-3 text-xs font-medium text-foreground'
                    >
                      <Check className='size-5 shrink-0 rounded-full bg-green-400 p-[2px] text-foreground' />
                      <span className='flex'>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default PricingSection
