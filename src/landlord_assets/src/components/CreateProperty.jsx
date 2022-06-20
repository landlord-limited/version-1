import React, { useEffect, useState, Fragment } from 'react'
import { landlord } from "../../../declarations/landlord";
import Layout from './Layout'
import { Listbox, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { BiImageAdd } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Button from "./Button";
import OwnedProperty from './OwnedProperty'



const CreateProperty = (props) => {
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState()
  const [dImage, setImage] = useState(null)
  const [nftPrincipal, setNFTPrincipal] = useState("");
  const [image, sendImage] = useState({});
  const [description, setDescription] = useState("");
  const [valuation, setValuation] = useState("");
  const [propertyType, setType] = useState("");
  const [text, setText] = useState("");
  const [llc, setLLC] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);

  async function onSubmit() {
    setLoaderHidden(<svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>)
    setText("Loading")
    
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];
    console.log(imageByteData);

    const newNFTID = await landlord.mint(imageByteData, description, valuation, propertyType, llc);
    console.log(newNFTID.toText());
    setNFTPrincipal(newNFTID);
    setLoaderHidden(true);

    setLoaderHidden(null)
    setText("Done!")

    return <OwnedProperty />
  }

  const URL = 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json'

  //fetch countries function
  const fetchCountries = async () => {
    const res = await fetch(URL)
    const data = await res.json()
    setCountries(data)
    setSelected(data[0])
  }

  const showImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(window.URL.createObjectURL(e.target.files[0]))
      sendImage(e.target.files[0])
    }
  }
  const removeImage = () => setImage(null)

  useEffect(() => {
    fetchCountries()
    setText("Create Token")
  }, [])

  console.log(dImage)

  return (
    <Layout>
      <div className='py-10'>
        <div className='mx-auto max-w-screen-sm'>
          <h1 className='mb-5 text-2xl font-semibold'>Create Property</h1>
          <div className='flex flex-col mb-5'>
            <label htmlFor='location' className='mb-2'>
              Location
            </label>
            <input
              type='text'
              className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
              placeholder='Enter Property location'
            />
          </div>
          <div className='flex flex-col mb-5'>
            <Listbox value={selected} onChange={setSelected}>
              <span className='mb-2'>Select Country</span>
              <div className='relative flex'>
                <Listbox.Button className='w-full relative text-left flex items-center justify-between bg-gray-100 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500'>
                  <div className='flex space-x-2'>
                    {selected && (
                      <>
                        <span className='text-xl'>{selected.emoji}</span>
                        <span>{selected.name}</span>
                      </>
                    )}
                  </div>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute max-h-60 top-14 bg-gray-100 w-full overflow-auto py-3 rounded-lg'>
                    {countries.map((country) => (
                      <Listbox.Option
                        key={country.name}
                        value={country}
                        className={({ active }) =>
                          `relative cursor-default select-none px-3 py-2 ${
                            active ? 'bg-[#264fb6a8] text-white' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className='flex space-x-2'>
                            <span className='text-xl'>{country.emoji}</span>
                            <span>{country.name}</span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className='flex flex-col mb-5'>
            <label htmlFor='location' className='mb-2'>
              Name of LLC
            </label>
            <input
              type='text'
              onChange={(e) => setLLC(e.target.value)}
              className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
              placeholder='Enter LLC name'
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label htmlFor='location' className='mb-2'>
              Property Type
            </label>
            <input
              type='text'
              onChange={(e) => setType(e.target.value)}
              className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
              placeholder='Enter Property Type'
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label htmlFor='location' className='mb-2'>
              Valuation
            </label>
            <input
              type='text'
              onChange={(e) => setValuation(e.target.value)}
              className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
              placeholder='Enter Property Valuation'
            />
          </div>
          <div className='flex flex-col mb-5 relative'>
            <label htmlFor='location' className='mb-2'>
              Select Image
            </label>
            <div className='flex justify-center items-center bg-gray-100 border border-gray-300 h-[400px] py-4 rounded-lg relative'>
              <div className='text-center w-full h-full flex items-center justify-center relative'>
                <div>
                  <div className='flex justify-center'>
                    <BiImageAdd className='text-4xl' />
                  </div>
                  <span>Click to add image</span>
                  <input
                    type='file'
                    onChange={showImage}
                    className='absolute border border-gray-200 w-full h-full left-0 top-0 opacity-0'
                  />
                </div>
              </div>
              {dImage && (
                <div className='absolute top-5 z-10 w-full h-4/5 bg-gray-100'>
                  <img
                    src={dImage}
                    className='w-full h-full object-contain rounded-lg'
                    alt='Property image'
                  />
                  <div className='flex justify-center'>
                    <button
                      className='mt-4 bg-red-600 text-white px-4 py-2 rounded text-sm'
                      onClick={removeImage}
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col mb-5'>
            <label htmlFor='location' className='mb-2'>
              Property Description
            </label>
            <textarea
              cols='30'
              rows='5'
              onChange={(e) => setDescription(e.target.value)}
              className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
              placeholder='Enter Property Description'
            ></textarea>
          </div>
          <div>
            <button className='flex space-x-3 items-center bg-[#274FB6] text-white px-4 py-2 rounded'>
              {loaderHidden}
              <span onClick={onSubmit}>{text}</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProperty