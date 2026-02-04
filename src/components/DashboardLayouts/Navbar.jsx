
import { FiMenu, FiLogOut, FiSearch, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import NotificationDropdown from '../Dashboard/Notification';

const Navbar = ({ toggleSidebar }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-900 border-b border-gray-800 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left: Logo + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <FiMenu size={20} />
          </button>
          
          <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio Dashboard
          </h1>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
           <NotificationDropdown />
           
          <button onClick={()=> navigate("/dashboard/settings")} className="hidden sm:block p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800">
            <FiSettings size={18} />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-200">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;