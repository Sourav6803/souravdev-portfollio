
import { motion, AnimatePresence } from 'framer-motion';
import  { useEffect, useState } from 'react';
import { 
  FiArrowLeft, FiPlus, FiTrash2, FiCheck,
  FiCode,
  FiImage,
  FiChevronUp,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoading } from '../../context/LoadingContext';
import axios from 'axios';
import { server } from '../../server';
import { 
 

  FiStar, 
  FiExternalLink, 
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiInfo
} from 'react-icons/fi';


const AddTechStack = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [icon, setIcon] = useState(null)
  const [expandedSection, setExpandedSection] = useState('basic');
  const { showLoading, hideLoading } = useLoading();
  const [allTechStack, setAllTechStack] = useState([])

  const fetchTechStack = async()=> {
    try{
      const res = await axios.get(`${server}/techStack/all-techStack`, {withCredentials:true})
      if(res?.data){
        setAllTechStack(res.data.techStacks)
      }
    }catch(error){
      console.error("Error adding technology:", error);
      toast.error(error?.response?.data?.message || "Failed to add technology");
    }
  }

  useEffect(()=> {fetchTechStack()}, [])

  // Form state
  const [techItem, setTechItem] = useState({
    name: '',
    version: '',
    category: 'frontend',
    proficiency: 80,
    icon: '',
    documentation: '',
    isFavorite: false
  });

  const [techStack, setTechStack] = useState([
    {
      name: 'React',
      version: '18.2',
      category: 'frontend',
      proficiency: 95,
      icon: 'react-icon.png',
      documentation: 'https://reactjs.org/docs/getting-started.html',
      isFavorite: true
    },
    {
      name: 'Node.js',
      version: '20.5',
      category: 'backend',
      proficiency: 85,
      icon: 'nodejs-icon.png',
      documentation: 'https://nodejs.org/en/docs/',
      isFavorite: false
    }
  ]);

  // Categories for dropdown
  const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'testing', label: 'Testing' },
    { value: 'other', label: 'Other' }
  ];

  const sectionToggle = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTechItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const icons = {
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      };
      setIcon(icons); // Assuming you're using `useState` for cover image
    }
  };

  const handleRemoveTech = (index) => {
    setTechStack(prev => prev.filter((_, i) => i !== index));
  };

  // Add these state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [techsPerPage, setTechsPerPage] = useState(8); // Default items per page

  // Calculate pagination
  const totalPages = Math.ceil(allTechStack.length / techsPerPage);
  const indexOfLastTech = currentPage * techsPerPage;
  const indexOfFirstTech = indexOfLastTech - techsPerPage;
  const currentTechs = allTechStack.slice(indexOfFirstTech, indexOfLastTech);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      showLoading();

      const formData = new FormData();

      // 1. Append icon file if exists
      if (icon?.file) {
        formData.append("icon", icon.file);
      }

      formData.append("name", techItem.name);
      formData.append("category", techItem.category);
      formData.append("version", techItem.version);
      formData.append("proficiency", techItem.proficiency);
      formData.append("documentation", techItem.documentation);
      formData.append("isFavorite", techItem.isFavorite);

      // 3. Post to your API
      const res = await axios.post(
        `${server}/techStack/add-techStack`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res) {
        toast.success("Technology added successfully!");
        fetchTechStack()
      }

      // 4. Reset form state
      setTechItem({
        name: "",
        version: "",
        category: "frontend",
        proficiency: 80,
        icon: "",
        documentation: "",
        isFavorite: false,
      });
      setIcon(null);
    } catch (error) {
      console.error("Error adding technology:", error);
      toast.error(error?.response?.data?.message || "Failed to add technology");
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Loading Spinner */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-full border-4 border-gray-800"></div>

                {/* Animated spinner */}
                <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>

                {/* Inner ring with gradient */}
                <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-400 animate-spin animation-delay-150"></div>
              </div>

              {/* Loading Text */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Saving Technology Stack
                </h3>
                <p className="text-gray-400">
                  Please wait while we save your changes...
                </p>
              </div>

              {/* Progress Indicator (Optional) */}
              <div className="w-full mt-6">
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Processing</span>
                  <span className="animate-pulse">•••</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Tech Stack</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {techStack.length > 0 ? "Edit Tech Stack" : "Add New Tech Stack"}
        </h1>
      </div>

      {/* Tech Stack Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Add New Tech */}
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FiPlus className="text-blue-400" />
              <span>Add Technology</span>
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Technology Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={techItem.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Version
                  </label>
                  <input
                    type="text"
                    name="version"
                    value={techItem.version}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="18.2.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={techItem.category}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Proficiency: {techItem.proficiency}%
                </label>
                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={techItem.proficiency}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>

              {/* Icon Upload */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => sectionToggle("icon")}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FiImage className="text-yellow-400 text-xl" />
                    <h2 className="text-lg font-semibold text-white">Icon</h2>
                  </div>
                  {expandedSection === "icon" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === "icon" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-4">
                        {icon ? (
                          <div className="relative group w-48">
                            <img
                              src={icon.url}
                              alt="icon"
                              className="w-full h-32 object-cover rounded-lg border border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => setIcon(null)}
                              className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX className="text-white text-xs" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No Icon uploaded
                          </p>
                        )}

                        <div className="pt-4 border-t border-gray-800">
                          <label className="block text-sm text-gray-400 mb-2">
                            Upload Icon
                          </label>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FiPlus className="text-gray-400 text-2xl mb-2" />
                              <p className="text-sm text-gray-400">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleIconUpload}
                            />
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Documentation URL
                </label>
                <input
                  type="url"
                  name="documentation"
                  value={techItem.documentation}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://docs.example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FiPlus />
                <span>Add Tech Satck</span>
              </button>
            </div>
          </div>
        </form>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
    <FiCode />
    <span>Your Tech Stack ({allTechStack?.length})</span>
  </h2>

  {allTechStack.length > 0 ? (
    <>
      {/* Pagination Controls - Top */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Show:</span>
          <select
            className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
            value={techsPerPage}
            onChange={(e) => {
              setTechsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[4, 8, 12, 16].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            <FiChevronLeft className="text-gray-300" />
          </button>

          <div className="flex items-center gap-1">
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
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-gray-500 px-1">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            <FiChevronRight className="text-gray-300" />
          </button>
        </div>

        <div className="text-sm text-gray-400 whitespace-nowrap">
          Showing{" "}
          <span className="text-white font-medium">
            {(currentPage - 1) * techsPerPage + 1}
          </span>
          -
          <span className="text-white font-medium">
            {Math.min(currentPage * techsPerPage, allTechStack.length)}
          </span>{" "}
          of{" "}
          <span className="text-white font-medium">
            {allTechStack.length}
          </span>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {currentTechs.map((tech, index) => (
          <div
            key={`${tech.id || tech.name}-${index}`}
            className="group relative bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col"
          >
            {/* Favorite Badge */}
            {tech.isFavorite && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
                <FiStar size={10} />
                <span>Favorite</span>
              </div>
            )}

            {/* Tech Card Content */}
            <div className="flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3 flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {tech.icon?.url ? (
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative w-12 h-12 bg-gray-900 p-2 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden">
                        <img
                          src={tech.icon.url}
                          alt={tech.name}
                          className="w-full h-full object-contain max-w-full max-h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<FiCode className="text-gray-400 w-6 h-6" />';
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex-shrink-0">
                      <FiCode className="text-gray-400" size={20} />
                    </div>
                  )}

                  
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveTech(
                      tech.id ||
                        (currentPage - 1) * techsPerPage + index
                    )
                  }
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 flex-shrink-0 ml-2"
                  title="Remove technology"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="min-w-0 flex-1 ">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 
                        className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate flex-1"
                        title={tech.name}
                      >
                        {tech.name}
                      </h3>
                      {tech.version && (
                        <span className="text-xs bg-gray-900 text-gray-300 px-2 py-0.5 rounded-full border border-gray-700 whitespace-nowrap flex-shrink-0">
                          v{tech.version}
                        </span>
                      )}
                    </div>
                    <span 
                      className="text-xs text-gray-400 mt-1 block truncate"
                      title={tech.category}
                    >
                      {tech.category}
                    </span>
                  </div>

              {/* Proficiency Bar */}
              <div className="mt-4 space-y-2 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Proficiency</span>
                  <span className="font-medium text-white">
                    {tech.proficiency}%
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                      style={{ width: `${tech.proficiency}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>

              {/* Documentation Link */}
              {tech.documentationUrl && (
                <a
                  href={tech.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group/link truncate flex-shrink-0"
                  title={tech.documentationUrl}
                >
                  <FiExternalLink size={14} className="flex-shrink-0" />
                  <span className="truncate">Documentation</span>
                  <FiArrowUpRight
                    className="opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0"
                    size={12}
                  />
                </a>
              )}
            </div>

            {/* Hover Effect Glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 -z-10"></div>
          </div>
        ))}
      </div>

      {/* Pagination Controls - Bottom */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"></div>
              <span className="text-sm text-gray-400 whitespace-nowrap">
                Total Technologies:
              </span>
              <span className="text-white font-semibold">
                {allTechStack.length}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex-shrink-0"></div>
              <span className="text-sm text-gray-400 whitespace-nowrap">Favorites:</span>
              <span className="text-white font-semibold">
                {allTechStack.filter((t) => t.isFavorite).length}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-400 whitespace-nowrap">
            <FiInfo className="inline mr-2" size={14} />
            {techsPerPage} items per page
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <FiChevronsLeft size={14} />
              First
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <FiChevronLeft size={16} />
              </button>

              <span className="text-sm text-gray-300 min-w-[80px] text-center whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <FiChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Last
              <FiChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center py-12">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
        <div className="relative w-full h-full flex items-center justify-center bg-gray-800 rounded-full border border-gray-700">
          <FiCode className="text-4xl text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        No Technologies Added
      </h3>
      <p className="text-gray-400 mb-4 max-w-md mx-auto">
        Start building your tech stack by adding your favorite
        technologies, frameworks, and tools.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all">
        <FiPlus className="inline mr-2" />
        Add First Technology
      </button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default AddTechStack;

