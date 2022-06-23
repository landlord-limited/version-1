import React from "react";
import { BiMenu, BiPlus, BiSearch, BiUser } from 'react-icons/bi'
import { usePropertyContext } from '../context/context'
import { Link } from 'react-router-dom'

const Header = () => {
  const { toggleSidebar } = usePropertyContext()
  return (
    <div className='sticky top-0 w-full bg-white z-30 px-5 py-4 border-b border-gray-200 pb-5 mb-5'>
      <div className='flex justify-between'>
        <div className='cursor-pointer' onClick={toggleSidebar}>
          <BiMenu className='text-[#274FB6] text-2xl' />
        </div>
        <div className='flex space-x-4'>
          <div className='flex'>
            <input
              type='text'
              className='outline-none border border-gray-300 px-4 rounded-l py-2 bg-gray-100'
              placeholder='Search'
            />
            <button className='bg-[#274FB6] px-4 py-2 rounded-r'>
              <BiSearch className='text-white text-xl' />
            </button>
          </div>
          <button className='flex items-center px-4 py-2 bg-[#274FB6] text-white rounded space-x-2'>
            <BiPlus className='text-lg' />
            <Link to='/create-property'>
              <span>Post listing</span>
            </Link>
          </button>
          <Link to='/owned-property'>
          <div className='w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 border-2 border-blue-200'>
            <BiUser className='text-[#274FB6]' />
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
