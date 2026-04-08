import React from 'react'
import HeroSection from '../../component/home/HeroSection'
import AboutSection from '../../component/home/AboutSection'
import FeaturesSection from '../../component/home/FeaturesSection'
import OurProduct from '../../component/home/OurProduct'
import WhyChooseUs from '../../component/home/WhyChooseUs'
import OurServiceSection from '../../component/home/OurServiceSection'
import CTASection from '../../component/home/CTASection'

const LandingPage = () => {
  return (
    <div>
      {/* Section 1 : Hero Section */}
      <HeroSection/>
      {/* Section 2 : About Section */}
      <AboutSection/>
      {/* Section 3 : Features Section */}
      <FeaturesSection/>
      {/* Section 4 : Our Product Section */}
      <OurProduct/>
      {/* Section 5 : Why Choose Us Section */}
      <WhyChooseUs/>
      {/* Section 6 : Our Services Section */}
      <OurServiceSection/>
      {/* Section 7 : CTA Section */}
      <CTASection/>
    </div>
  )
}

export default LandingPage
