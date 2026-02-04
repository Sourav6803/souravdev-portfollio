import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiHeart, FiMessageSquare, FiClock, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mockBlogs } from "./constsants";
import { server } from "../server";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([mockBlogs]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${server}/blog`);
        
        const publishedBlogs = response?.data?.data?.filter(blog => blog.status === "published");
        
        setBlogs(publishedBlogs);
        
        // Find the featured blog
        const featured = publishedBlogs.find(blog => blog.featured);
        setFeaturedBlog(featured || publishedBlogs[0]);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get all unique categories
  const categories = ["all", ...new Set(blogs.flatMap(blog => blog.categories || []))];

  // Filter blogs by category
  const filteredBlogs = activeCategory === "all" 
    ? blogs.filter(blog => blog !== featuredBlog) 
    : blogs.filter(blog => 
        blog !== featuredBlog && 
        (blog.categories || []).includes(activeCategory)
      );

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8  text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest <span className="text-purple-400">Insights</span> & News
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Discover articles, tutorials, and industry perspectives from my
            experience as a developer.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Blog (Desktop) */}
            {featuredBlog && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="hidden lg:block mb-16"
              >
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-2">
                    <div className="h-full">
                      <img
                        src={
                          featuredBlog.featuredImage ||
                          "https://source.unsplash.com/random/600x400/?technology"
                        }
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex gap-2 mb-4">
                          {featuredBlog.categories?.map((category, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-700/20 text-purple-300 text-xs font-medium rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {featuredBlog.title}
                        </h3>
                        <p className="text-gray-400 mb-6 line-clamp-3">
                          {featuredBlog.excerpt ||
                            featuredBlog.content.substring(0, 150) + "..."}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <FiEye className="mr-1" /> {featuredBlog.views}
                            </span>
                            <span className="flex items-center">
                              <FiHeart className="mr-1" /> {featuredBlog.likes}
                            </span>
                            <span className="flex items-center">
                              <FiMessageSquare className="mr-1" />{" "}
                              {featuredBlog.comments?.length || 0}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <FiClock className="mr-1" />{" "}
                            {formatDate(
                              featuredBlog.publishedAt || featuredBlog.createdAt
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/blog/${featuredBlog.slug}`)}
                          className="flex items-center text-purple-400 font-medium hover:text-purple-200 transition-colors"
                        >
                            {console.log("slug-->", featuredBlog.slug)}
                          Read full story <FiArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.slice(0, 6).map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
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
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {blog.categories?.slice(0, 2).map((category, index) => (
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
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 120) + "..."}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <FiClock className="mr-1" />{" "}
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <button
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                        className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Read more <FiArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button */}
            {filteredBlogs.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={() => navigate("/blog")}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  View All Articles
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;