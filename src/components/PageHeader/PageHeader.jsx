import React from "react";
import "./PageHeader.scss";
import instockLogo from "../../assets/logo/InStock-Logo.svg";
import { Link, NavLink } from "react-router-dom";

const PageHeader = () => {
  const handleButtonClick = () => {
    // console.log("Click!");
  };
  return (
    <header className="page-header">
      <Link to="/">
        <img
          className="page-header__logo"
          src={instockLogo}
          alt="InStock Logo"
        />
      </Link>
      <nav className="page-header__navbar">
        <NavLink to="/" className="page-header__link">
          <button className="page-header__button" onClick={handleButtonClick}>
            Warehouses
          </button>
        </NavLink>
        <NavLink to="/Inventory" className="page-header__link">
          <button className="page-header__button" onClick={handleButtonClick}>
            Inventory
          </button>
        </NavLink>
      </nav>
    </header>
  );
};

export default PageHeader;
