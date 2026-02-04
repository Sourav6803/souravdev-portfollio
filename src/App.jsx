import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import OverviewPage from "./pages/Dashboard/Overview";
import SettingsPage from "./pages/Dashboard/Settings";
import ProjectListPage from "./pages/Dashboard/Project/ProjectList";
// import ProjectDetailsPage from "./pages/Dashboard/Project/ProjectDetailsPage";
import AddProjectPage from "./pages/Dashboard/Project/AddProject";
import AddTechStackPage from "./pages/Dashboard/TechStack/AddTech";
import VisitorPage from "./pages/Dashboard/VisitorPage";
import PerformancePage from "./pages/Dashboard/PerformancePage";
import DatabasePage from "./pages/Dashboard/DatabasePage";
import SechdulePage from "./pages/Dashboard/SechedulePage";
import MessagesPage from "./pages/Dashboard/MessagesPage";
import HelpCenterPage from "./pages/Dashboard/HelpCenterPage";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingModal from "./components/Modal/LoadingModal";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import Projects from "./pages/ProjectsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AddBlogPage from "./pages/Dashboard/Blogs/AddBlogPage";
import AllBlogs from "./components/AllBlogs";
import AllBlogPage from "./pages/AllBlogPage";

function App() {
  return (
    <>
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />  
          <Route path="/project/:slug" element={<ProjectDetailsPage/>} />
          <Route path="/all-projects" element={<Projects />} />  
          <Route path="/blog" element={<AllBlogPage />} />  
          <Route path="/blog/:slug" element={<BlogDetailsPage />} /> 

          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/dashboard/add-project" element={<ProtectedRoute><AddProjectPage /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><ProjectListPage /></ProtectedRoute>} />
          <Route path="/dashboard/blog" element={<ProtectedRoute><AddBlogPage /></ProtectedRoute>} />
          <Route path="/dashboard/project/:id" element={<ProtectedRoute><ProjectDetailsPage /></ProtectedRoute>} />
          <Route path="/dashboard/add-techStack" element={<ProtectedRoute><AddTechStackPage /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><VisitorPage /></ProtectedRoute>} />
          <Route path="/dashboard/performance" element={<ProtectedRoute><PerformancePage /></ProtectedRoute>} />
          <Route path="/dashboard/database" element={<ProtectedRoute><DatabasePage /></ProtectedRoute>} />
          <Route path="/dashboard/schedule" element={<ProtectedRoute><SechdulePage /></ProtectedRoute>} />
          <Route path="/dashboard/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/dashboard/help" element={<ProtectedRoute><HelpCenterPage /></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </LoadingProvider>
    </>
  );
}

export default App;


