
import './App.css';
import React from 'react';
import { useState } from "react";

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import ProductList from './Components/ProductList';


import UserRegister from './Components/UserComponents/UserRegister';
import User from './Components/UserComponents/User';
import Orders from './Components/UserComponents/Orders';
import Wishlist from './Components/UserComponents/Wishlist';
import UserProfile from './Components/UserComponents/UserProfile';
import UpdateProfile from './Components/UserComponents/UpdateProfile';
import Cart  from './Components/UserComponents/Cart';
import DeleteAccount  from './Components/UserComponents/DeleteAccount';

import Seller from './Components/SellerComponents/Seller';
import SellerRegister from './Components/SellerComponents/SellerRegister';
import SellerProfile from './Components/SellerComponents/SellerProfile';
import SellerProducts from './Components/SellerComponents/SellerProducts';
import Sell from './Components/SellerComponents/Sell';
import Product  from './Components/Product';


import LoginContext from './LoginContext';
import ProductContext from './ProductContext';



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
        <Route  path = "/register/seller" element={<SellerRegister />} />
        <Route  path = "/register/user" element={<UserRegister />} />

        <Route path = "/user" element={<User />}>
               <Route index element={<UserProfile />} />
               <Route path = "/user/profile" element={<UserProfile />} />
               <Route path = "/user/updateprofile" element={<UpdateProfile />} />
               <Route path = "/user/wishlist" element={<Wishlist />} />
               <Route path = "/user/orders" element={<Orders />} />
               <Route path = "/user/delete" element={<DeleteAccount />} />
        </Route>  
        <Route path = "/user/cart" element={<Cart />} />

        <Route path = "/seller" element={<Seller />}>
               <Route index element={<SellerProfile />} />
               <Route path = "/seller/profile" element={<SellerProfile />} />
               <Route path = "/sellerproducts" element={<SellerProducts />} />
               <Route path = "/seller/sellproduct" element={<Sell />} />
        </Route>
   
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
