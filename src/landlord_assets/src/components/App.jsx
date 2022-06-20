import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import CreateProperty from './CreateProperty'
import Property from './Property'
import OwnedProperty from './OwnedProperty'
import Index from './Index'
import FaucetApp from './faucet/App'

const CURRENT_USER_ID = "";

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [client, setClient] = useState();

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      setPrincipal(principal)
      CURRENT_USER_ID = principal;
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
    CURRENT_USER_ID = principal;
  }

  useEffect(() => {
    initAuth()
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/faucet' element={!signedIn && client ? signIn() : <FaucetApp userId={CURRENT_USER_ID} />} />
        <Route path='/dashboard' element={!signedIn && client ? signIn() : <Dashboard userId={CURRENT_USER_ID} />} />
        <Route path='/property/:id' element={!signedIn && client ? signIn() : <Property userId={CURRENT_USER_ID} />} />
        <Route path='/create-property' element={!signedIn && client ? signIn() : <CreateProperty userId={CURRENT_USER_ID} />} />
        <Route path='/owned-property' element={!signedIn && client ? signIn() : <OwnedProperty userId={CURRENT_USER_ID} />} />
      </Routes>
    </>
  )
}

export default App
