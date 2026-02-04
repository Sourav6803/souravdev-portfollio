const ProjectSkeletonCard = () => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse">
      <div className="h-60 bg-gray-800 w-full" />
      <div className="p-5 space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="flex space-x-2 mt-4">
          <div className="h-6 w-16 bg-gray-700 rounded-full" />
          <div className="h-6 w-16 bg-gray-700 rounded-full" />
          <div className="h-6 w-12 bg-gray-700 rounded-full" />
        </div>
        <div className="h-3 bg-gray-700 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );
};

export default ProjectSkeletonCard;