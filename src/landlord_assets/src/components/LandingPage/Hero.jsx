import React from "react";
import { BsPlayCircleFill } from 'react-icons/bs'
import bg from '../../../assets/images/bg.png'
import bgSm from '../../../assets/images/bg-sm.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative pb-10'>
      <div className='pt-10'>
        <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2'>
          <div className='max-w-screen-sm xl:ml-32 xl:mt-10 pb-10 px-4 xl:px-0'>
            <h1 className='text-2xl xl:text-[38px] xl:leading-[54px]'>
              Enjoy the Security of <br /> investing in real estate built <br /> with Blockchain
              Technology
            </h1>
            <p className='text-gray-500 text-sm md:text-lg mt-5'>
              Whether you are a buyer, seller, or investor in real estate, discover the speed, ease
              and security blockchain technology provides you in a thriving digital marketplace.
            </p>
            <div className='flex space-x-5 mt-5'>
              <Link to='/faucet' className='btn-primary'>
                Get Started
              </Link>
              <button className='flex space-x-2 border border-[#274FB6] rounded-md px-4 py-2 text-[#274FB6] hover:text-white hover:bg-[#274FB6] bg-white uppercase items-center transition duration-150 ease-in-out'>
                <BsPlayCircleFill className='' />
                <span className='text-sm'>Watch Video</span>
              </button>
            </div>
          </div>
          <div className='bg-white flex w-full justify-center xl:justify-end xl:-mt-36'>
            <img src={bg} alt='Landlord house' className='w-full hidden md:flex' />
            <img src={bgSm} alt='Landlord house' className='w-full flex md:hidden' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero