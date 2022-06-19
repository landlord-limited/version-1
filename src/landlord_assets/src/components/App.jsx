import React from "react";
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard";
import CreateProperty from "./CreateProperty";
import Property from "./Property";
import OwnedProperty from "./OwnedProperty"
import Index from "./Index";
import '../../assets/input.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./faucet/App";

function App() {

  // const NFTID = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/property/:id' element={<Property />} />
        <Route path='/create-property' element={<CreateProperty />} />
        <Route path='/owned-property' element={<OwnedProperty />} />
      </Routes>
    </>
  )
}

export default App;
