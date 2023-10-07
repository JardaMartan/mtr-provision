import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <NavLink to="">Home</NavLink>
      {" | "}
      <NavLink to="device">Device</NavLink>
      {" | "}
      <NavLink to="provision">Provision</NavLink>
      {" | "}
      <NavLink to="settings">Settings</NavLink>
    </nav>
  );
};

export default Header;
