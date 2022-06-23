import React from "react";
import logo from '../../assets/images/logo.png'
import About from './LandingPage/About'
import Footer from './LandingPage/Footer'
import HeroComponent from './LandingPage/Hero'
import Roadmap from './LandingPage/Roadmap'
import Statistics from './LandingPage/Statistics'
import Testimonials from './LandingPage/Testimonials'

const Index = (props) => {
  return (
    <div className=''>
      <div className='flex mx-auto max-w-screen-2xl px-4 2xl:px-0 justify-center md:justify-start py-4'>
        <img src={logo} alt='Landlord' loading='lazy' className='w-auto h-16' />
      </div>
      <HeroComponent signedIn={props.signedIn} signIn={props.signIn} client={props.client} />
      <Roadmap />
      <About />
      <Statistics />
      <Testimonials />
      <div className='text-center mx-auto max-w-screen-md py-10 px-4'>
        <h1 className='text-[#0288D1] font-semibold text-3xl mb-5'>
          Are You Ready To Explore The Endless Possibilities?
        </h1>
        <p className='text-gray-500'>
          Our Secure Network and fast growing marketplace combined with your personal needs, allows
          us create an investment plan specifically tailored to your needs
        </p>
        <div className='flex justify-center mt-3'>
          <button className='btn-primary'>Get Started</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index
