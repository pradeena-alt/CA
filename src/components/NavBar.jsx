import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/activities">Valid Activities</NavLink>
      <NavLink to="/filter">Filter</NavLink>
      <NavLink to="/achievements">Achievements</NavLink>
      <NavLink to="/stats">Stats</NavLink>
    </nav>
  );
};

export default NavBar;
