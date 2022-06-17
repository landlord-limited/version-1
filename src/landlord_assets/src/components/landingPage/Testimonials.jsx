import React from 'react'
import { FaQuoteRight } from 'react-icons/fa'
import avatar1 from '../../../assets/images/user1.svg'
import avatar2 from '../../../assets/images/user2.svg'
import avatar3 from '../../../assets/images/user3.svg'

const Testimonials = () => {
  return (
    <div className='mx-auto max-w-screen-lg py-10 px-4'>
      <h1 className='text-center font-light text-[#0288D1]'>Testimonials</h1>
      <h1 className='text-center text-[rgb(2,136,209)] text-3xl'>What Users Say About Us</h1>
      <div className='flex space-x-4 md:space-x-0 overflow-x-scroll md:grid md:grid-cols-3 md:gap-4 mt-10 scrollbar-hide py-5'>
        <div className='p-5 text-center shadow-lg flex-shrink-0 flex-grow-0 w-[300px]'>
          <div className='flex justify-center mb-5'>
            <FaQuoteRight className='text-[#0288D1]' />
          </div>
          <p className='text-gray-500'>
            I couldnt believe i could listing properties on any real estate website could be this
            easy. I’m happy i found Landlords when I did
          </p>
          <div className='flex justify-center py-3'>
            <div className='w-[100px] h-[100px] rounded-full relative'>
              <img src={avatar1} alt='Angela Maduka' className='object-cover' />
            </div>
          </div>
          <h1 className='text-lg'>Angela Maduka</h1>
        </div>
        <div className='p-5 text-center shadow-lg flex-shrink-0 flex-grow-0 w-[300px]'>
          <div className='flex justify-center mb-5'>
            <FaQuoteRight className='text-[#0288D1]' />
          </div>
          <p className='text-gray-500'>
            The possibilities of blockchain technology in real estate investing are limitless. I
            really love the transparency on each transaction!
          </p>
          <div className='flex justify-center py-3'>
            <div className='w-[100px] h-[100px] rounded-full relative'>
              <img src={avatar2} alt='Angela Maduka' className='object-cover' />
            </div>
          </div>
          <h1 className='text-lg'>Helen Richards</h1>
        </div>
        <div className='p-5 text-center shadow-lg flex-shrink-0 flex-grow-0 w-[300px]'>
          <div className='flex justify-center mb-5'>
            <FaQuoteRight className='text-[#0288D1]' />
          </div>
          <p className='text-gray-500'>
            Buying tokens in real estate is the safest means of passive income. Properties increase
            in value, and so does my shares!
          </p>
          <div className='flex justify-center py-3'>
            <div className='w-[100px] h-[100px] rounded-full relative'>
              <img src={avatar3} alt='Angela Maduka' className='object-cover' />
            </div>
          </div>
          <h1 className='text-lg'>Chris Kaluka</h1>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
