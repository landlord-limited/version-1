import React, { useEffect, useState } from "react";
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

const Property = () => {

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

    if (props.role == "collection") {

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
  
  const img =
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670'
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
        <div className='pt-3 pb-10'>
          <div className='sticky top-[79px] bg-white pt-2'>
            <div className='flex justify-end mb-5 border-b border-gray-200 pb-3'>
              <button className='flex space-x-3 items-center bg-teal-700 text-white px-4 py-2 rounded'>
                <BiPlus />
                <span>Buy Property</span>
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
              <img src={image} alt='Property' className='rounded-lg' />
              <div className='flex space-x-4 overflow-x-scroll scrollbar-hide touch-pan-x snap-mandatory snap-x snap-center scroll-smooth mt-5'>
                {properties.map(({ img }) => (
                  <div className='rounded-lg w-36 h-28 flex-grow-0 flex-shrink-0'>
                    <img
                      src={img}
                      alt='Property'
                      className='rounded-lg object-cover h-full w-full'
                    />
                  </div>
                ))}
              </div>
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