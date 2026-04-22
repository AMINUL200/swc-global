import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import LandingPage from './pages/user_side/LandingPage';
import AppLayout from './layout/AppLayout';
import ButtonEffect from './button';
import { ToastContainer } from 'react-toastify';
import AboutPage from './pages/user_side/AboutPage';
import ContactPage from './pages/user_side/ContactPage';
import BlogPage from './pages/user_side/BlogPage';
import BlogDetailPage from './pages/user_side/BlogDetailPage';
import RecruitmentPage from './pages/user_side/RecruitmentPage';
import RecruitmentDetailPage from './pages/user_side/RecruitmentDetailPage';
import ServiceDetailsPage from './pages/user_side/ServiceDetailsPage';

const App = () => {
  console.log("App component rendered");
  return (
   <Router>
    <ToastContainer position="top-right" zIndex={9999} />
      <Routes>
         <Route path='/button' element={<ButtonEffect/>} />
         <Route element={<AppLayout />}>
           <Route index path="/" element={<LandingPage />} />
           <Route path='/about' element={<AboutPage/>}/>
           <Route path='/contact' element={<ContactPage/>} />
           <Route path='/blog' element={<BlogPage/>} />
           <Route path='/blog/:id' element={<BlogDetailPage/>} />
           <Route path='/recruitment' element={<RecruitmentPage/>} />
           <Route path='/recruitment/:id' element={<RecruitmentDetailPage/>} />
           <Route path='/services/:slug' element={<ServiceDetailsPage/>} />
         </Route>
      </Routes>
   </Router>
  )
}

export default App
