import { useState, useEffect } from "react";
import ProjectGrid from "./ProjectGrid";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${server}/project/all-projects`);

        if (res) {
          setProjects(res.data?.projects);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // if (loading) {
  //   return (
  //     <section className="py-20">
  //       <div className="container mx-auto text-center">
  //         <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
  //       </div>
  //     </section>
  //   );
  // }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-red-500">
          Error loading projects: {error}
        </div>
      </section>
    );
  }

  return (
  
    <section  className="relative p-10 overflow-hidden ">
      {/* Particle background */}
      <div className="absolute inset-0 opacity-10 "> 
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 px-4 py-1 text-sm font-medium text-purple-300">
              Portfolio Showcase
            </span>
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              My{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Innovative Projects
              </span>
            </h2>
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-xl text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore a curated collection of my professional work, each
              representing unique solutions to complex challenges and
              demonstrating technical excellence.
            </motion.p>
          </motion.div>
        </div>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ProjectGrid projects={projects} />
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-gray-400 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-16 w-16 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-300">
                No Projects Available
              </h3>
              <p className="mt-2 text-gray-500">
                I'm currently working on new projects. Please check back soon or{" "}
                <a href="#contact" className="text-purple-400 hover:underline">
                  contact me
                </a>{" "}
                to discuss potential collaborations.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="group relative rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span onClick={()=> navigate('/all-projects')} className="relative z-10">View All Projects</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 blur-md opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:-inset-2"></span>
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Interested in my work?{" "}
            <a
              href="#contact"
              className="font-medium text-purple-400 hover:underline"
            >
              Let's discuss your project
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
