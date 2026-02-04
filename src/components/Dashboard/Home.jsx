import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiSettings, FiUsers, FiBarChart2, FiCalendar, FiCode, FiDatabase } from 'react-icons/fi';


const Dashboard = () => {
  // 🔹 Enhanced dummy data
  const projects = [
    { _id: '1', title: 'Portfolio Website', createdAt: '2024-05-10', status: 'live', views: 1245 },
    { _id: '2', title: 'E-commerce App', createdAt: '2024-05-08', status: 'development', views: 892 },
    { _id: '3', title: 'LMS Platform', createdAt: '2024-05-05', status: 'planning', views: 421 },
    { _id: '4', title: 'AI PDF Bot', createdAt: '2024-04-25', status: 'live', views: 2567 },
    { _id: '5', title: 'Admin Panel UI', createdAt: '2024-04-20', status: 'live', views: 1832 },
  ];

  const techStack = [
    { name: 'React', proficiency: 90, category: 'Frontend' },
    { name: 'Node.js', proficiency: 85, category: 'Backend' },
    { name: 'MongoDB', proficiency: 80, category: 'Database' },
    { name: 'Tailwind', proficiency: 95, category: 'CSS' },
    { name: 'Redis', proficiency: 70, category: 'Database' },
    { name: 'GraphQL', proficiency: 75, category: 'API' },
  ];

  const visitorsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [1250, 1900, 1600, 2100, 2400, 2800],
  };

  const statusColors = {
    live: 'bg-emerald-500',
    development: 'bg-amber-500',
    planning: 'bg-blue-500',
  };

  const navigate = useNavigate()

  return (
    <div className="p-4 mt-10 md:ml-64 md:p-8 max-w-screen-2xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-3">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Welcome to your portfolio management system
          </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Projects</p>
              <p className="text-3xl font-bold mt-2">{projects.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400">
              <FiCode size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-2">
            <span className="text-sm text-gray-400">3 live projects</span>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Tech Stack Items</p>
              <p className="text-3xl font-bold mt-2">{techStack.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-900/30 text-purple-400">
              <FiDatabase size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <span className="text-sm text-gray-400">4 categories</span>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Monthly Visitors</p>
              <p className="text-3xl font-bold mt-2">
                {visitorsData.values[visitorsData.values.length - 1].toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-900/30 text-emerald-400">
              <FiUsers size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <span className="text-sm text-emerald-400">↑ 12% from last month</span>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Last Updated</p>
              <p className="text-3xl font-bold mt-2">Today</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-900/30 text-amber-400">
              <FiCalendar size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <span className="text-sm text-gray-400">June 26, 2025</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Section */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <Link 
              to="/dashboard/projects" 
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3">Project</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Created</th>
                  <th className="pb-3 text-right">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 font-medium">{proj.title}</td>
                    <td>
                      <span className={`${statusColors[proj.status]} text-xs px-2 py-1 rounded-full`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="text-gray-400">{proj.createdAt}</td>
                    <td className="text-right">
                      <span className="font-mono">{proj.views.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Tech Stack</h3>
            <Link 
              to="/dashboard/techs" 
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{tech.name}</span>
                  <span className="text-gray-400">{tech.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                    style={{ width: `${tech.proficiency}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart (Placeholder) */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Visitor Analytics</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              Last 6 months
            </button>
          </div>
          <div className="h-64 flex items-end gap-2 pt-8">
            {visitorsData.values.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-700 rounded-t-sm"
                  style={{ height: `${(value / 3000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{visitorsData.labels[index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/dashboard/add-project"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
            >
              <FiPlus size={20} />
              <span>Add New Project</span>
            </Link>
            <Link
              to="/dashboard/techs"
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
            >
              <FiSettings size={20} />
              <span>Manage Tech Stack</span>
            </Link>
            <Link
              to="/dashboard/analytics"
              className="bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
            >
              <FiBarChart2 size={20} />
              <span>View Analytics</span>
            </Link>
            <Link
              to="/dashboard/settings"
              className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
            >
              <FiSettings size={20} />
              <span>Dashboard Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pt-8 pb-4 border-t border-gray-800">
        <p>Portfolio Admin Dashboard v2.0 • Last updated: June 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
