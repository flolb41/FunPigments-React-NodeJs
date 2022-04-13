import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Admin, Resource } from "react-admin";
import { UserList } from "../admin/userAdmin";
import { ColomatosList } from "../admin/colomatosAdmin";
import { DefisList } from "../admin/defisAdmin";
import jsonServerProvider from "ra-data-json-server";
//import PrivateRoute from "../PrivateRoute";

import "../style/App.css";
import "../style/pages/home.css";

import Main from "../pages/Main";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Colomatos from "../pages/Colomatos";
import Defis from "../pages/Defis";
import About from "../pages/About";
import Logout from "../components/Logout";

import PageNotFound from "../pages/PageNotFound";
import Header from "../components/Header";


const dataProvider = jsonServerProvider('http://localhost:3000/api/auth/');

const App = () => {
  
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/colomatos" element={<Colomatos />} />
        <Route path="/defis" element={<Defis />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={
          <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
            <Resource name="colomatos" list={ColomatosList} />
            <Resource name="defis" list={DefisList} />
          </Admin>} />
      </Routes>
      
        
    </div>
  );
};

export default App;
