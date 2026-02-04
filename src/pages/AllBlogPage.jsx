import AllBlogs from "../components/AllBlogs";
import Navbar from "../components/NavBar";
import Footer from "../components/section/Footer";

const AllBlogPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-20">
      
        {/* Adjust to your Navbar height */}
        <AllBlogs />
      </div>
      <Footer />
    </div>
  );
};

export default AllBlogPage;