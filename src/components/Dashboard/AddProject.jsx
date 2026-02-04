import React, { useEffect, useState } from 'react';
import { 
  FiArrowLeft, FiPlus, FiImage, FiLink, 
  FiTag, FiUsers, FiCode, FiGlobe,
  FiGithub, FiFigma, FiFileText, FiTrash2,
  FiCheck, FiX, FiChevronDown, FiChevronUp,
  FiChevronRight
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from "react-toastify";
import { server } from '../../server';
import { useLoading } from '../../context/LoadingContext';

const AddProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [expandedSection, setExpandedSection] = useState('basic');
  const [techStack, setTechStack] = useState([]);
  const [newTech, setNewTech] = useState({
    _id: "",
    name: "",
    category: "",
    proficiency: 80,
    icon: null,
  });
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ type: 'live', url: '' });
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState({ name: '', role: '' });
  const [screenshots, setScreenshots] = useState([]);
  const [coverImage, setCoverImage] = useState()

  const { showLoading, hideLoading } = useLoading();

  // In your AddProjectPage component
  const [keyDetails, setKeyDetails] = useState([
    "Responsive design that works on all devices",
    "Dark/Light mode toggle",
    ""
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'development',
    featured: false,
    startDate: '',
    endDate: '',
    repositoryUrl: '',
    liveUrl: '',
    designUrl: ''
  });

  // Form validation
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: ''
  });

  const [allTechStack, setAllTechStack] = useState([]);

  const fetchTechStack = async () => {
    try {
      const res = await axios.get(`${server}/techStack/all-techStack`, {
        withCredentials: true,
      });
      if (res?.data) {
        setAllTechStack(res.data.techStacks);
      }
    } catch (error) {
      console.error("Error adding technology:", error);
      toast.error(error?.response?.data?.message || "Failed to add technology");
    }
  };

  useEffect(() => {
    fetchTechStack();
  }, []);

  console.log("all techStack==>", allTechStack);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Project title is required';
        else if (value.length > 100) error = 'Title must be less than 100 characters';
        break;
      case 'description':
        if (!value.trim()) error = 'Description is required';
        break;
      case 'startDate':
        if (!value) error = 'Start date is required';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      validateField(name, val);
    }
  };

  // Updated handleTechAdd function

  const handleTechAdd = () => {
  if (newTech._id) {
    setTechStack(prev => [...prev, { ...newTech }]);
    setNewTech({ 
      _id: '', 
      name: '', 
      category: '', 
      proficiency: 80,
      icon: null
    });
  }
};
  const handleTechRemove = (index) => {
    setTechStack(prev => prev.filter((_, i) => i !== index));
  };

  const handleLinkAdd = () => {
    const { url, type } = newLink;

    if (!url.trim() || !type.trim()) return;

    const isDuplicate = links.some((link) => link.url === url);

    if (isDuplicate) {
      toast.error("This URL is already added.");
      return;
    }

    setLinks((prev) => [...prev, { ...newLink }]);
    setNewLink({ type: "", url: "" });
  };

  const handleLinkRemove = (index) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleCollaboratorAdd = () => {
    if (newCollaborator.name.trim() && newCollaborator.role.trim()) {
      setCollaborators(prev => [...prev, { ...newCollaborator }]);
      setNewCollaborator({ name: '', role: '' });
    }
  };

  const handleCollaboratorRemove = (index) => {
    setCollaborators(prev => prev.filter((_, i) => i !== index));
  };

  const handleScreenshotUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newScreenshots = files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file
      }));
      setScreenshots(prev => [...prev, ...newScreenshots]);
    }
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const cover = {
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      };
      setCoverImage(cover); // Assuming you're using `useState` for cover image
    }
  };

  const handleScreenshotRemove = (index) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step) => {
    let isValid = true;
    
    if (step === 1) {
      if (!formData.title.trim()) {
        setErrors(prev => ({ ...prev, title: 'Project title is required' }));
        isValid = false;
      }
      if (!formData.description.trim()) {
        setErrors(prev => ({ ...prev, description: 'Description is required' }));
        isValid = false;
      }
      if (!formData.startDate) {
        setErrors(prev => ({ ...prev, startDate: 'Start date is required' }));
        isValid = false;
      }
    }
    
    return isValid;
  };
  
  const handleKeyDetailChange = (index, value) => {
    const newDetails = [...keyDetails];
    newDetails[index] = value;
    setKeyDetails(newDetails);
  };

  const addKeyDetailField = () => {
    setKeyDetails([...keyDetails, ""]);
  };

  const removeKeyDetail = (index) => {
    setKeyDetails(keyDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
      return;
    }

    setIsSubmitting(true);

    try {
      showLoading();
      const form = new FormData();

      // Append basic fields
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("status", formData.status);
      form.append("featured", String(formData.featured));
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate || "");
      form.append("repositoryUrl", formData.repositoryUrl || "");
      form.append("liveUrl", formData.liveUrl || "");
      form.append("designUrl", formData.designUrl || "");

      // Append cover image
      if (coverImage?.file) {
        form.append("coverImage", coverImage.file);
      }

      // Append screenshots
      screenshots.forEach((screenshot, index) => {
        if (screenshot.file) {
          form.append("screenshots", screenshot.file);
        }
      });

      // Append structured fields (as JSON strings)
      form.append("techStack", JSON.stringify(techStack));
      form.append(
        "keyDetails",
        JSON.stringify(keyDetails.filter((d) => d.trim() !== ""))
      );
      form.append("links", JSON.stringify(links));
      form.append("collaborators", JSON.stringify(collaborators));

      // Send request
      const res = await axios.post(`${server}/project/create-project`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        toast.success("Project added successfully");
        navigate("/dashboard/projects");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error(error?.response?.data?.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  const sectionToggle = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };
  

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Projects</span>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Step {step} of 3</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-2 h-2 rounded-full ${
                  step >= num ? "bg-purple-500" : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Add New Project
      </h1>
      <p className="text-gray-400 mb-8">
        Fill in the details below to add a new project to your portfolio
      </p>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">
                Basic Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={(e) => validateField("title", e.target.value)}
                    className={`w-full bg-gray-800 border ${
                      errors.title ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="My Awesome Project"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={(e) => validateField("description", e.target.value)}
                    className={`w-full bg-gray-800 border ${
                      errors.description ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Describe your project in detail..."
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      onBlur={(e) => validateField("startDate", e.target.value)}
                      className={`w-full bg-gray-800 border ${
                        errors.startDate ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="planning">Planning</option>
                      <option value="development">Development</option>
                      <option value="live">Live</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-6 rounded-full ${
                            formData.featured ? "bg-purple-600" : "bg-gray-700"
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                            formData.featured ? "transform translate-x-4" : ""
                          }`}
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-400 text-sm">
                        Featured Project
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mt-6">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Key Features/Details
                  </h2>
                  <div className="space-y-3">
                    {keyDetails.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) =>
                            handleKeyDetailChange(index, e.target.value)
                          }
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter key feature"
                        />
                        {keyDetails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKeyDetail(index)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addKeyDetailField}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-2"
                    >
                      <FiPlus size={16} />
                      <span>Add Another Feature</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Technology & Media */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Tech Stack */}
            {/* <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("tech")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiCode className="text-blue-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Technology Stack
                  </h2>
                </div>
                {expandedSection === "tech" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "tech" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {techStack.length > 0 ? (
                        <div className="space-y-3">
                          {techStack.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                            >
                              <div>
                                <p className="text-white">{tech.name}</p>
                                <p className="text-gray-400 text-sm">
                                  {tech.category} • {tech.proficiency}%
                                  proficiency
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleTechRemove(index)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No technologies added yet
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <h3 className="text-md font-medium text-white mb-3">
                          Add New Technology
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={newTech.name}
                              onChange={(e) =>
                                setNewTech({ ...newTech, name: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="React"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Category
                            </label>
                            <input
                              type="text"
                              value={newTech.category}
                              onChange={(e) =>
                                setNewTech({
                                  ...newTech,
                                  category: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Frontend"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Proficiency
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={newTech.proficiency}
                                onChange={(e) =>
                                  setNewTech({
                                    ...newTech,
                                    proficiency: parseInt(e.target.value),
                                  })
                                }
                                className="w-full"
                              />
                              <span className="text-sm text-white w-8">
                                {newTech.proficiency}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleTechAdd}
                          className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
                        >
                          Add Technology
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("tech")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiCode className="text-blue-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Technology Stack
                  </h2>
                </div>
                {expandedSection === "tech" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "tech" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {techStack.length > 0 ? (
                        <div className="space-y-3">
                          {techStack.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                {tech.icon?.url ? (
                                  <img
                                    src={tech.icon.url}
                                    alt={tech.name}
                                    className="w-6 h-6 object-contain"
                                  />
                                ) : (
                                  <FiCode className="text-blue-400" />
                                )}
                                <div>
                                  <p className="text-white">{tech.name}</p>
                                  <p className="text-gray-400 text-sm capitalize">
                                    {tech.category} • {tech.proficiency}%
                                    proficiency
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleTechRemove(index)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No technologies added yet
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <h3 className="text-md font-medium text-white mb-3">
                          Add New Technology
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">
                              Select Technology
                            </label>
                            <div className="relative">
                              <select
                                value={newTech._id || ""}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  if (selectedId) {
                                    const selectedTech = allTechStack.find(
                                      (t) => t._id === selectedId
                                    );
                                    if (selectedTech) {
                                      setNewTech({
                                        _id: selectedTech._id,
                                        name: selectedTech.name,
                                        category: selectedTech.category,
                                        proficiency: selectedTech.proficiency,
                                        icon: selectedTech.icon,
                                      });
                                    }
                                  }
                                }}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                              >
                                <option value="">Select a technology</option>
                                {allTechStack.map((tech) => (
                                  <option key={tech._id} value={tech._id}>
                                    {tech.name} ({tech.category}) {tech.proficiency}% proficiency
                                  </option>
                                ))}
                              </select>
                              <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                            </div>
                          </div>


                          
                          {/* <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Proficiency
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={newTech.proficiency}
                                onChange={(e) =>
                                  setNewTech({
                                    ...newTech,
                                    proficiency: parseInt(e.target.value),
                                  })
                                }
                                className="w-full"
                              />
                              <span className="text-sm text-white w-8">
                                {newTech.proficiency}%
                              </span>
                            </div>
                          </div> */}
                        </div>
                        <button
                          type="button"
                          onClick={handleTechAdd}
                          disabled={!newTech._id}
                          className={`mt-3 px-4 py-2 text-white rounded-lg text-sm ${
                            newTech._id
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-700 cursor-not-allowed"
                          }`}
                        >
                          Add Technology
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Links */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("links")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiLink className="text-purple-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Project Links
                  </h2>
                </div>
                {expandedSection === "links" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "links" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {links.length > 0 ? (
                        <div className="space-y-3">
                          {links.map((link, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                            >
                              <div>
                                <p className="text-white capitalize">
                                  {link.type} URL
                                </p>
                                <p className="text-gray-400 text-sm truncate">
                                  {link.url}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleLinkRemove(index)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No links added yet
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <h3 className="text-md font-medium text-white mb-3">
                          Add New Link
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Type
                            </label>
                            <select
                              value={newLink.type}
                              onChange={(e) =>
                                setNewLink({ ...newLink, type: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="" disabled>
                                Select type
                              </option>
                              <option value="live">Live URL</option>
                              <option value="github">GitHub</option>
                              <option value="design">Design</option>
                              <option value="documentation">
                                Documentation
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              URL
                            </label>
                            <input
                              type="url"
                              value={newLink.url}
                              onChange={(e) =>
                                setNewLink({ ...newLink, url: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleLinkAdd}
                          className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
                        >
                          Add Link
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cover Image Upload */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("cover")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiImage className="text-yellow-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Cover Image
                  </h2>
                </div>
                {expandedSection === "cover" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "cover" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {coverImage ? (
                        <div className="relative group w-48">
                          <img
                            src={coverImage.url}
                            alt="Cover Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => setCoverImage(null)}
                            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX className="text-white text-xs" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No cover image uploaded
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <label className="block text-sm text-gray-400 mb-2">
                          Upload Cover Image
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
                            onChange={handleCoverImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Screenshots */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("screenshots")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiImage className="text-green-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Screenshots
                  </h2>
                </div>
                {expandedSection === "screenshots" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "screenshots" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {screenshots.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {screenshots.map((screenshot, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={screenshot.url}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-700"
                              />
                              <button
                                type="button"
                                onClick={() => handleScreenshotRemove(index)}
                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FiX className="text-white text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No screenshots uploaded yet
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <label className="block text-sm text-gray-400 mb-2">
                          Upload Screenshots
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
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
                            multiple
                            accept="image/*"
                            onChange={handleScreenshotUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Step 3: Collaborators & Review */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Collaborators */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                type="button"
                onClick={() => sectionToggle("collaborators")}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <FiUsers className="text-yellow-400 text-xl" />
                  <h2 className="text-xl font-semibold text-white">
                    Collaborators
                  </h2>
                </div>
                {expandedSection === "collaborators" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === "collaborators" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4">
                      {collaborators.length > 0 ? (
                        <div className="space-y-3">
                          {collaborators.map((collab, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                            >
                              <div>
                                <p className="text-white">{collab.name}</p>
                                <p className="text-gray-400 text-sm">
                                  {collab.role}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCollaboratorRemove(index)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No collaborators added yet
                        </p>
                      )}

                      <div className="pt-4 border-t border-gray-800">
                        <h3 className="text-md font-medium text-white mb-3">
                          Add Collaborator
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={newCollaborator.name}
                              onChange={(e) =>
                                setNewCollaborator({
                                  ...newCollaborator,
                                  name: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">
                              Role
                            </label>
                            <input
                              type="text"
                              value={newCollaborator.role}
                              onChange={(e) =>
                                setNewCollaborator({
                                  ...newCollaborator,
                                  role: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Frontend Developer"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCollaboratorAdd}
                          className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
                        >
                          Add Collaborator
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Summary */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">
                Project Summary
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Project Title</span>
                  <span className="text-white">{formData.title || "-"}</span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white capitalize">
                    {formData.status}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-white">
                    {techStack.length > 0
                      ? techStack.map((t) => t.name).join(", ")
                      : "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Links</span>
                  <span className="text-white">
                    {links.length > 0
                      ? links.map((l) => l.type).join(", ")
                      : "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Collaborators</span>
                  <span className="text-white">
                    {collaborators.length > 0 ? collaborators.length : "0"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Screenshots</span>
                  <div>
                    <img
                      src={coverImage.url}
                      alt="Cover Preview"
                      className="w-10 h-10 object-cover rounded-lg border border-gray-700"
                    />
                  </div>
                </div>

                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Screenshots</span>
                  <div className="flex -space-x-2">
                    {screenshots.length > 0 ? (
                      screenshots.map((s, idx) => (
                        <img
                          key={idx}
                          src={s.url}
                          alt={`Screenshot ${idx + 1}`}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-700"
                        />
                      ))
                    ) : (
                      <span className="text-white text-sm">No screenshots</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Featured</span>
                  <span
                    className={`${
                      formData.featured ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {formData.featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 ${
              step < 3
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            }`}
          >
            {isSubmitting ? (
              "Processing..."
            ) : step < 3 ? (
              <>
                <span>Next</span>
                <FiChevronRight className="transform " />
              </>
            ) : (
              <>
                <FiCheck />
                <span>Submit Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;