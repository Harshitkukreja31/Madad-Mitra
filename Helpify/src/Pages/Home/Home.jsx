import React,{useState} from 'react'

import AllServiceHero from '../../Components/HeroSection/AllServiceHeroSection/AllServiceHero.jsx'
import FAQsection from '../../Components/FAQsection/FAQsection.jsx'
import ContinuousRotationReels from '../../Components/HeroSection/MainSection/ContinuousRotationReels.jsx'

import HiringSection from '../../Components/HiringSection/HiringSection.jsx'


const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  return (
    
    <div>
     
      <ContinuousRotationReels/>
      <AllServiceHero/>
      <FAQsection/>
      <HiringSection/>
     
    </div> 
    
  )
}

export default Home;