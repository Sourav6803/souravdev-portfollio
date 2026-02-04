import BlogDetails from "../components/BlogDetails";
import Navbar from "../components/NavBar";

import Footer from "../components/section/Footer";

const BlogDetailsPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-20">
      
        {/* Adjust to your Navbar height */}
        <BlogDetails />
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
