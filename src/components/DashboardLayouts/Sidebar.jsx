import  { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiCpu,
  FiSettings,
  FiX,
  FiUsers,
  FiBarChart2,
  FiDatabase,
  FiCalendar,
  FiHelpCircle,
  FiMail,
  FiFileText,
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import Tooltip from "../../utils/Tooltip";


const Sidebar = ({ isOpen, toggleSidebar, darkMode, toggleTheme }) => {
  const menuItems = [
    {
      section: "Dashboard",
      items: [
        {
          name: "Overview",
          path: "/dashboard",
          icon: <FiGrid size={18} />,
          badge: null,
        },
      ],
    },
    {
      section: "Portfolio Content",
      items: [
        {
          name: "Projects",
          path: "/dashboard/projects",
          icon: <FiFolder size={18} />,
          badge: 5,
        },
        {
          name: "Tech Stack",
          path: "/dashboard/add-techStack",
          icon: <FiCpu size={18} />,
          badge: 6,
        },
        {
          name: "Blog Posts",
          path: "/dashboard/blog",
          icon: <FiFileText size={18} />,
          badge: 2,
        },
      ],
    },
    {
      section: "Analytics",
      items: [
        {
          name: "Visitors",
          path: "/dashboard/analytics",
          icon: <FiUsers size={18} />,
          badge: null,
        },
        {
          name: "Performance",
          path: "/dashboard/performance",
          icon: <FiBarChart2 size={18} />,
          badge: "New",
        },
      ],
    },
    {
      section: "Management",
      items: [
        {
          name: "Database",
          path: "/dashboard/database",
          icon: <FiDatabase size={18} />,
          badge: null,
        },
        {
          name: "Schedule",
          path: "/dashboard/schedule",
          icon: <FiCalendar size={18} />,
          badge: 3,
        },
        {
          name: "Messages",
          path: "/dashboard/messages",
          icon: <FiMail size={18} />,
          badge: 12,
        },
      ],
    },
    {
      section: "System",
      items: [
        {
          name: "Settings",
          path: "/dashboard/settings",
          icon: <FiSettings size={18} />,
          badge: null,
        },
        {
          name: "Help Center",
          path: "/dashboard/help",
          icon: <FiHelpCircle size={18} />,
          badge: null,
        },
      ],
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen flex flex-col bg-gray-900 border-r border-gray-800 shadow-lg z-40 transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <FiCpu className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Portfolio Admin</h2>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
          >
            <FiX size={20} />
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-2 mb-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors text-sm">
              <FiSearch size={14} />
              <span>Quick Search (⌘K)</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar`}>
          <nav className="flex flex-col py-4">
            {menuItems.map((group, index) => (
              <div key={index} className="mb-6 last:mb-0">
                {!collapsed && (
                  <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {group.section}
                  </h3>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar-item flex items-center justify-between mx-2 px-3 py-2 rounded-md
                        ${
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      <Tooltip
                        content={item.name}
                        position="right"
                        disabled={!collapsed}
                      >
                        <div className="flex items-center gap-3">
                          <span>{item.icon}</span>
                          {!collapsed && (
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                      {!collapsed && item.badge && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full 
                          ${
                            typeof item.badge === "number"
                              ? "bg-blue-600 text-white"
                              : "bg-purple-600 text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 bg-gray-800 rounded-full p-1 border border-gray-700 shadow-md hover:bg-gray-700 transition-colors"
        >
          {collapsed ? (
            <FiChevronRight className="text-white" size={16} />
          ) : (
            <FiChevronLeft className="text-white" size={16} />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
