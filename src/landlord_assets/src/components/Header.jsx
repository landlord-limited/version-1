import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import App from "./faucet/App";
import { landlord } from "../../../declarations/landlord";
// import CURRENT_USER_ID from "../index";
import dfinityLogo from "../../assets/dfinity.svg";

const CURRENT_USER_ID = "";

function Header() {

  const [userOwnedGallery, setUserOwnedGallery] = useState();
  const [listingGallery, setUserListingGallery] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [principal, setPrincipal] = useState("");
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

  async function getNFTs() {
    const userNFTIds = await landlord.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTIds);
    setUserOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} role="collection" />);

    const listedNFTIds = await landlord.getListedNFTs();
    console.log(listedNFTIds);
    setUserListingGallery(<Gallery title="Discover" ids={listedNFTIds} role="discover" />);
  }

  useEffect(() => {
    getNFTs();
    initAuth();
  }, []);

  return (
    <BrowserRouter forceRefresh={true}>
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <Link to="/">
          <h5 className="Typography-root header-logo-text">Landlord</h5>
          </Link>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/faucet">
            Faucet
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/discover">
            Dashboard
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/minter">
            Minter
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/collection">
            My NFTs
            </Link>
          </button>
        </div>
      </header>
    </div>
    <Switch>
      <Route exact path="/">
        <h1>Landing Page</h1>
      </Route>
      <Route path="/faucet">
        {!signedIn && client ? (
        <button onClick={signIn} className="auth-button">
          Get Started
          <img style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }} src={dfinityLogo} />
        </button>
      ) : <App />}
      </Route>
      <Route path="/discover">
        {listingGallery}
      </Route>
      <Route path="/minter">
        <Minter />
      </Route>
      <Route path="/collection">
        {userOwnedGallery}
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export {Header, CURRENT_USER_ID};
