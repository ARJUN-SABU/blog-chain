import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";
import NavLogo from "./NavLogo";
import MenuIcon from "@material-ui/icons/Menu";

function Nav() {
  function showMenu() {
    document.querySelector(".menu_icon").style.display = "none";
    document.querySelector(".nav_options").style.width = "180px";
  }

  function hideMenu() {
    if (window.innerWidth < 683) {
      document.querySelector(".menu_icon").style.display = "block";
      document.querySelector(".nav_options").style.width = "0";
    }
  }

  return (
    <div className="nav">
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <NavLogo />
      </Link>

      {/* Nav options */}
      <div className="menu_icon" onClick={showMenu}>
        <MenuIcon />
      </div>
      <div className="nav_options">
        <div className="dark"></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p onClick={hideMenu}>Home</p>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <p onClick={hideMenu}>About Us</p>
        </Link>
        <Link to="/new_blog" style={{ textDecoration: "none" }}>
          <p onClick={hideMenu}>New Blog</p>
        </Link>
        <div className="dark"></div>
      </div>
    </div>
  );
}

export default Nav;
