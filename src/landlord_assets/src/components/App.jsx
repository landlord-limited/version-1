import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import CreateProperty from './CreateProperty'
import Property from './Property'
import OwnedProperty from './OwnedProperty'
import Index from './Index'
import FaucetApp from './faucet/App'
import "../../assets/input.css"

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [client, setClient] = useState();
  const [principal, setPrincipal] = useState();

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      setPrincipal(principal)
    }
  }

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal().toString()
          resolve({ identity, principal })
        },
        onError: reject,
      })
    })
    setSignedIn(true)
    setPrincipal(principal)
  }

  useEffect(() => {
    initAuth()
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Index signedIn={signedIn} signIn={signIn} client={client} />} />
        <Route path='/faucet' element={<FaucetApp id={principal} signedIn={signedIn} signIn={signIn} client={client} />} />
        <Route path='/dashboard' element={<Dashboard id={principal} signedIn={signedIn} signIn={signIn} /> } />
        <Route path='/property/:id' element={<Property id={principal} signedIn={signedIn} signIn={signIn}/>} />
        <Route path='/create-property' element={<CreateProperty />} />
        <Route path='/owned-property' element={<OwnedProperty id={principal} signedIn={signedIn} signIn={signIn} />} />
      </Routes>
    </>
  )
}

export default App
