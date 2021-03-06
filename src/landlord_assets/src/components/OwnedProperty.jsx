import React, { useEffect, useState } from "react";
import Layout from './Layout'
import { HouseCard } from './dashboard/HouseCard'
import { landlord } from "../../../declarations/landlord";

const OwnedProperty = (props) => {

  const [userOwnedGallery, setUserOwnedGallery] = useState();

  async function getNFTs() {
    const userNFTIds = await landlord.getOwnedNFTs(props.id)
    console.log(userNFTIds)
    setUserOwnedGallery(userNFTIds.map((NFTId) => (
                <HouseCard key={NFTId.toText()} id={NFTId} role='collection' layout='grid' />
              )))
  }

  useEffect(() => {
    getNFTs();
  }, []);
  
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