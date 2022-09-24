
import './App.css';
import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import {
  BrowserRouter as Router,
  Routes, Route , Switch 
} from "react-router-dom"



function App() {
  return (
    <Router>
      <div className='App'>
      <NavBar />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
      </Routes>
      </div>
     
   </Router>

  
  );
}

export default App;
