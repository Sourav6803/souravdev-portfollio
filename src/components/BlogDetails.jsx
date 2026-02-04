import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiClock,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiTag,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server";
import { useAuth } from "../context/AuthContext";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useAuth();

  // Check if current user has liked the post when loading
  useEffect(() => {
    if (blog?.likers?.includes(user?._id)) {
      setLiked(true);
    }
    // setLikesCount(blog?.likes || 0);
  }, [blog, user]);

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const { data } = await axios.get(`${server}/blog/slug/${slug}`);

        if(data?.data){
          setBlog(data?.data);
          setLikes(data.likes);
          setComments(data.data.comments);
        }
        
        // Fetch related blogs
        const relatedResponse = await axios.get(`${server}/blog/related?categories=${data?.data?.categories.join(",")}&exclude=${data?.data?._id}`);
        
        setRelatedBlogs(relatedResponse?.data);
        
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load blog post");
        navigate("/blog");
      }
    };

    fetchBlog();
  }, [slug, navigate]);
  
  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like this post");
      return;
    }

    try {
      if (liked) {
        const response = await axios.put(
          `${server}/blog/${blog._id}/unlike`,
          {},
          {
            withCredentials: true,
          }
        );
        // setLikesCount(response.data.likes);
        setLiked(false);
      } else {
        const response = await axios.put(
          `${server}/blog/${blog._id}/like`,
          {},
          {
            withCredentials: true,
          }
        );
        
        setLiked(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating like");
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      // Show loading state
      setCommentLoading(true);

      // Make API call to add comment
      const response = await axios.post(
        `${server}/blog/${blog?._id}/comment`,
        { content: newComment },
        { withCredentials: true }
      );

      // Add the comment from the API response
      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen  text-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 w-32 bg-gray-800 rounded mb-6"></div>
            <div className="h-12 w-full bg-gray-800 rounded mb-4"></div>
            <div className="h-96 w-full bg-gray-800 rounded-lg mb-6"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => navigate("/blog")}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </motion.button>

        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.categories?.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs font-medium rounded-full flex items-center gap-1"
              >
                <FiTag size={12} />
                {category}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiClock className="mr-1" />{" "}
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              <span className="flex items-center">
                <FiEye className="mr-1" /> {blog.views}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center ${
                  liked ? "text-red-400" : "text-gray-400 hover:text-red-400"
                }`}
              >
                <FiHeart className={liked ? 'fill-current mr-1' : 'mr-1'} /> {likes}
              </button>
              <button className="flex items-center text-gray-400 hover:text-purple-400">
                <FiShare2 className="mr-1" /> Share
              </button>
              <button className="flex items-center text-gray-400 hover:text-purple-400">
                <FiBookmark className="mr-1" /> Save
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 rounded-xl overflow-hidden"
        >
          <img
            src={blog?.featuredImage}
            alt={blog.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-invert max-w-none mb-12"
        >
          {blog?.content?.split("\n")?.map((paragraph, i) => (
            <p key={i} className="mb-4 text-gray-300">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <FiMessageSquare className="mr-2" /> Comments ({comments?.length})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {comments?.length > 0 ? (
              comments?.map((comment) => {
                // Check if the comment belongs to the current user
                const isCurrentUser =
                  user?._id === comment.user?._id || user?._id === comment.user;

                return (
                  <div
                    key={comment?._id}
                    className="bg-gray-800/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                          {isCurrentUser
                            ? "Y"
                            : comment.user?.name?.charAt(0) || "U"}
                        </div>
                        <span className="font-medium">
                          {isCurrentUser
                            ? "You"
                            : comment.user?.name || "Anonymous"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-300 pl-11">{comment.content}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center py-6">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </motion.div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs?.slice(0, 2).map((relatedBlog) => (
                <div
                  key={relatedBlog._id}
                  onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
                  className="bg-gray-800 hover:bg-gray-700/70 rounded-xl overflow-hidden cursor-pointer transition-colors"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={
                        relatedBlog.featuredImage ||
                        "https://source.unsplash.com/random/600x400/?tech"
                      }
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiClock className="mr-1" />
                      <span>
                        {formatDate(
                          relatedBlog.publishedAt || relatedBlog.createdAt
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
