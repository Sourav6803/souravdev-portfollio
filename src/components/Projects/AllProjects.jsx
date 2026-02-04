import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiStar, FiEye, FiCalendar, FiSearch, FiFilter, FiGrid, FiList, FiChevronDown, FiX } from "react-icons/fi";
import ProjectCard from "./ProjectCard"; // Your existing component
import { server } from "../../server";
import axios from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    status: "all",
    tech: "all",
    sort: "newest",
    featured: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch projects (mock data for example)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
       

        const res = await axios.get(`${server}/project/all-projects`);
        
        setProjects(res.data?.projects);
        setFilteredProjects(res.data?.projects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

//  useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axios.get(`${server}/project/all-projects`);
//         console.log(res)

//         if (res) {
//           setProjects(res.data?.projects);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

  console.log("projects-->", projects)

  // Apply filters and search
  useEffect(() => {
    let result = [...projects];

    // Search filter
    if (searchQuery) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter(project => project.status === filters.status);
    }

    // Tech stack filter
    if (filters.tech !== "all") {
      result = result.filter(project =>
        project.techStack.some(tech => tech.name.toLowerCase() === filters.tech.toLowerCase())
      );
    }

    // Featured filter
    if (filters.featured) {
      result = result.filter(project => project.featured);
    }

    // Sorting
    switch (filters.sort) {
      case "newest":
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredProjects(result);
  }, [projects, searchQuery, filters]);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "live", label: "Live" },
    { value: "development", label: "In Development" },
    { value: "planned", label: "Planned" },
    { value: "archived", label: "Archived" }
  ];

  const techOptions = [
    { value: "all", label: "All Technologies" },
    { value: "react", label: "React" },
    { value: "node.js", label: "Node.js" },
    { value: "mongodb", label: "MongoDB" },
    { value: "tailwind css", label: "Tailwind CSS" }
    // Add more tech options as needed
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "popular", label: "Most Popular" }
  ];

  const clearFilters = () => {
    setFilters({
      status: "all",
      tech: "all",
      sort: "newest",
      featured: false
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Explore my portfolio of professional projects. Each project represents unique challenges and solutions I've developed.
        </p>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* View Mode and Filter Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}
              aria-label="Grid view"
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}
              aria-label="List view"
            >
              <FiList />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
              {Object.values(filters).some(filter => filter !== "all" && filter !== false && filter !== "newest") && (
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div className="relative">
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Tech Stack Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Technology</label>
                  <div className="relative">
                    <select
                      value={filters.tech}
                      onChange={(e) => setFilters({ ...filters, tech: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                    >
                      {techOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Featured Filter */}
                <div className="flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) => setFilters({ ...filters, featured: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={`block w-10 h-6 rounded-full ${filters.featured ? "bg-purple-600" : "bg-gray-600"}`}></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.featured ? "transform translate-x-4" : ""}`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-400">Featured Only</span>
                  </label>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-700 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-300 hover:text-white mr-4"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 flex justify-between items-center"
      >
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{filteredProjects.length}</span> of <span className="text-white font-medium">{projects.length}</span> projects
        </p>
        {filteredProjects.length === 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <FiX size={14} />
            Clear filters
          </button>
        )}
      </motion.div>

      {/* Projects Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-xl h-96 animate-pulse"></div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-gray-800 rounded-xl"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : viewMode === "grid" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
              onClick={() => navigate(`/project/${project.slug}`)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto bg-gray-800 overflow-hidden">
                  <img
                    src={project.coverImage.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <FiStar size={12} />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded flex items-center gap-1"
                      >
                        <img src={tech.icon.url} alt={tech.name} className="w-3 h-3" />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <FiCalendar size={14} />
                      Last updated: {new Date(project.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <FiEye size={14} />
                      {project.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State for No Projects */}
      {!isLoading && projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-gray-800 rounded-xl"
        >
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-medium mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Get started by adding your first project</p>
          <button
            onClick={() => navigate("/dashboard/projects/new")}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Add Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsPage;