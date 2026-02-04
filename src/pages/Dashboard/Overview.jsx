// import { useState } from "react";
// import Navbar from "../../components/DashboardLayouts/Navbar";
// import Sidebar from "../../components/DashboardLayouts/Sidebar";
// import Dashboard from "../../components/Dashboard/Home";

// const OverviewPage = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
//   return (
//     <main className="relative">
//       <Navbar toggleSidebar={toggleSidebar} />
//       <div className="flex  w-full">
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
//           <div className="w-full">
//             <Dashboard />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };



import { useState } from "react";
import Navbar from "../../components/DashboardLayouts/Navbar";
import Sidebar from "../../components/DashboardLayouts/Sidebar";
import Dashboard from "../../components/Dashboard/Home";

const OverviewPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    // <main className="relative">
    //   <Navbar toggleSidebar={toggleSidebar} />
    //   <div className="flex  w-full">
    //     <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    //     <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
    //       <div className="w-full">
    //         <Dashboard />
    //       </div>
    //     </section>
    //   </div>
    // </main>

     <main className="h-screen flex flex-col">
      {/* Navbar fixed height */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main layout area with sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with independent scroll */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className="w-64 bg-gray-900 text-white overflow-y-auto h-full"
        />

        {/* Main content area with scroll */}
        <section className="flex-1 overflow-y-auto px-4 pb-5 pt-1 max-md:pb-14 ">
          <Dashboard />
        </section>
      </div>
    </main>
  );
};


export default OverviewPage;
