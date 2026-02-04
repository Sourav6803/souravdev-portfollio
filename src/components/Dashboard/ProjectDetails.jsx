import React, { useState } from 'react';
import { 
  FiArrowLeft, FiEdit, FiTrash2, FiLink, 
  FiEye, FiStar, FiCalendar, FiTag, 
  FiBarChart2, FiCode, FiCpu, FiDatabase,
  FiGithub, FiGlobe, FiDownload, FiSettings,
  FiChevronDown, FiChevronUp, FiPlus, FiMinus,
  FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showTechStack, setShowTechStack] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: id,
    title: "Portfolio Website",
    description:
      "A responsive personal portfolio website with dark mode, project showcase, and contact form. Built with modern web technologies for optimal performance.",
    status: "live",
    views: 1245,
    uniqueVisitors: 892,
    bounceRate: "32%",
    lastUpdated: "2024-05-10",
    created: "2024-03-15",
    techStack: [
      { name: "React", version: "18.2", category: "Frontend", proficiency: 95 },
      {
        name: "Tailwind CSS",
        version: "3.3",
        category: "CSS",
        proficiency: 90,
      },
      {
        name: "Node.js",
        version: "20.5",
        category: "Backend",
        proficiency: 85,
      },
      {
        name: "Framer Motion",
        version: "10.16",
        category: "Animation",
        proficiency: 80,
      },
    ],
    keyDetails: [
      "Responsive design that works on all devices",
      "Dark/Light mode toggle",
      "Project showcase with filtering",
      "Contact form with email integration",
      "Performance optimized (95+ Lighthouse score)",
    ],

    links: [
      { type: "live", url: "https://portfolio.example.com" },
      { type: "github", url: "https://github.com/username/portfolio" },
      { type: "design", url: "https://figma.com/file/example" },
    ],
    metrics: {
      performance: 92,
      accessibility: 89,
      bestPractices: 95,
      seo: 88,
    },
    screenshots: ["/screenshot1.jpg", "/screenshot2.jpg", "/screenshot3.jpg"],
    collaborators: [
      { name: "John Doe", role: "Frontend Developer" },
      { name: "Jane Smith", role: "UI Designer" },
    ],
    featured: true,
  };

  const statusColors = {
    live: 'bg-green-500',
    development: 'bg-yellow-500',
    planning: 'bg-blue-500',
    archived: 'bg-gray-500'
  };

  const handleDelete = () => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      // Delete logic here
      navigate('/dashboard/projects');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button and title */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {product.title}
              {product.featured && (
                <span className="ml-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full inline-flex items-center">
                  <FiStar size={12} className="mr-1" />
                  Featured
                </span>
              )}
            </h1>
          </div>
          <p className="text-gray-400 mt-1">{product.description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={toggleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isEditing
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            <FiEdit />
            <span>{isEditing ? "Save Changes" : "Edit Project"}</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <FiTrash2 />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Status and quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`${statusColors[product.status]} w-2 h-2 rounded-full`}
            ></span>
            <span className="text-sm text-gray-300 capitalize">
              {product.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">Project Status</h3>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Total Views</div>
          <div className="flex items-center gap-2">
            <FiEye className="text-blue-400" />
            <span className="text-xl font-bold text-white">
              {product.views.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Last Updated</div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-purple-400" />
            <span className="text-xl font-bold text-white">
              {new Date(product.lastUpdated).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Bounce Rate</div>
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-green-400" />
            <span className="text-xl font-bold text-white">
              {product.bounceRate}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Details */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "analytics"
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setShowTechStack(!showTechStack)}
                >
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiCpu className="text-blue-400" />
                    <span>Technology Stack</span>
                  </h2>
                  {showTechStack ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                <AnimatePresence>
                  {showTechStack && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-4">
                        {product.techStack.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <h4 className="text-white font-medium">
                                {tech.name}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {tech.category} • v{tech.version}
                              </p>
                            </div>
                            <div className="w-24 bg-gray-800 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${tech.proficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Project Links */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiLink className="text-purple-400" />
                  <span>Project Links</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {link.type === "github" ? (
                        <FiGithub className="text-white text-xl" />
                      ) : link.type === "design" ? (
                        <FiCode className="text-white text-xl" />
                      ) : (
                        <FiGlobe className="text-white text-xl" />
                      )}
                      <div>
                        <p className="text-white capitalize">{link.type} URL</p>
                        <p className="text-gray-400 text-sm truncate">
                          {link.url.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </a>
                  ))}
                  <button className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <FiPlus />
                    <span>Add Link</span>
                  </button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setShowMetrics(!showMetrics)}
                >
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiBarChart2 className="text-green-400" />
                    <span>Key Metrics</span>
                  </h2>
                  {showMetrics ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                <AnimatePresence>
                  {showMetrics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-gray-400 text-sm mb-2">
                            Performance
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{
                                  width: `${product.metrics.performance}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-white font-medium">
                              {product.metrics.performance}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-gray-400 text-sm mb-2">
                            Accessibility
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{
                                  width: `${product.metrics.accessibility}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-white font-medium">
                              {product.metrics.accessibility}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-gray-400 text-sm mb-2">
                            Best Practices
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{
                                  width: `${product.metrics.bestPractices}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-white font-medium">
                              {product.metrics.bestPractices}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-gray-400 text-sm mb-2">SEO</h4>
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{ width: `${product.metrics.seo}%` }}
                              ></div>
                            </div>
                            <span className="text-white font-medium">
                              {product.metrics.seo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Attachments */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <div
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiDownload className="text-yellow-400" />
                    <span>Attachments</span>
                  </h2>
                  {showAttachments ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                <AnimatePresence>
                  {showAttachments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {product.screenshots.map((screenshot, index) => (
                          <div key={index} className="group relative">
                            <img
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-800 group-hover:border-purple-500 transition-colors"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                                <FiEye size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <FiPlus size={24} />
                          <span className="text-sm">Add Screenshot</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-4">
                Analytics Dashboard
              </h2>
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                Analytics charts would be displayed here
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-2">
                    Unique Visitors
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {product.uniqueVisitors.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-2">
                    Avg. Session Duration
                  </h3>
                  <p className="text-2xl font-bold text-white">2m 45s</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-2">
                    Pages per Session
                  </h3>
                  <p className="text-2xl font-bold text-white">3.2</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-6">
                Project Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-white mb-3">
                    General Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        defaultValue={product.title}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Description
                      </label>
                      <textarea
                        defaultValue={product.description}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Status
                      </label>
                      <select
                        defaultValue={product.status}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="live">Live</option>
                        <option value="development">Development</option>
                        <option value="planning">Planning</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-white mb-3">
                    Collaborators
                  </h3>
                  <div className="space-y-3">
                    {product.collaborators.map((collab, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                      >
                        <div>
                          <p className="text-white">{collab.name}</p>
                          <p className="text-gray-400 text-sm">{collab.role}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <FiMinus />
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <FiPlus />
                      <span>Add Collaborator</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-white mb-3">
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">
                          Archive Project
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Remove from active projects but keep the data
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm">
                        Archive
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">
                          Delete Project
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Permanently delete this project and all its data
                        </p>
                      </div>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right column - Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Project Summary */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Project Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Created</span>
                <span className="text-white">
                  {new Date(product.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white">
                  {new Date(product.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span
                  className={`${
                    statusColors[product.status]
                  } px-2 py-1 rounded-full text-xs text-white capitalize`}
                >
                  {product.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Featured</span>
                <span
                  className={`${
                    product.featured
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-800 text-gray-400"
                  } px-2 py-1 rounded-full text-xs`}
                >
                  {product.featured ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                <FiSettings />
                <span>Update Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                <FiDownload />
                <span>Export Project Data</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                <FiGithub />
                <span>Connect GitHub Repo</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: "Project updated", date: "2 hours ago", user: "You" },
                {
                  action: "Tech stack modified",
                  date: "1 day ago",
                  user: "Jane Smith",
                },
                {
                  action: "Project status changed to Live",
                  date: "3 days ago",
                  user: "You",
                },
                {
                  action: "Collaborator added",
                  date: "1 week ago",
                  user: "You",
                },
              ].map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-white">{activity.action}</p>
                    <p className="text-gray-400 text-sm">
                      {activity.date} • {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* // In your ProductDetailsPage component */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiCheck className="text-green-400" />
              <span>Key Features</span>
            </h2>
            <ul className="space-y-3">
              { product?.keyDetails && product?.keyDetails.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;