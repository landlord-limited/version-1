import React from "react";
import { usePropertyContext } from '../context/context'
import { BiMenu, BiPlus, BiSearch, BiUser } from 'react-icons/bi'

function Header() {
  const { toggleSidebar } = usePropertyContext()
  return (
    <header>
      <div className='flex justify-between'></div>
      <div className='cursor-pointer' onClick={toggleSidebar}>
          <BiMenu className='text-[#274FB6] text-2xl' />
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          Landlord
        </h1>
      </div>
      </div>
    </header>
  );
}

export default Header;
