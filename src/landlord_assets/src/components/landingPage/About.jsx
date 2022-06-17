import React from 'react'
import bg from '../../../assets/images/bg-hs.png'
import shape from '../../../assets/images/shape.png'

const About = () => {
  return (
    <div className='py-10 relative'>
      <img src={shape} alt='shape' className='w-full h-[700px] md:h-[500px] xl:h-full' />
      <div className='absolute top-1/4 xl:top-1/4 left-1/2 w-full -translate-x-2/4 transform '>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5'>
          <div className=''>
            <img src={bg} alt='Landlord about us' className='ab' />
          </div>
          <div className='max-w-screen-sm order-first md:order-none px-5'>
            <h1 className='text-xl xl:text-4xl font-semibold text-white mb-10'>Who are We?</h1>
            <p className='text-gray-200 xl:text-lg pb-5'>
              Landlords is a platform that understands the hassle involved in trying to buy or sell
              a property especially due to the risk of scammers, or illegal transactions associated
              to traditional real estate acquisition and investing.
            </p>
            <p className='text-gray-200 xl:text-lg'>
              Our platform built with blockchain technologyprovides real estate agencies, property
              owners, investors, and individuals looking to buy, sell, or invest with security,
              speed and convinence within a thriving digital ecosystem
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
