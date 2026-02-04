import Navbar from "../components/NavBar";
import ProjectDetails from "../components/ProjectDetais";
import Footer from "../components/section/Footer";

const ProjectDetailsPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-20">
      
        {/* Adjust to your Navbar height */}
        <ProjectDetails />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
