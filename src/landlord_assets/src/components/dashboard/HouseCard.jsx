import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { landlord } from "../../../../declarations/landlord"
import cm1 from '../../../assets/images/communities/cm1.svg'
import { FaRulerHorizontal, FaRegTimesCircle } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs'
import { MdLocationOn, MdPlaylistAdd } from 'react-icons/md'
import { FiActivity, FiShare2, FiFlag } from 'react-icons/fi'
import coin from '../../../assets/images/coin.svg'
import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'

const HouseCard = ({ layout, id, role }) => {

  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [valuation, setValuation] = useState("");
  const [propertyType, setType] = useState("");
  const [llc, setLLC] = useState("");
  // const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLable] = useState();
  const [shouldDisplay, setDisplay] = useState(true);

  const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");


  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({host: localHost});
  // Remove line below before deploy
  agent.fetchRootKey();
  ////////////////
  let NFTActor;

  async function loadNFT() {
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
    setType(type);
    setLLC(LLC);

    if (role == "collection") {

        const nftIsListed = await landlord.isListed(props.id);
    
        if (nftIsListed) {
          setOwner("Landlord");
          setBlur({filter: "blur(4px)"});
          setSellStatus("Listed");
        } else {
          setButton(<Button handleClick={handleSell} text={"Sell"} />);
        }
    
    } else if (role == "discover") {
      const originalOwner = await landlord.getOriginalOwner(id);
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }

      const price = await landlord.getListedNFTPrice(id);
      setPriceLable(<PriceLabel sellPrice={price.toString()} />)
    }
  } 


  useEffect(() => {
    loadNFT();
  }, [])

  let price;

  function handleSell() {
    console.log("Sell clicked");
    setPriceInput(<input
        placeholder="Price in LND"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => price=e.target.value}
      />);
    
    // setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  }

  async function sellItem() {
    setBlur({filter: "blur(4px)"});
    setLoaderHidden(false);
    console.log("set price = " + price);
    // const newId = Principal.fromText(props.id);
    // console.log("Principal: " + newId);
    const listingResult = await landlord.listItem(id, Number(price));
    console.log("listing: " + listingResult);
    if (listingResult == "Success") {
      const lord = await landlord.getLandlordCanisterId();
      const transferResult = await NFTActor.transferOwnership(lord);
      console.log(transferResult);
      if (transferResult == "Success") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("Landlord");
        setSellStatus("Listed");
      }
    }
  }

  async function handleBuy() {
    console.log("Buy was triggered");
    setLoaderHidden(false);
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
      setLoaderHidden(true);
      setDisplay(false);
    }
  }

  return (
    <div
      className={`relative border border-gray-200 p-4 rounded-lg flex-shrink-0 flex-grow-0 ${
        layout === 'flex' ? 'w-[300px]' : ''
      }`}
    >
      <div className='flex items-center justify-between mb-2'>
        <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center'>
          <img src={cm1} className='h-6 w-6' alt='Agent' />
        </div>

        <Popover className='relative'>
          <Popover.Button className='outline-none'>
            <BsThreeDotsVertical className='text-black text-lg' />
          </Popover.Button>
          <Popover.Panel className='absolute z-10 w-[250px] p-2 border border-gray-200 right-0 top-6 rounded bg-white whitespace-nowrap'>
            <ul>
              <li className='flex items-center space-x-2 transition duration ease-in-out cursor-pointer rounded hover:bg-gray-100 p-2'>
                <MdPlaylistAdd className='text-xl' />
                <span className='text-sm'>Add to Wishlist</span>
              </li>
              <li className='flex items-center space-x-2 transition duration ease-in-out cursor-pointer rounded hover:bg-gray-100 p-2'>
                <FiActivity className='text-xl' />
                <span className='text-sm'>View Community Rating</span>
              </li>
              <li className='flex items-center space-x-2 transition duration ease-in-out cursor-pointer rounded hover:bg-gray-100 p-2'>
                <FiShare2 className='text-xl' />
                <span className='text-sm'>Share to Community</span>
              </li>
              <div className='border-t border-gray-200 pt-4 mt-4'>
                <li className='flex items-center space-x-2 transition duration ease-in-out cursor-pointer rounded hover:bg-gray-100 p-2'>
                  <FiFlag className='text-xl' />
                  <span className='text-sm'>Flag as Illegal</span>
                </li>
                <li className='flex items-center space-x-2 transition duration ease-in-out cursor-pointer rounded hover:bg-gray-100 p-2'>
                  <FaRegTimesCircle className='text-xl' />
                  <span className='text-sm'>Remove from Feed</span>
                </li>
              </div>
            </ul>
          </Popover.Panel>
        </Popover>
      </div>
      <div className='relative w-full h-[200px] overflow-hidden rounded-lg group'>
        <img
          src={image}
          loading='lazy'
          alt='House'
          className='object-cover h-full w-full rounded-lg'
        />
        <div className='absolute bottom-0 flex items-center bg-white space-x-2 py-1 px-2 right-0 border border-gray-200 rounded-l-md'>
          <img src={coin} alt='coin' className='w-5 h-5' />
          <span className='font-semibold text-sm'>{valuation} LND</span>
        </div>
        <div className='absolute w-full h-full rounded-lg z-20 bg-[#00000075] hidden top-0 group-hover:flex justify-center items-center transition duration-150 ease-in-out cursor-pointer'>
          <Link
            to={`/property/${id}`}
            className='border border-gray-100 px-4 py-2 rounded text-white text-sm flex items-center space-x-2'
          >
            <BsEye />
            <span>View</span>
          </Link>
        </div>
      </div>
      <div className='flex justify-between mt-4'>
        <div className='flex space-x-2'>
          <div>
            <h1 className='text-lg font-semibold'>2 Bedroom Apartment</h1>
            <h2 className='text-sm text-red-700 font-semibold'>Spectro Homes</h2>
            <div>
              <span className='flex space-x-2 items-center text-xs mt-2 text-gray-500 mb-2'>
                <FaRulerHorizontal />
                <span>398,000 sqft</span>
              </span>
              <span className='flex space-x-2 items-center text-xs mt-2 text-gray-500 mb-2'>
                <BsEye />
                <span>10k views</span>
              </span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseCard
