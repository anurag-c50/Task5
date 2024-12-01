import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginAndSignup from './page/LoginAndSignup';
import Profile from './page/Profile';
export default function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginAndSignup/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
  </Routes>
  </BrowserRouter>
  </>
  )
}

