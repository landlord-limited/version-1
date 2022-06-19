import React from 'react'
import rm1 from '../../../assets/images/rm-1.png'
import rm2 from '../../../assets/images/rm-2.png'
import rm3 from '../../../assets/images/rm-3.png'

const Roadmap = () => {
  return (
    <div className='mx-auto max-w-screen-lg md:pt-10 pb-10'>
      <div>
        <h1 className='text-center text-3xl text-[#1891CA] capitalize'>
          Your simple roadmap to secure investments
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-4 px-5'>
          <div className='flex justify-center'>
            <div className='text-center w-full'>
              <div className='h-[150px]'>
                <img src={rm1} alt='Roadmap' className='w-[224.9px] h-[109.4px] mx-auto' />
              </div>
              <h1 className='text-[#2767CB] text-xl mt-5 mb-3 capitalize font-semibold'>
                Verifiable Assets
              </h1>
              <p className='text-gray-500'>
                Our Blockchain Technology ensure all ownership of listed properties are verifiable
                and legitimate.
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='text-center w-full'>
              <div className='h-[150px]'>
                <img src={rm2} alt='Roadmap' className='w-[180px] h-full mx-auto' />
              </div>
              <h1 className='text-[#80B3FF] text-xl mt-5 mb-3 capitalize font-semibold'>
                Secure Investments
              </h1>
              <p className='text-gray-500'>
                Our Blockchain Technology ensure all ownership of listed properties are verifiable
                and legitimate.
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='text-center w-full'>
              <div className='h-[150px]'>
                <img src={rm3} alt='Roadmap' className='w-[132.4px] h-auto mx-auto' />
              </div>
              <h1 className='text-[#1891CA] text-xl mt-5 mb-3 capitalize font-semibold'>
                Transparency
              </h1>
              <p className='text-gray-500'>
                Our Blockchain Technology ensure all ownership of listed properties are verifiable
                and legitimate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
