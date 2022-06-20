import React, { useState } from 'react'
import { token } from '../../../../declarations/token'

function Faucet(props) {
  const [isDisabled, setDisable] = useState(false)
  const [buttonText, setText] = useState('Gimme gimme')

  async function handleClick(event) {
    setDisable(true)
    const result = await token.payOut()
    console.log('payout: ' + result)
    setText(result)
  }

  return (
    <div className='mb-4 border-b border-gray-100 pb-10'>
      <h2 className='text-center text-2xl'>
        <span role='img' aria-label='tap emoji'>
          🚰
        </span>
        Faucet
      </h2>
      <label className='mt-3 text-lg'>
        Get your free Landlord tokens here! Claim 10,000 LND tokens to {props.id}
      </label>
      <div className='mt-2'>
        <button
          className='flex space-x-3 items-center bg-[#274FB6] text-white px-4 py-2 rounded'
          id='btn-payout'
          onClick={handleClick}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Faucet
