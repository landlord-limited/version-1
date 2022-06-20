import React, { useState } from 'react'
import { Principal } from '@dfinity/principal'
import { token } from '../../../../declarations/token'

function Balance() {
  const [inputValue, setInput] = useState('')
  const [balanceResult, setBalance] = useState('')
  const [cryptoSymbol, setSymbol] = useState('')
  const [isHidden, setHidden] = useState(true)

  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue)
    const balance = await token.balanceOf(principal)
    setBalance(balance.toLocaleString())
    setSymbol(await token.getSymbol())
    setHidden(false)
  }

  return (
    <div className='mb-4 border-b border-gray-100 pb-10 flex flex-col'>
      <label>Check account token balance:</label>
      <input
        id='balance-principal-id'
        className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500 mb-2'
        type='text'
        placeholder='Enter a Principal ID'
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className='trade-buttons'>
        <button
          id='btn-request-balance'
          className='flex space-x-3 items-center bg-[#274FB6] text-white px-4 py-2 rounded'
          onClick={handleClick}
        >
          Check Balance
        </button>
      </div>
      <p hidden={isHidden}>
        This account has a balance of {balanceResult} {cryptoSymbol}.
      </p>
    </div>
  )
}

export default Balance
