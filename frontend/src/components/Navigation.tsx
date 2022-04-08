import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const Navigation: FunctionComponent = () => {
  return (
    <nav className="navigation">
      <div className="nav-wrapper indigo darken-4">
        <ul>
          <li>
            <NavLink to="/home">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/colomatos">Colomatos</NavLink>
          </li>
          <li>
            <NavLink to="/defis">Défis</NavLink>
          </li>
          <li>
            <NavLink to="/about">A propos</NavLink>
          </li>
          <li>
            <Search />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
