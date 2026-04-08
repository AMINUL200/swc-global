import React, { useState } from 'react'
import Navbar from '../component/common/Navbar';
import Footer from '../component/common/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
     const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar toggleMenu={toggleSidebar} />
      {/* <SideBar toggleMenu={toggleSidebar} isOpen={sidebarOpen} serviceData={globalData.service} /> */}
      <Outlet />
      <Footer />
      {/* <BackToTop /> */}
    </div>
  )
}

export default AppLayout
