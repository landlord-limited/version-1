import React, { useState } from 'react'
import { Principal } from '@dfinity/principal'
import { token } from '../../../../declarations/token'

function Transfer() {
  const [recipientId, setId] = useState('')
  const [amount, setAmount] = useState('')
  const [isHidden, setHidden] = useState(true)
  const [feedback, setFeedback] = useState('')
  const [isDisabled, setDisable] = useState(false)

  async function handleClick() {
    setHidden(true)
    setDisable(true)
    const recipient = Principal.fromText(recipientId)
    const amountToTransfer = Number(amount)

    const result = await token.transfer(recipient, amountToTransfer)
    setFeedback(result)
    setHidden(false)
    setDisable(false)
  }

  return (
    <div className='mb-4'>
      <div className='transfer'>
        <div className='flex flex-col mb-5'>
          <label htmlFor='account' className='mb-2'>
            To Account
          </label>
          <input
            type='text'
            id='transfer-to-id'
            className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
            value={recipientId}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-5'>
          <label htmlFor='account' className='mb-2'>
            Amount
          </label>
          <input
            type='number'
            id='amount'
            className='outline-none border border-gray-300 bg-gray-100 rounded-md px-4 py-2 focus:border-blue-500'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          id='btn-transfer'
          className='flex space-x-3 items-center bg-[#274FB6] text-white px-4 py-2 rounded'
          onClick={handleClick}
          disabled={isDisabled}
        >
          Transfer
        </button>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  )
}

export default Transfer
