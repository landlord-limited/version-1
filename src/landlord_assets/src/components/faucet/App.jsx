import React from 'react'
import Header from './Header'
import Faucet from './Faucet'
import Balance from './Balance'
import Transfer from './Transfer'

function FaucetApp(props) {
  return (
    <div id='screen' className='mx-auto max-w-screen-sm px-4'>
      <Header />
      <Faucet id={props.userId}/>
      <Balance id={props.userId}/>
      <Transfer id={props.userId}/>
    </div>
  )
}

export default FaucetApp
