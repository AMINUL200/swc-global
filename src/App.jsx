import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import LandingPage from './pages/user_side/LandingPage';
import AppLayout from './layout/AppLayout';
import ButtonEffect from './button';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
   <Router>
    <ToastContainer position="top-right" zIndex={9999} />
      <Routes>
         <Route path='/button' element={<ButtonEffect/>} />
         <Route element={<AppLayout />}>
           <Route index path="/" element={<LandingPage />} />
         </Route>
      </Routes>
   </Router>
  )
}

export default App
