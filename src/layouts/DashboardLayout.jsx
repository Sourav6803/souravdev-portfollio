import React, { useState } from 'react';
// import Navbar from '../components/layout/Navbar';
// import Sidebar from '../components/layout/Sidebar';

import Sidebar from '../components/DashboardLayouts/Sidebar';
import Navbar from '../components/DashboardLayouts/Navbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet /> {/* 👈 This is where AddProject will render */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
