import React, { useEffect, useState } from "react";
import Layout from './Layout'
import { HouseCard } from './dashboard/HouseCard'
import { landlord } from "../../../declarations/landlord";
import { Principal } from "@dfinity/principal";

const OwnedProperty = (props) => {

  const [userOwnedGallery, setUserOwnedGallery] = useState();

  const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");

  async function getNFTs() {
    const userNFTIds = await landlord.getOwnedNFTs(props.userId)
    console.log(userNFTIds)
    setUserOwnedGallery(userNFTIds.map((NFTId) => (
                <HouseCard key={NFTId.toText()} id={NFTId} role='collection' layout='grid' />
              )))
  }

  useEffect(() => {
    getNFTs();
  }, []);
  const properties = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2665',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670',
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2675',
    },
    {
      id: 7,
      img: 'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336',
    },
    {
      id: 8,
      img: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2681',
    },
  ]
  return (
    <div>
      <Layout>
        <div className='py-10'>
          <div className='flex space-x-5 border-b border-gray-200 pb-5'>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Top Ranking
            </div>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Trending
            </div>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Latest Updates
            </div>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Property Rankings
            </div>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Most Relevant
            </div>
            <div className='rounded border border-[#274FB6] font-semibold px-4 py-2 text-sm text-[#274FB6] cursor-pointer'>
              Top Searches
            </div>
          </div>
          <div className='mt-10'>
            <h1 className='text-2xl font-semibold'>Trending</h1>
            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide touch-pan-x snap-mandatory snap-x snap-center scroll-smooth mt-5'>
              {userOwnedGallery}
            </div>
          </div>
          {/* <div className='mt-10'>
            <h1 className='text-2xl font-semibold'>All Listings</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-5'>
              {properties.map(({ img, id }) => (
                <HouseCard key={id} img={img} id={id} role='collection' layout='grid' />
              ))}
            </div>
          </div> */}
        </div>
      </Layout>
    </div>
  )
}

export default OwnedProperty