import React, { useState, useEffect } from 'react';
import { 
  FiGrid, FiList, FiPlus, FiSearch, FiFilter, FiEdit2, 
  FiTrash2, FiEye, FiStar, FiShare2, FiCalendar, FiTag, 
  FiBarChart2, FiArchive, FiDownload, FiUpload, FiChevronLeft, 
  FiChevronRight, FiCheck, FiX, FiMoreVertical 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const navigate = useNavigate()

  // Sample project data with more details
  const projectsData = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing my work and skills with responsive design and dark mode',
    status: 'live',
    views: 1245,
    lastUpdated: '2024-05-10',
    techStack: ['React', 'Tailwind', 'Node.js', 'Framer Motion'],
    featured: true,
    image: '/project-1.jpg',
    progress: 100,
    url: 'https://portfolio.example.com',
    collaborators: 2
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-stack multi-vendor e-commerce platform with real-time inventory and admin analytics',
    status: 'live',
    views: 3120,
    lastUpdated: '2024-06-01',
    techStack: ['Next.js', 'MongoDB', 'Redux', 'Stripe'],
    featured: true,
    image: '/project-2.jpg',
    progress: 100,
    url: 'https://shopzone.example.com',
    collaborators: 4
  },
  {
    id: 3,
    title: 'Chat App',
    description: 'Real-time chat application with private rooms and typing indicators using WebSocket',
    status: 'live',
    views: 980,
    lastUpdated: '2024-04-18',
    techStack: ['React', 'Socket.IO', 'Node.js', 'Express'],
    featured: false,
    image: '/project-3.jpg',
    progress: 100,
    url: 'https://chatterbox.example.com',
    collaborators: 3
  },
  {
    id: 4,
    title: 'Blog CMS',
    description: 'Content management system for blogs with markdown support and role-based access',
    status: 'development',
    views: 410,
    lastUpdated: '2024-06-10',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL'],
    featured: false,
    image: '/project-4.jpg',
    progress: 70,
    url: 'https://blogcms.example.com',
    collaborators: 1
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'Track workouts, steps, and calories with personalized recommendations',
    status: 'live',
    views: 1890,
    lastUpdated: '2024-05-25',
    techStack: ['React Native', 'Firebase', 'Redux Toolkit'],
    featured: true,
    image: '/project-5.jpg',
    progress: 100,
    url: 'https://fitbuddy.example.com',
    collaborators: 2
  },
  {
    id: 6,
    title: 'Resume Builder',
    description: 'Drag-and-drop resume builder with PDF export and ATS-optimized templates',
    status: 'maintenance',
    views: 2345,
    lastUpdated: '2024-03-30',
    techStack: ['Vue', 'Express', 'MongoDB'],
    featured: false,
    image: '/project-6.jpg',
    progress: 100,
    url: 'https://resumix.example.com',
    collaborators: 1
  },
  {
    id: 7,
    title: 'Crypto Dashboard',
    description: 'Real-time crypto tracker with portfolio analytics and news feed',
    status: 'live',
    views: 1650,
    lastUpdated: '2024-05-05',
    techStack: ['React', 'Chart.js', 'CoinGecko API'],
    featured: true,
    image: '/project-7.jpg',
    progress: 100,
    url: 'https://cryptoview.example.com',
    collaborators: 2
  },
  {
    id: 8,
    title: 'AI Image Generator',
    description: 'Generate images using prompts powered by OpenAI and Cloudinary',
    status: 'development',
    views: 760,
    lastUpdated: '2024-06-15',
    techStack: ['Next.js', 'OpenAI API', 'Cloudinary'],
    featured: false,
    image: '/project-8.jpg',
    progress: 60,
    url: 'https://imagineai.example.com',
    collaborators: 1
  },
  {
    id: 9,
    title: 'Expense Manager',
    description: 'Track expenses, income, and monthly goals with charts and categories',
    status: 'live',
    views: 1375,
    lastUpdated: '2024-05-20',
    techStack: ['React', 'Chart.js', 'LocalStorage'],
    featured: false,
    image: '/project-9.jpg',
    progress: 100,
    url: 'https://budgetbuddy.example.com',
    collaborators: 1
  },
  {
    id: 10,
    title: 'Event Booking App',
    description: 'Book and manage events with QR-based check-in and admin approval flow',
    status: 'live',
    views: 920,
    lastUpdated: '2024-06-05',
    techStack: ['Flutter', 'Firebase', 'Cloud Functions'],
    featured: true,
    image: '/project-10.jpg',
    progress: 100,
    url: 'https://eventify.example.com',
    collaborators: 3
  }
];


  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter, sort and paginate projects
  const processedProjects = projectsData
    .filter(project => filter === 'all' || project.status === filter)
    .filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = processedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(processedProjects.length / projectsPerPage);

  // Status colors and icons
  const statusConfig = {
    live: { color: 'bg-green-500', icon: '🌐' },
    development: { color: 'bg-yellow-500', icon: '🛠️' },
    planning: { color: 'bg-blue-500', icon: '📝' },
    archived: { color: 'bg-gray-500', icon: '🗄️' }
  };

  // Bulk actions
  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId) 
        : [...prev, projectId]
    );
  };

  const selectAllProjects = () => {
    if (selectedProjects.length === currentProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(currentProjects.map(p => p.id));
    }
  };

  const handleBulkAction = (action) => {
    // Implement bulk actions (archive, delete, etc.)
    console.log(`${action} projects:`, selectedProjects);
    setSelectedProjects([]);
    setShowBulkActions(false);
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
              Dashboard
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-sm font-medium text-white md:ml-2">Projects</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header with actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Portfolio</h1>
          <p className="text-gray-400">Manage your development projects and showcase your work</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button onClick={()=> navigate("/dashboard/add-project")} className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg">
            <FiPlus />
            <span>New Project</span>
          </button>
          
          <div className="relative flex-1 md:flex-none md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedProjects.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => selectAllProjects()}
              className={`p-1 rounded ${selectedProjects.length === currentProjects.length ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              <FiCheck size={16} />
            </button>
            <span className="text-white">
              {selectedProjects.length} {selectedProjects.length === 1 ? 'project' : 'projects'} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleBulkAction('archive')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              <FiArchive size={14} />
              <span>Archive</span>
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
            >
              <FiTrash2 size={14} />
              <span>Delete</span>
            </button>
            <button 
              onClick={() => setSelectedProjects([])}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              <FiX size={14} />
              <span>Clear</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm hidden sm:block">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            aria-label="Grid view"
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            aria-label="List view"
          >
            <FiList />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg pl-3 pr-8 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="live">Live</option>
              <option value="development">Development</option>
              <option value="planning">Planning</option>
              <option value="archived">Archived</option>
            </select>
            <FiFilter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg pl-3 pr-8 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="recent">Recently Updated</option>
              <option value="views">Most Views</option>
              <option value="title">Alphabetical</option>
            </select>
            <FiBarChart2 className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm transition-colors">
            <FiDownload size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Projects count and pagination top */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="text-gray-400 text-sm">
          Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, processedProjects.length)} of {processedProjects.length} projects
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                    currentPage === pageNum 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-gray-400 mx-1">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                  currentPage === totalPages 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Projects display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(projectsPerPage)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-800"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-800 rounded w-16"></div>
                  <div className="h-6 bg-gray-800 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative bg-gray-900 rounded-xl overflow-hidden border ${
                selectedProjects.includes(project.id) 
                  ? 'border-purple-500 ring-2 ring-purple-500/30' 
                  : 'border-gray-800 hover:border-gray-700'
              } transition-all group`}
              onClick={()=> navigate(`/dashboard/project/${project?.id}`)}
            >
              {/* Selection checkbox */}
              <button
                onClick={() => toggleProjectSelection(project.id)}
                className={`absolute top-3 left-3 z-20 w-5 h-5 rounded border ${
                  selectedProjects.includes(project.id)
                    ? 'bg-purple-600 border-purple-600'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                } flex items-center justify-center transition-colors`}
              >
                {selectedProjects.includes(project.id) && (
                  <FiCheck className="text-white text-xs" />
                )}
              </button>
              
              {project.featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
                  <FiStar size={12} />
                  <span>Featured</span>
                </div>
              )}
              
              {/* Project image */}
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className={`absolute bottom-3 right-3 ${statusConfig[project.status]?.color} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md`}>
                  <span>{statusConfig[project.status]?.icon}</span>
                  <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <FiEye size={14} />
                    {project.views.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Progress bar for development projects */}
                {project.status === 'development' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Development Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded flex items-center gap-1"
                    >
                      <FiTag size={10} />
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <FiCalendar size={14} />
                    {new Date(project.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-gray-400 hover:text-blue-400 p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                      aria-label="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-green-400 p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                      aria-label="Share"
                    >
                      <FiShare2 size={16} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-400 p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      onClick={selectAllProjects}
                      className={`inline-flex items-center p-1 rounded ${
                        selectedProjects.length === currentProjects.length 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <FiCheck size={14} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {currentProjects.map((project) => (
                  <motion.tr 
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${
                      selectedProjects.includes(project.id)
                        ? 'bg-gray-800/50'
                        : 'hover:bg-gray-800/30'
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleProjectSelection(project.id)}
                        className={`w-5 h-5 rounded border ${
                          selectedProjects.includes(project.id)
                            ? 'bg-purple-600 border-purple-600'
                            : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                        } flex items-center justify-center transition-colors`}
                      >
                        {selectedProjects.includes(project.id) && (
                          <FiCheck className="text-white text-xs" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-800 rounded-md overflow-hidden">
                          <img className="h-full w-full object-cover" src={project.image} alt={project.title} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white flex items-center gap-1">
                            {project.title}
                            {project.featured && (
                              <FiStar className="text-yellow-400" size={12} />
                            )}
                          </div>
                          <div className="text-sm text-gray-400 line-clamp-1">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[project.status].color} text-white`}>
                        {statusConfig[project.status].icon} {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.techStack.slice(0, 2).map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded flex items-center gap-1">
                            <FiTag size={10} />
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 2 && (
                          <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                            +{project.techStack.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.status === 'development' ? (
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiEye size={14} />
                        {project.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(project.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          aria-label="Share"
                        >
                          <FiShare2 size={16} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && processedProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800"
        >
          <FiArchive className="mx-auto text-gray-500" size={48} />
          <h3 className="mt-4 text-lg font-medium text-white">No projects found</h3>
          <p className="mt-1 text-gray-400">
            {searchQuery ? 'Try adjusting your search or filter' : 'Create your first project to get started'}
          </p>
          <button onClick={()=> navigate("/dashboad/add-project")} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg">
            <FiPlus className="inline mr-2" />
            Add New Project
          </button>
        </motion.div>
      )}

      {/* Pagination bottom */}
      {!isLoading && processedProjects.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
          <div className="text-gray-400 text-sm">
            Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, processedProjects.length)} of {processedProjects.length} projects
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-800'}`}
              >
                <FiChevronLeft />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                      currentPage === pageNum 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="text-gray-400 mx-1">...</span>
              )}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                    currentPage === totalPages 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {totalPages}
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-800'}`}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                    <p className="text-gray-400">{selectedProject.url && (
                      <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {selectedProject.url}
                      </a>
                    )}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-xl overflow-hidden h-64">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Project Status</h3>
                      <div className="flex items-center gap-2">
                        <span className={`${statusConfig[selectedProject.status].color} w-3 h-3 rounded-full`}></span>
                        <span className="text-white">
                          {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Views</p>
                          <p className="text-white">{selectedProject.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Collaborators</p>
                          <p className="text-white">{selectedProject.collaborators}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Created</p>
                          <p className="text-white">
                            {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Last Updated</p>
                          <p className="text-white">
                            {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                          <FiEdit2 className="inline mr-1" size={14} />
                          Edit
                        </button>
                        <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                          <FiShare2 className="inline mr-1" size={14} />
                          Share
                        </button>
                        <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                          <FiMoreVertical className="inline" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Description</h3>
                    <p className="text-gray-300">{selectedProject.description}</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-1"
                        >
                          <FiTag size={12} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Development Progress</h3>
                    {selectedProject.status === 'development' ? (
                      <>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Completion</span>
                          <span>{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                            style={{ width: `${selectedProject.progress}%` }}
                          ></div>
                        </div>
                        <button className="text-xs text-blue-400 hover:text-blue-300">
                          Update progress
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">Not in development</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;