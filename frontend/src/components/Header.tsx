import React, { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../style/App.css";
import AuthService from "../services/authentication-service";

const Header: FunctionComponent = () => {
  const isLogged = localStorage.getItem("user") !== null;
  console.log(isLogged);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);

  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="user-infos">
        {isLogged ? (
          <div className="user-infos">
            <p>{user.username}</p>
            <NavLink className="btn waves-light blue" to="/profile">
              Profile
            </NavLink>
            <button onClick={logout} className="btn wave-light red">
              <i className="fa-solid fa-right-from-bracket"></i>
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="login">
            <NavLink
              to={"/login"}
              className=" btn-large waves-effect waves-light green"
            >
              Connection
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
