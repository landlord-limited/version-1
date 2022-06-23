import React from 'react'
import Header from './Header'
import Faucet from './Faucet'
import Balance from './Balance'
import Transfer from './Transfer'
import Layout from '../Layout'

function FaucetApp(props) {
  return (
      <Layout>
    <div id='screen' className='mx-auto max-w-screen-sm px-4'>
      <Header />
      <Faucet id={props.id}/>
      <Balance />
      <Transfer />
    </div>
      </Layout>
  )
}

export default FaucetApp
