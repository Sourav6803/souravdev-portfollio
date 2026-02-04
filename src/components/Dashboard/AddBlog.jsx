import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { FiUpload, FiX, FiTag, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useLoading } from "../../context/LoadingContext";
import axios from "axios";

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none p-4 min-h-[300px] border border-gray-700 rounded-lg bg-gray-800",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "draft",
    featured: false,
    tags: [],
    categories: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [content, setContent] = useState("");

  const { showLoading, hideLoading } = useLoading();

  // Generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Generate SEO meta title from title
  useEffect(() => {
    if (formData.title && !formData.seo.metaTitle) {
      setFormData((prev) => ({
        ...prev,
        seo: { ...prev.seo, metaTitle: `${prev.title} | My Tech Blog` },
      }));
    }
  }, [formData.title]);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 2 * 1024 * 1024) {
  //       toast.error("Image size should be less than 2MB");
  //       return;
  //     }
  //     // const reader = new FileReader();
  //     // reader.onloadend = () => {
  //     //   setPreviewImage(reader.result);
  //     //   setFormData(prev => ({ ...prev, featuredImage: reader.result }));
  //     // };
  //     // reader.readAsDataURL(file);

  //     const image = {
  //       name: file.name,
  //       url: URL.createObjectURL(file),
  //       file,
  //     };
  //     setFeaturedImage(image);

  //   }
  //   setFormData({...AddBlog, featuredImage: featuredImage?.file})
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const previewURL = URL.createObjectURL(file);

    // Set preview and image state
    setPreviewImage(previewURL);
    setFeaturedImage({
      name: file.name,
      url: previewURL,
      file,
    });

    // Update formData directly with the File object
    setFormData((prev) => ({
      ...prev,
      featuredImage: file,
    }));
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag.toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.toLowerCase()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword && !formData.seo.keywords.includes(newKeyword)) {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword],
        },
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((kw) => kw !== keywordToRemove),
      },
    }));
  };

  console.log("form data-->", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      setIsSubmitting(false);
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("slug", formData.slug);
    formPayload.append("excerpt", formData.excerpt);
    formPayload.append("content", formData.content);
    formPayload.append("status", formData.status);
    formPayload.append("featured", formData.featured);
    formPayload.append("featuredImage", formData.featuredImage);
    formPayload.append("tags", JSON.stringify(formData.tags));
    formPayload.append("categories", JSON.stringify(formData.categories));
    formPayload.append("seo", JSON.stringify(formData.seo));

    try {
      showLoading();

      const res = await axios.post(`${server}/blog/create-blog`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Blog post created successfully!");
        // navigate("/blog");
      }

      // Simulate API call delay
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Failed to create blog post");
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mt-10 md:ml-64 mx-auto  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
          <p className="text-gray-400">
            Fill in the details below to publish a new article
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-purple-400">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="URL-friendly slug"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Featured Image */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Featured Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-700/50 transition-colors">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG (Max. 2MB)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage("");
                        setFormData({ ...formData, featuredImage: "" });
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows="3"
                  placeholder="Short summary of your blog post"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Editor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-purple-400">
              Content *
            </h2>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {/* <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                modules={modules}
                formats={formats}
                placeholder="Write your blog content here..."
                className="h-96 text-gray-100"
              /> */}
              {/* <QuillWrapper
              forwardedRef={quillRef}
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              modules={modules}
              formats={formats}
              placeholder="Write your blog content here..."
              className="h-96 text-gray-100 [&_.ql-editor]:min-h-[300px]"
            /> */}

              <TiptapEditor
                content={formData.content}
                onChange={(newContent) =>
                  setFormData((prev) => ({ ...prev, content: newContent }))
                }
              />
            </div>
          </motion.div>

          {/* Taxonomy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-purple-400">
              Taxonomy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Add tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-400 hover:text-red-400"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Categories
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddCategory())
                    }
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Add category"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="ml-2 text-gray-400 hover:text-red-400"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEO Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-purple-400">
              SEO Settings
            </h2>

            <div className="space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Title *
                </label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="SEO title for search engines"
                  required
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Description *
                </label>
                <textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaDescription: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows="3"
                  placeholder="SEO description for search engines"
                  required
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddKeyword())
                    }
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Add keyword"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.seo.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="ml-2 text-gray-400 hover:text-red-400"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Post Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-medium">Featured Post</h3>
              <p className="text-sm text-gray-400">
                Pin this post to the top of your blog
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex justify-end gap-4"
          >
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
