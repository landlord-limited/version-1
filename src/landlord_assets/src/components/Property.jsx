import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { landlord } from "../../../declarations/landlord";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { NFTDetails } from "./dashboard/HouseCard";
import cm1 from '../../assets/images/communities/cm1.svg'
import Layout from './Layout'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { FaRulerHorizontal } from 'react-icons/fa'
import { BiCurrentLocation, BiPlus } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import coin from '../../assets/images/coin.svg'
import { FiKey } from 'react-icons/fi'
import { Principal } from "@dfinity/principal";
import Button from "./Button";

const Property = (props) => {

  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [valuation, setValuation] = useState("");
  // const [propertyType, setType] = useState("");
  // const [llc, setLLC] = useState("");
  const [button, setButton] = useState();
  const [blur, setBlur] = useState();
  const [loader, setLoader] = useState()

  const CURRENT_USER_ID = props.id;


  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({host: localHost});
  // Remove line below before deploy
  agent.fetchRootKey();
  ////////////////
  let NFTActor;
  let id;
  let role;

  async function loadNFT() {

    id = NFTDetails.canId;
    role = NFTDetails.role;
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getDescription();
    const owner = await NFTActor.getOwner();
    const value = await NFTActor.getValue();
    const type = await NFTActor.getType();
    const LLC = await NFTActor.getLLC();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(new Blob([imageContent.buffer], {type: "image/png"}));

    setDescription(name);
    setOwner(owner.toText());
    setImage(image);
    setValuation(value);
    // setType(type);
    // setLLC(LLC);

    if (role == "collection") {

        const nftIsListed = await landlord.isListed(id);
        console.log("collection");
    
        if (nftIsListed) {
          setOwner("Landlord");
          setBlur({filter: "blur(4px)"});
        } else {
          setButton(<Button handleClick={sellProperty} text={"Sell Property"} />);
        }
    
    } else if (role == "discover") {
      const originalOwner = await landlord.getOriginalOwner(id);
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy Property"} />);
      }
    }
  } 


  useEffect(() => {
    loadNFT();
    console.log(NFTDetails)
  }, [])

  let price;

  async function sellProperty() {

    setLoader(<svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>)
    setButton("Loading..");
    console.log("set price = " + valuation);
    const listingResult = await landlord.listItem(id, Number(valuation));
    console.log("listing: " + listingResult);
    if (listingResult == "Success") {
      const landlordId = await landlord.getLandlordCanisterId();
      const transferResult = await NFTActor.transferOwnership(landlordId);
      console.log(transferResult);
      if (transferResult == "Success") {
        setLoader();
        setBlur({filter: "blur(4px)"});
        setButton("Property Listed!");
        setPriceInput();
        setOwner("Landlord");
      }
    }
  }

  async function handleBuy() {
    setLoader(<svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>)
    setButton("Loading..");
    console.log("Buy was triggered");
    const tokenActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("rkp4c-7iaaa-aaaaa-aaaca-cai"),
    });

    const sellerId = await landlord.getOriginalOwner(id);
    const itemPrice = await landlord.getListedNFTPrice(id);

    const result = await tokenActor.transfer(sellerId, itemPrice);
    if (result == "Success") {
      //Transfer Ownership
      const transferResult = await landlord.completePurchase(id, sellerId, CURRENT_USER_ID);
      console.log("purchase: " + transferResult);
      setLoader()
      setButton("Property Bought!");
    }
  }
  

  return (
    <div>
      <Layout>
        <div className='pt-3 pb-10'>
          <div className='sticky top-[79px] bg-white pt-2'>
            <div className='flex justify-end mb-5 border-b border-gray-200 pb-3'>
              <button className='flex space-x-3 items-center bg-teal-700 text-white px-4 py-2 rounded'>
                {loader ? loader : <BiPlus />}
              {button}
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex-grow-0'>
              <div className='flex justify-between items-center mb-2'>
                <div className='flex space-x-4'>
                  <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center'>
                    <img src={cm1} className='h-6 w-6' alt='Agent' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <h1 className='text-3xl'> Spectro Homes</h1>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <img src={coin} alt='coin' className='w-8 h-8' />
                  <span className='font-semibold text-lg'>{valuation} LND</span>
                </div>
              </div>
              <img src={image} style={blur} alt='Property' className='rounded-lg' />
              {/* <div className='flex space-x-4 overflow-x-scroll scrollbar-hide touch-pan-x snap-mandatory snap-x snap-center scroll-smooth mt-5'>
                {properties.map(({ img }) => (
                  <div className='rounded-lg w-36 h-28 flex-grow-0 flex-shrink-0'>
                    <img
                      src={img}
                      alt='Property'
                      className='rounded-lg object-cover h-full w-full'
                    />
                  </div>
                ))}
              </div> */}
              <div className='mt-4 '>
                <div className='border-b border-gray-200 pb-5 mb-5 flex items-center justify-between'>
                  <div>
                    <h1 className='text-2xl'> 4 Bedroom Apartment </h1>
                    <span className='flex space-x-2 items-center text-xs mt-2 text-gray-500 mb-2'>
                      <MdLocationOn />
                      <div className='flex space-x-3 items-center'>
                        <span>Lagos, Nigeria</span>
                        <span className='flex space-x-2 items-center'>
                          <AiOutlineClockCircle /> <span>4 weeks ago</span>
                        </span>
                      </div>
                    </span>
                  </div>
                  <button className='flex space-x-3 items-center bg-[#274FB6] text-white px-4 py-2 rounded'>
                    <BiPlus />
                    <span>Follow</span>
                  </button>
                </div>
                <div className='border-b border-gray-200 pb-5 mb-5'>
                  <span className='flex space-x-3 text-lg text-gray-700 mb-4'>
                    <BiCurrentLocation className='text-3xl' />
                    <div>
                      <h1 className=''>Lekki Gardens</h1>
                      <div className='text-xs text-gray-500'>Location</div>
                    </div>
                  </span>
                  <span className='flex space-x-3 items-center text-lg text-gray-700 mb-4'>
                    <FaRulerHorizontal className='text-3xl' />
                    <div>
                      <h1 className=''>398,000 sqft</h1>
                      <div className='text-xs text-gray-500'>Size</div>
                    </div>
                  </span>
                  <span className='flex space-x-3 items-center text-lg text-gray-700'>
                    <BsEye className='text-3xl' />
                    <span>10k views</span>
                  </span>
                </div>
                <div className='border-b border-gray-200 pb-5 mb-5'>
                  <h1 className='text-2xl font-semibold mb-2'>Description</h1>
                  <p className='text-gray-500 text-sm '>
                    {description}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='comment'>Comment</label>
                  <textarea
                    cols='30'
                    rows='5'
                    className='outline-none border border-gray-200 rounded-lg p-2 mt-2 text-sm'
                    placeholder='Write a comment'
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='flex-grow-0'>
              <div className='mt-1 h-[500px] rounded-lg bg-gray-100'></div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                <div className='py-2 px-4 border border-gray-200 rounded-lg'>
                  <h1 className='mb-3 text-gray-500'>Investors Confirmed</h1>
                  <span className='text-3xl font-semibold'>54,000</span>
                  <div className='flex space-x-2 mt-2 items-center'>
                    <div className='rounded-full w-8 h-8 bg-gray-100 text-[#274FB6] flex items-center justify-center'>
                      <FiKey />
                    </div>
                    <span className='text-sm'>+14% Inc</span>
                  </div>
                </div>
                <div className='py-2 px-4 border border-gray-200 rounded-lg'>
                  <h1 className='mb-3 text-gray-500'>Brokered Deals confirmed</h1>
                  <span className='text-3xl font-semibold'>120,000</span>
                  <div className='flex space-x-2 mt-2 items-center'>
                    <div className='rounded-full w-8 h-8 bg-gray-100 text-[#274FB6] flex items-center justify-center'>
                      <FiKey />
                    </div>
                    <span className='text-sm'>+14% Inc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Property