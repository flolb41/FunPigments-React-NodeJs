import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

import "../style/App.css";
import "../style/pages/home.css";

import Main from "../pages/Main";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Colomatos from "../pages/Colomatos";
import Defis from "../pages/Defis";
import About from "../pages/About";
import Logout from "../components/Logout";

import PageNotFound from "../pages/PageNotFound";
import Header from "../components/Header";

const App = () => {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/colomatos" element={<Colomatos />} />
          <Route path="/defis" element={<Defis />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
};

export default App;
