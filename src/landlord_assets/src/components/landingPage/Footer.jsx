import React from 'react'
import logo from '../../../assets/images/logo2.svg'

const Footer = () => {
  return (
    <div className='bg-[#02182B] py-10'>
      <div className='mx-auto max-w-screen-2xl'>
        <div className='flex justify-center'>
          <div>
            <img src={logo} alt='Landlord' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
