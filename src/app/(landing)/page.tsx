import ClientSection from '@/app/(landing)/components/client-section'
import CallToActionSection from '@/app/(landing)/components/cta-section'
import HeroSection from '@/app/(landing)/components/hero-section'
import PricingSection from '@/app/(landing)/components/pricing-section'
import Particles from '@/components/ui/particles'
import { SphereMask } from '@/components/ui/sphere-mask'

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className='absolute inset-0 -z-10'
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color='#ffffff'
      />
    </>
  )
}

export default LandingPage
