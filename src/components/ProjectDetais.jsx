import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaShareAlt,
  FaStar,
  FaRegStar,
  FaLinkedin,
  FaFigma,
  FaLink,
} from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import useTrackDuration from "../utils/useTrackDuration";
import axios from "axios";
import { server } from "../server";
import { usePageAnalytics } from "../utils/usePageAnalytics";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState({});

  const [activeImage, setActiveImage] = useState(0);
  const [newReview, setNewReview] = useState({
    user: "",
    comment: "",
    stars: 0,
  });
  const [copied, setCopied] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mainImageUrl =
    activeImage === null
      ? project?.coverImage?.url
      : project?.screenshots?.[activeImage]?.url;

  const fetchProject = async () => {
    try {
      if (!slug) {
        throw new Error("No project slug provided");
      }

      setLoading(true);
      setError(null);

      const response = await axios.get(`${server}/project/${slug}`, {
        withCredentials: true,
      });

      if (!response.data?.project) {
        throw new Error("Invalid project data received");
      }

      setProject(response.data.project);
    } catch (err) {
      console.error("Fetch project error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load project"
      );
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();

    return () => {
      // Cleanup if needed
    };
  }, [slug]); // Re-fetch when slug changes

  // useTrackDuration({ projectId: project._id });
  const path =
    typeof window !== "undefined" ? window.location.pathname : "/projects"; // fallback

  usePageAnalytics(path);

  //  console.log("Current slug:", slug);
  // console.log("Project data:", project);
  // console.log("Loading state:", loading);
  // console.log("Error state:", error);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    const updatedProject = {
      ...project,
      reviews: [
        ...project.reviews,
        {
          ...newReview,
          date: new Date().toISOString(),
        },
      ],
    };
    setProject(updatedProject);
    setNewReview({ user: "", comment: "", stars: 0 });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareProject = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this project: ${project.description}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm);
    setShowContactForm(false);
    setContactForm({ name: "", email: "", message: "" });
  };

  // Utility to get icon and color per link type
  const getLinkMeta = (type) => {
    switch (type) {
      case "live":
        return {
          icon: <FaExternalLinkAlt className="mr-2" />,
          color: "bg-blue-600 hover:bg-blue-700",
        };
      case "github":
        return {
          icon: <FaGithub className="mr-2" />,
          color: "bg-gray-800 hover:bg-gray-700",
        };
      case "design":
        return {
          icon: <FaFigma className="mr-2" />,
          color: "bg-pink-600 hover:bg-pink-700",
        };
      default:
        return {
          icon: <FaLink className="mr-2" />,
          color: "bg-gray-600 hover:bg-gray-700",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-bold text-red-500 mb-2">
          Error Loading Project
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchProject}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-10">Project not found</div>;
  }

  return (
    <div className="min-h-screen  bg-gray-900 text-gray-100 font-sans">
      {/* Glowing Header */}

      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-5 md:py-5 px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-gray-800">
        {/* Subtle glowing background blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-cyan-500 opacity-10 blur-[140px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title + Tags */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-tight leading-tight"
              >
                {project.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {project?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-gray-700 bg-gray-800/60 text-cyan-300 hover:bg-gray-700/60 transition"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareProject}
                className="p-3 rounded-full bg-gray-800 border border-gray-700 text-cyan-400 hover:text-white hover:bg-gray-700 transition"
                aria-label="Share project"
              >
                <FaShareAlt className="text-xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactForm(true)}
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-2"
              >
                <FiMail className="text-base" />
                Hire Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Gallery */}
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-gray-900 border border-gray-700 shadow-lg overflow-hidden group overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={mainImageUrl}
                  alt={project?.title}
                  className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Index or Cover Badge */}
              <div className="absolute bottom-3 left-3 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-cyan-300 border border-gray-700 shadow-sm">
                {activeImage === null
                  ? "Cover"
                  : `${activeImage + 1}/${project?.screenshots?.length}`}
              </div>

              {/* Optional gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-cyan-500 transition-all duration-500" />
            </motion.div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-2 mt-4">
              {/* Cover Image Thumbnail */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImage(null)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  activeImage === null
                    ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                    : "border-transparent opacity-70 hover:opacity-100"
                } transition-all duration-300`}
              >
                <img
                  src={project?.coverImage?.url}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </motion.button>

              {/* Screenshots Thumbnails */}
              {project?.screenshots?.map((media, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === index
                      ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={media.url}
                    alt={`${project.title} preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <h2 className="text-3xl font-bold font-display tracking-tight">
                  Project Overview
                </h2>
              </div>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              <h3 className="text-2xl font-bold font-display tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Key Features
              </h3>

              <ul className="space-y-4">
                {project?.keyDetails?.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start group"
                  >
                    <span className="flex-shrink-0 mt-1 mr-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                <h2 className="text-3xl font-bold font-display tracking-tight">
                  Technology Stack
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project?.techStack?.map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="flex items-start p-4 bg-gray-700/30 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={tech?.icon?.url}
                        alt={tech.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{tech.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-cyan-400">
                          v{tech.version}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {tech.category}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Proficiency</span>
                          <span>{tech.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            style={{ width: `${tech.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Challenges & Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse"></div>
                <h2 className="text-3xl font-bold font-display tracking-tight">
                  Challenges & Solutions
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-cyan-400">
                  <h4 className="font-bold text-lg text-cyan-400 mb-2">
                    Performance Optimization
                  </h4>
                  <p className="text-gray-300">
                    The initial load time was exceeding 5 seconds due to
                    unoptimized assets. Implemented code splitting, lazy
                    loading, and image optimization techniques to reduce load
                    time to under 1.5 seconds.
                  </p>
                </div>

                <div className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-bold text-lg text-purple-400 mb-2">
                    Database Scaling
                  </h4>
                  <p className="text-gray-300">
                    As user base grew, database queries became slow. Implemented
                    indexing, query optimization, and read replicas to handle
                    10x more traffic with 60% faster response times.
                  </p>
                </div>

                <div className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-pink-400">
                  <h4 className="font-bold text-lg text-pink-400 mb-2">
                    Mobile Responsiveness
                  </h4>
                  <p className="text-gray-300">
                    Complex UI components weren't adapting well to mobile.
                    Redesigned with mobile-first approach using CSS Grid and
                    Flexbox, achieving 95+ scores on Lighthouse mobile tests.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                  <h2 className="text-3xl font-bold font-display tracking-tight">
                    Client Feedback
                  </h2>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) =>
                    i < Math.floor(project.rating) ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-yellow-400" />
                    )
                  )}
                  <span className="ml-2 text-gray-300">
                    {project.rating} ({project?.reviews?.length} reviews)
                  </span>
                </div>
              </div>

              {/* Review Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="mb-8 bg-gray-700/30 rounded-xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user"
                    value={newReview.user}
                    onChange={(e) =>
                      setNewReview({ ...newReview, user: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, stars: star })
                        }
                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                      >
                        {star <= newReview.stars ? (
                          <FaStar className="text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-yellow-400 opacity-50 hover:opacity-100" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-6">
                {project?.reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-xl p-6 border border-gray-700/50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-bold mr-3">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold">{review.user}</h4>
                          <p className="text-sm text-gray-400">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) =>
                          i < review.stars ? (
                            <FaStar key={i} className="text-yellow-400" />
                          ) : (
                            <FaRegStar key={i} className="text-yellow-400" />
                          )
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Project Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold font-display tracking-tight mb-6">
                Project Details
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-bold text-lg capitalize flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        project.status === "published"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    ></span>
                    {project.status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Project Type</p>
                  <p className="font-bold text-lg">
                    Full Stack Web Application
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Development Period</p>
                  <p className="font-bold text-lg">3 Months</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="font-bold text-lg">TechCorp Inc.</p>
                </div>
              </div>
            </motion.div>

            {/* Demo Access */}
            {project.demoCredentials && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6"
              >
                <h3 className="text-2xl font-bold font-display tracking-tight mb-4">
                  Demo Access
                </h3>

                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">
                      Username
                    </label>
                    <div className="flex items-center bg-gray-700/50 rounded-lg border border-gray-700 p-3">
                      <FiUser className="text-gray-400 mr-2" />
                      <span className="flex-1">
                        {project.demoCredentials.username}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(project.demoCredentials.username)
                        }
                        className="text-cyan-400 hover:text-white transition-colors"
                        aria-label="Copy username"
                      >
                        <HiOutlineClipboardCopy />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">
                      Password
                    </label>
                    <div className="flex items-center bg-gray-700/50 rounded-lg border border-gray-700 p-3">
                      <FiLock className="text-gray-400 mr-2" />
                      <span className="flex-1">
                        {project.demoCredentials.password}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(project.demoCredentials.password)
                        }
                        className="text-cyan-400 hover:text-white transition-colors"
                        aria-label="Copy password"
                      >
                        <HiOutlineClipboardCopy />
                      </button>
                    </div>
                  </div>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Visit Live Demo
                </a>
              </motion.div>
            )}

            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6"
              >
                <h3 className="text-2xl font-bold font-display tracking-tight mb-4">
                  Team Members
                </h3>

                <div className="space-y-3">
                  {project.collaborators.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate group-hover:text-cyan-400 transition-colors duration-300">
                          {person.name}
                        </h4>
                        <p className="text-sm text-gray-400 truncate">
                          {person.role}
                        </p>
                      </div>
                      <a
                        href={person.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        aria-label={`${person.name}'s LinkedIn`}
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold font-display tracking-tight mb-4">
                Project Links
              </h3>

              <div className="space-y-3">
                {project.githubUrls?.frontend && (
                  <a
                    href={project.githubUrls.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <FaGithub className="text-xl mr-3" />
                      <span>Frontend Code</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}

                {project.githubUrls?.backend && (
                  <a
                    href={project.githubUrls.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <FaGithub className="text-xl mr-3" />
                      <span>Backend Code</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg border border-purple-500/30 hover:border-cyan-400/50 hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <FaExternalLinkAlt className="text-xl mr-3" />
                      <span>Live Demo</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}

                {project.documentationUrl && (
                  <a
                    href={project.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-400/30 hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Documentation</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold font-display tracking-tight mb-4">
                Tech Stack Summary
              </h3>

              <div className="space-y-4">
                {Array.from(
                  new Set(project.techStack.map((tech) => tech.category))
                ).map((category, index) => {
                  const categoryTechs = project.techStack.filter(
                    (tech) => tech.category === category
                  );
                  const avgProficiency = Math.round(
                    categoryTechs.reduce(
                      (sum, tech) => sum + tech.proficiency,
                      0
                    ) / categoryTechs?.length
                  );

                  return (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{category}</span>
                        <span className="text-sm text-cyan-400">
                          {avgProficiency}% avg
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          style={{ width: `${avgProficiency}%` }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {categoryTechs?.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full border border-gray-700"
                          >
                            <img
                              src={tech?.icon?.url}
                              alt={tech?.name}
                              className="w-4 h-4 mr-2"
                            />
                            <span className="text-sm">{tech?.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 rounded-2xl border border-purple-500/30 shadow-xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold font-display tracking-tight mb-3">
                Like What You See?
              </h3>
              <p className="text-gray-300 mb-6">
                I'm available for freelance projects or full-time positions.
                Let's build something amazing together!
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700/50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold font-display tracking-tight">
                  Let's Work Together
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    How Can I Help?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-700/50 px-6 py-4 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://linkedin.com/in/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="mailto:youremail@example.com"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="text-2xl"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5l-10 6.25L2 5.5V4zm0 3.75v12.25a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7.75l-10 6.25L2 7.75z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
