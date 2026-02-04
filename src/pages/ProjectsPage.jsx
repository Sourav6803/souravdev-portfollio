import Navbar from "../components/NavBar";
import ProjectDetails from "../components/ProjectDetais";
import ProjectsPage from "../components/Projects/AllProjects";
import Footer from "../components/section/Footer";

const Projects = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-20">
      
        {/* Adjust to your Navbar height */}
        <ProjectsPage />
      </div>
      <Footer />
    </div>
  );
};

export default Projects;