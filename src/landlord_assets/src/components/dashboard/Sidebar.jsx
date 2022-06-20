import React from "react";
import logo from '../../../assets/images/logo-blue.svg'
import { BsFillMenuButtonWideFill, BsPeopleFill } from 'react-icons/bs'
import { MdKeyboardArrowUp, MdLuggage } from 'react-icons/md'
import { RiFileList2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Disclosure, Transition } from '@headlessui/react'
import { AiFillAppstore } from 'react-icons/ai'
import { IoSettings } from 'react-icons/io5'
import cm1 from '../../../assets/images/communities/cm1.svg'
import cm2 from '../../../assets/images/communities/cm2.svg'
import cm3 from '../../../assets/images/communities/cm3.svg'
import cm4 from '../../../assets/images/communities/cm4.svg'
import cm5 from '../../../assets/images/communities/cm5.svg'

const Sidebar = () => {
  return (
    <div className='sticky top-24 border-r border-gray-200 px-2 w-full max-w-[340px]'>
      <div className='flex-grow '>
        <div className='flex justify-center '>
          <img src={logo} alt='Logo' />
        </div>
        <div className='mt-8'>
          <h1 className='py-2 text-xl text-[#274FB6] font-semibold'>Menu</h1>
          <ul className='p-2'>
            <Disclosure className='mb-5'>
              {({ open }) => (
                <div className='w-full'>
                  <Disclosure.Button
                    className={`${open ? 'bg-[#274FB6] text-white' : ''} mb-2 nav w-full`}
                  >
                    <div className='flex space-x-2 items-center'>
                      <BsFillMenuButtonWideFill className='text-lg' />
                      <Link to='/faucet'>
                      <span>Faucet</span>
                      </Link>
                    </div>
                    <MdKeyboardArrowUp className={`${open ? 'rotate-180 transform' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <ul className='ml-5 px-4 py-2 rounded '>
                        <li className='py-2'>
                          <Link to='/owned-property' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Edit Profile
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Watchlist
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            My Trades
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Token Converter
                          </Link>
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
            <Disclosure className='mb-5'>
              {({ open }) => (
                <div className='w-full'>
                  <Disclosure.Button
                    className={`${open ? 'bg-[#274FB6] text-white' : ''} mb-2 nav w-full`}
                  >
                    <div className='flex space-x-2 items-center'>
                      <RiFileList2Line className='text-lg' />
                      <Link to='/dashboard'>
                      <span>Dashboard</span>
                      </Link>
                    </div>
                    <MdKeyboardArrowUp className={`${open ? 'rotate-180 transform' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <ul className='ml-5 px-4 py-2 rounded '>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            All Listings
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Top Properties
                          </Link>
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
            <Disclosure className='mb-5'>
              {({ open }) => (
                <div className='w-full'>
                  <Disclosure.Button
                    className={`${open ? 'bg-[#274FB6] text-white' : ''} mb-2 nav w-full`}
                  >
                    <div className='flex space-x-2 items-center'>
                      <AiFillAppstore className='text-lg' />
                      <Link to='/owned-property'>
                      <span>Owned Properties</span>
                      </Link>
                    </div>
                    <MdKeyboardArrowUp className={`${open ? 'rotate-180 transform' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <ul className='ml-5 px-4 py-2 rounded '>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Live Auctions
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Trending
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Hot Deals
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Crowd Funding
                          </Link>
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
            <Disclosure className='mb-5'>
              {({ open }) => (
                <div className='w-full'>
                  <Disclosure.Button
                    className={`${open ? 'bg-[#274FB6] text-white' : ''} mb-2 nav w-full`}
                  >
                    <div className='flex space-x-2 items-center'>
                      <MdLuggage className='text-lg' />
                      <span>Virtual Tours</span>
                    </div>
                    <MdKeyboardArrowUp className={`${open ? 'rotate-180 transform' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <ul className='ml-5 px-4 py-2 rounded '>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Property Inspections
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Schedule Inspection
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            3D Virtual Tours
                          </Link>
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
            <Disclosure className='mb-5'>
              {({ open }) => (
                <div className='w-full'>
                  <Disclosure.Button
                    className={`${open ? 'bg-[#274FB6] text-white' : ''} mb-2 nav w-full`}
                  >
                    <div className='flex space-x-2 items-center'>
                      <BsPeopleFill className='text-lg' />
                      <span>Communities</span>
                    </div>
                    <MdKeyboardArrowUp className={`${open ? 'rotate-180 transform' : ''}`} />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <ul className='ml-5 px-4 py-2 rounded '>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Top Communities
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Your Communities
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link to='#' className='text-[#274FB6] hover:text-[#304a8a]'>
                            Community Guidelines
                          </Link>
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
            <Link to='#' className='flex space-x-2 items-center ml-4 text-[#274FB6]'>
              <IoSettings className='text-lg ' />
              <span>Settings</span>
            </Link>
          </ul>
          <div className='mt-8'>
            <h1 className='py-2 text-xl text-[#274FB6] font-semibold'>Your Communities</h1>
            <div className='flex flex-col ml-4 my-5'>
              <div className='flex space-x-4 items-center mb-4 border border-gray-200 rounded p-2'>
                <div className='relative h-6 w-6'>
                  <img src={cm1} alt='Community' className='object-cover w-full h-auto' />
                </div>
                <div>
                  <h1 className='text-md'>Avery Realty</h1>
                  <span className='text-gray-500 text-sm'>Real Estate Agency</span>
                </div>
              </div>
              <div className='flex space-x-4 items-center mb-4 border border-gray-200 rounded p-2'>
                <div className='relative h-6 w-6'>
                  <img src={cm2} alt='Community' className='object-cover w-full h-auto' />
                </div>
                <div>
                  <h1 className='text-md'>Echlon LLC</h1>
                  <span className='text-gray-500 text-sm'>Real Estate Agency</span>
                </div>
              </div>
              <div className='flex space-x-4 items-center mb-4 border border-gray-200 rounded p-2'>
                <div className='relative h-6 w-6'>
                  <img src={cm3} alt='Community' className='object-cover w-full h-auto' />
                </div>
                <div>
                  <h1 className='text-md'>Fidiso Estate</h1>
                  <span className='text-gray-500 text-sm'>Real Estate Agency</span>
                </div>
              </div>
              <div className='flex space-x-4 items-center mb-4 border border-gray-200 rounded p-2'>
                <div className='relative h-6 w-6'>
                  <img src={cm4} alt='Community' className='object-cover w-full h-auto' />
                </div>
                <div>
                  <h1 className='text-md'>Haddow Estates</h1>
                  <span className='text-gray-500 text-sm'>Real Estate Agency</span>
                </div>
              </div>
              <div className='flex space-x-4 items-center mb-4 border border-gray-200 rounded p-2'>
                <div className='relative h-6 w-6'>
                  <img src={cm5} alt='Community' className='object-cover w-full h-auto' />
                </div>
                <div>
                  <h1 className='text-md'>Oman Group</h1>
                  <span className='text-gray-500 text-sm'>Real Estate Agency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
