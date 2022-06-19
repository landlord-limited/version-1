import React from 'react'
import { usePropertyContext } from './context/context'
import Header from './dashboard/Header'
import Sidebar from './dashboard/Sidebar'

const Layout = ({ children }) => {
  const { isSidebarOpen } = usePropertyContext()
  return (
    <div className=''>
      <Header />
      <div className='flex space-x-5 w-full px-4'>
        {isSidebarOpen ? <Sidebar /> : null}
        <div className={`${isSidebarOpen ? 'w-4/5' : 'w-full'}`}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
