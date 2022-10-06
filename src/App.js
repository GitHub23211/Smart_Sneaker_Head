
import './App.css';
import React from 'react';
import { useState } from "react";

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import User from './Components/User';
import Orders from './Components/Orders';
import UserProfile from './Components/UserProfile';
import UpdateProfile from './Components/UpdateProfile';
import Sell from './Components/Sell';
import Product  from './Components/Product';
import Cart  from './Components/Cart';
import DeleteAccount  from './Components/DeleteAccount';
import LoginContext from './LoginContext';
import ProductContext from './ProductContext';

import ProductList from './Components/ProductList';

import {
  BrowserRouter as Router,
  Routes, Route 
} from "react-router-dom"


function App() {
  const [isLogin, setLogin] = useState(false);
  const [userToken, setToken] = useState();
  const [product, setProduct] = useState({name: "Dummy"});

  return (
    <LoginContext.Provider value={{isLogin, setLogin, userToken , setToken}}> 
    <ProductContext.Provider value={{product, setProduct}}> 
    <Router>       
      <div className='App'>
      <NavBar />
      <section>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route path = "/user" element={<User />}>
               <Route index element={<UserProfile />} />
               <Route path = "/user/profile" element={<UserProfile />} />
               <Route path = "/user/updateprofile" element={<UpdateProfile />} />
               <Route path = "/user/orders" element={<Orders />} />
               <Route path = "/user/sell" element={<Sell />} />
               <Route path = "/user/delete" element={<DeleteAccount />} />
        </Route>  
        <Route path = "/user/cart" element={<Cart />} />
        <Route path = "/product" element={<Product />} /> 
        <Route path = "/productlist" element={<ProductList />} /> 

      </Routes>
      </section>
      </div>
    </Router>
    </ProductContext.Provider>
    </LoginContext.Provider>  
  );
}

export default App;
