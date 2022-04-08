import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../style/App.css";

const Header: FunctionComponent = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  

  return (
    <header className="app-header">
      <div className="user-infos">
        {isLogged ? (
          <div className="logout">
            <NavLink
              to={"/logout"}
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavLink>
          </div>
        ) : (
          <div className="login">
            <NavLink
              to={"/login"}
              className="btn-floating btn-large waves-effect waves-light green"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </NavLink>
          </div>
        )}
      </div>
      <div className="h-part">
        <h1 className="center-align">Funpigments</h1>
        <Navigation />
      </div>
      <div className="search"></div>
    </header>
  );
};

export default Header;
