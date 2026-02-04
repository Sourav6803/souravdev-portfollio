import { useState } from "react";
import Navbar from "../../../components/DashboardLayouts/Navbar";
import Sidebar from "../../../components/DashboardLayouts/Sidebar";
import AddTechStack from "../../../components/Dashboard/AddTechStack";

const AddTechStackPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <main className="relative">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex  w-full">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
          <div className="w-full">
            <AddTechStack />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddTechStackPage;