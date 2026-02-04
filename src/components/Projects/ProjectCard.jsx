

import { motion } from "framer-motion";
import {
  FiStar,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  development: {
    color: "bg-blue-600",
    icon: <span className="text-xs">Dev</span>,
  },
  completed: {
    color: "bg-green-600",
    icon: <span className="text-xs">Live</span>,
  },
};

const ProjectCard = ({ project,  }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      key={project._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group`}
      onClick={() => navigate(`/project/${project?.slug}`)}
    >

      {project.featured && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
          <FiStar size={12} />
          <span>Featured</span>
        </div>
      )}

      <div className="h-60 bg-gray-800 overflow-hidden relative">
        <img
          src={project.coverImage?.url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div
          className={`absolute bottom-3 right-3 ${statusConfig[project.status]?.color} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md`}
        >
          {statusConfig[project.status]?.icon}
          <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <FiEye size={14} />
            {project.views.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {project.status === "development" && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Development Progress</span>
              <span>{project.metrics?.performance || 0}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                style={{ width: `${project.metrics?.performance || 0}%` }}
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
              <img src={tech.icon?.url} alt={tech.name} className="w-3 h-3" />
              {tech.name}
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
            {new Date(project.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          {/* <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
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
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
