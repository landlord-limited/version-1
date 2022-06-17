import React from 'react'

const Statistics = () => {
  return (
    <div className='py-10 mx-auto max-w-screen-md mt-10'>
      <div className='grid grid-cols-3 md:grid-cols-3 gap-5'>
        <div className='text-center text-[#1891CA]'>
          <h1 className='text-lg md:text-5xl mb-2'>5.28%</h1>
          <p className='text-sm md:text-lg'>Average Gross Yield Per Annum</p>
        </div>
        <div className='text-center text-[#1891CA]'>
          <h1 className='text-lg md:text-5xl mb-2'>14.75%</h1>
          <p className='text-sm md:text-lg'>Total Annual Return</p>
        </div>
        <div className='text-center text-[#1891CA]'>
          <h1 className='text-lg md:text-5xl mb-2'>10%</h1>
          <p className='text-sm md:text-lg'>Annual Capital Appreciation</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics
