
import ProjectCard from "./ProjectCard";


const ProjectGrid = ({ projects }) => {

  return (
    <div 
      className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGrid;