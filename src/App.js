
import './App.css';
import React, { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';


import About from './Components/About';
import ContactUs from './Components/ContactUs';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import ProductList from './Components/ProductList';


import UserRegister from './Components/UserComponents/UserRegister';
import User from './Components/UserComponents/User';
import Orders from './Components/UserComponents/Orders';
import WishList from './Components/UserComponents/Wishlist';
import UserProfile from './Components/UserComponents/UserProfile';
import UpdateProfile from './Components/UserComponents/UpdateProfile';
import Cart  from './Components/UserComponents/Cart';
import Payment  from './Components/UserComponents/Payment';

import Seller from './Components/SellerComponents/Seller';
import SellerRegister from './Components/SellerComponents/SellerRegister';
import SellerProfile from './Components/SellerComponents/SellerProfile';
import SellerProducts from './Components/SellerComponents/SellerProducts';
import Sell from './Components/SellerComponents/Sell';
import EditProduct from './Components/SellerComponents/EditProduct'

import Product  from './Components/Product';



import LoginContext from './LoginContext';
import ProductContext from './ProductContext';
import ProductListContext from './ProductListContext';


import {
  BrowserRouter as Router,
  Routes, Route 
} from "react-router-dom"




function App() {
  const [isLogin, setLogin] = useState(false);
  const [userToken, setToken] = useState();
  const [loginType, setLoginType] = useState("");
  const [product, setProduct] = useState({name: "Dummy"});
  const [query_object, setQuery] = useState({});

  const [cookies, setCookie] = useCookies(['login_type']);

  useEffect( () => {
    axios.get('/auth/user')
    .then(response => {
        console.log("user use effect : ", response.data)
        if(response.data.status === "success"){
            setLogin(true)
            console.log("+++++ buyer++++++")
            const type = cookies.LoginType;
            if(type && type !== "seller") {
              setLoginType(type)
              console.log("cookie: ", type)
            }            
        }
      }).catch(error => {
        console.log(error)
    })
  })

  useEffect( () => {
    axios.get('/auth/seller')
    .then(response => {
        console.log("seller use effect : ", response.data)
        if(response.data.status === "success"){
            setLogin(true)
            const type = cookies.LoginType;
            if(type && type !== "user") {
              console.log("+++++ seller ++++++")
              setLoginType(type)
              console.log("cookie: ", type)
            }
        }
      }).catch(error => {
        console.log(error)
    })
  })
  
  return (
    <LoginContext.Provider value={{isLogin, setLogin, userToken , setToken, loginType,  setLoginType}}> 
    <ProductContext.Provider value={{product, setProduct}}> 
    <ProductListContext.Provider value={{query_object, setQuery}}> 
    <Router>       
      <div className='App'>
        
        <NavBar />
     
      <section>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/about" element={<About />} />
        <Route path = "/contactus" element={<ContactUs />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route  path = "/register/seller" element={<SellerRegister />} />
        <Route  path = "/register/user" element={<UserRegister />} />

        <Route path = "/user" element={<User />}>
               <Route index element={<UserProfile />} />
               <Route path = "/user/profile" element={<UserProfile />} />
               <Route path = "/user/updateprofile" element={<UpdateProfile />} />
               <Route path = "/user/wishlist" element={<WishList />} />
               <Route path = "/user/orders" element={<Orders />} />
        </Route>  
        <Route path = "/user/cart" element={<Cart />} />
        <Route path = "/user/checkout" element={<Payment />} />

        <Route path = "/seller" element={<Seller />}>
               <Route index element={<SellerProfile />} />
               <Route path = "/seller/profile" element={<SellerProfile />} />
               <Route path = "/sellerproducts" element={<SellerProducts />} />
               <Route path = "/seller/sellproduct" element={<Sell />} />
               <Route path = "/seller/editproduct/:productid" element={<EditProduct />} />
        </Route>
   
        <Route path = "/product" element={<Product />} /> 
        <Route path = "/productlist" element={<ProductList />} /> 

      </Routes>
      </section>
      </div>
    </Router>
    </ProductListContext.Provider>
    </ProductContext.Provider>
    </LoginContext.Provider>  
  );
}

export default App;
