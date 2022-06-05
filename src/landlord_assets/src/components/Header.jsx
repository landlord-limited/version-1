import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import App from "./faucet/App";
import { landlord } from "../../../declarations/landlord";
import CURRENT_USER_ID from "../index";

function Header() {

  const [userOwnedGallery, setUserOwnedGallery] = useState();
  const [listingGallery, setUserListingGallery] = useState();

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
        <App />
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

export default Header;
