import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiClock, FiArrowRight, FiFilter, FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate()

  // Get all unique categories
  const categories = [...new Set(blogs.flatMap(blog => blog.categories || []))];

  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Add getAll=true to fetch all blogs
        const response = await axios.get(`${server}/blog?getAll=true`);

        // No need to filter published blogs if your backend already does it
        const allBlogs = response?.data?.data || [];
        console.log("Total blogs fetched:", allBlogs.length);

        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...blogs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(blog =>
        blog.categories?.some(cat => selectedCategories.includes(cat))
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "most-popular":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [blogs, searchTerm, selectedCategories, sortOption]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8  text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => navigate("/")}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </motion.button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">My Blogs</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Explore my collection of articles and tutorials. Each post shares
            insights from my experience as a developer.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
              {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-gray-800 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sort Options */}
                <div>
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <div className="flex flex-wrap gap-2">
                    {["newest", "oldest", "most-popular"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortOption(option)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          sortOption === option
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {option
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filters */}
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategories.includes(category)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Showing {filteredBlogs.length} of {blogs.length} blogs
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : currentBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No blogs found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        blog.featuredImage ||
                        "https://source.unsplash.com/random/600x400/?coding"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {blog.categories?.slice(0, 3).map((category, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-200 text-xs font-medium rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {blog.excerpt || blog.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <span
                        onClick={() => navigate(`/blog/${blog?.slug}`)}
                        className="flex items-center text-purple-400 cursor-pointer"
                      >
                        Read more <FiArrowRight className="ml-1 " />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === number
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;