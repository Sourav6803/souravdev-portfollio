
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { navLinks } from "./constsants";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { server } from "../server";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredLink, setHoveredLink] = useState(null);
//   const { user, setUser, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navbarRef = useRef(null);

//   // Track scroll position for navbar effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location]);

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${server}/auth/logout`, { withCredentials: true });
//       setUser(null);
//       toast.success("Logout successful");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: -20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
    

//     <motion.header
//       ref={navbarRef}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", damping: 10, stiffness: 100 }}
//       className={`fixed w-full z-100 ${
//         scrolled
//           ? "bg-gray-700/80 backdrop-blur-md shadow"
//           : "bg-gray-700/80 backdrop-blur-sm"
//       } transition-all duration-300 ease-in-out`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20">
//           {/* Logo */}
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", damping: 10 }}
//             className="flex-shrink-0"
//           >
//             <a href="/" className="flex items-center group" aria-label="Home">
//               <motion.span
//                 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Sourav Bhukta
//               </motion.span>
//               <motion.span
//                 className="ml-2 hidden md:inline-block w-2 h-2 rounded-full bg-pink-500 group-hover:bg-indigo-500 transition-colors"
//                 animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 2,
//                   ease: "easeInOut",
//                 }}
//               />
//             </a>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             <motion.ul
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="flex space-x-1"
//             >
//               {navLinks.map(({ link, name }) => (
//                 <motion.li
//                   key={name}
//                   variants={itemVariants}
//                   className="relative px-3 py-2"
//                   onMouseEnter={() => setHoveredLink(name)}
//                   onMouseLeave={() => setHoveredLink(null)}
//                 >
//                   <a
//                     href={link}
//                     className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
//                       location.pathname === link
//                         ? "text-indigo-400"
//                         : "text-gray-300 hover:text-white"
//                     }`}
//                   >
//                     {name}
//                   </a>
//                   {hoveredLink === name && (
//                     <motion.div
//                       layoutId="navHighlight"
//                       className="absolute inset-0 bg-gray-700/30 rounded-md z-0"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 25,
//                       }}
//                     />
//                   )}
//                   {location.pathname === link && (
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400"
//                       layoutId="underline"
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 30,
//                       }}
//                     />
//                   )}
//                 </motion.li>
//               ))}
//             </motion.ul>
//           </nav>

//           {/* Auth & Mobile Menu */}
//           <div className="flex items-center space-x-3">
//             {!loading && user ? (
//               <>
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => navigate("/dashboard")}
//                   className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow"
//                 >
//                   Dashboard
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleLogout}
//                   className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white border border-gray-600 hover:bg-gray-700"
//                 >
//                   Logout
//                 </motion.button>
//               </>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/login")}
//                 className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
//               >
//                 Login
//               </motion.button>
//             )}

//             {/* Mobile menu button */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
//             >
//               {mobileMenuOpen ? (
//                 <svg
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             key="mobile-sidebar"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             // className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm h-full border-2 border-white"
//             className="fixed w-full   h-full top-0 inset-0 z-[100] bg-black/60 backdrop-blur-sm"
//           >
//             <motion.aside
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="fixed w-72 bg-gray-900 h-screen top-0 left-0 z-10 overflow-y-scroll"
//               // className="w-72 h-full bg-gray-900 shadow-lg p-6 flex flex-col justify-between "
//             >
//               <div className="space-y-4">
//                 {/* Close Button */}
//                 <div className="flex justify-end mb-4 mt-2">
//                   <button
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="text-gray-400 hover:text-white border border-gray-500 rounded-full p-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="flex flex-col gap-3">
//                   {navLinks.map(({ link, name }) => (
//                     <a
//                       key={name}
//                       href={link}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className={`block px-4 py-2 rounded-lg text-base font-medium ${
//                         location.pathname === link
//                           ? "bg-indigo-600 text-white"
//                           : "text-gray-300 hover:bg-gray-600 hover:text-white"
//                       }`}
//                     >
//                       {name}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Auth Buttons */}
//               <div className="pt-4 border-t border-gray-700 px-4">
//                 {!loading && user ? (
//                   <>
//                     <button
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         navigate("/dashboard");
//                       }}
//                       className="w-full mb-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         handleLogout();
//                       }}
//                       className="w-full px-4 py-2 rounded-md bg-gray-700 text-white font-medium hover:bg-gray-600"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
//                   >
//                     Login
//                   </button>
//                 )}
//               </div>
//             </motion.aside>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { navLinks } from "./constants";
import { navLinks } from "./constsants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef(null);

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const navbar = navbarRef.current;
    if (navbar) {
      navbar.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${server}/auth/logout`, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.header
      ref={navbarRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        delay: 0.1 
      }}
      className={`fixed w-full z-500 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/85 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-gray-800/50"
          : "bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-sm"
      }`}
    >
      {/* Interactive gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo with advanced animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15,
              delay: 0.2 
            }}
            className="flex-shrink-0 relative"
          >
            <motion.a
              href="/"
              className="flex items-center group relative"
              aria-label="Home"
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glowing orb effect */}
              <motion.div
                className="absolute -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                animate={{
                  scale: isHoveringLogo ? [1, 1.5, 1] : 1,
                  opacity: isHoveringLogo ? [0.6, 1, 0.6] : 0.6,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo text with gradient animation */}
              <motion.span
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent bg-size-200"
                animate={{
                  backgroundPosition: isHoveringLogo ? "100% center" : "0% center",
                }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                {'<'}Sourav Bhukta {'/>'}
              </motion.span>

              {/* Animated cursor follower */}
              {isHoveringLogo && (
                <motion.div
                  className="absolute -right-3 top-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-pink-400 rounded-full"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ 
                    opacity: [0.5, 1, 0.5], 
                    scaleY: [0.5, 1, 0.5],
                    y: ["-50%", "-50%", "-50%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex space-x-1 bg-gray-900/30 backdrop-blur-sm rounded-2xl p-1 border border-gray-800/50"
            >
              {navLinks.map(({ link, name }) => (
                <motion.li
                  key={name}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={link}
                    className={`relative z-10 px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl block ${
                      location.pathname === link
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{name}</span>
                    
                    {/* Interactive background */}
                    {hoveredLink === name && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-xl z-0 border border-indigo-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    
                    {/* Active indicator with glow effect */}
                    {location.pathname === link && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-pink-500/30 to-indigo-500/30 rounded-xl z-0"
                          layoutId="activeNav"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 blur-sm rounded-xl"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </>
                    )}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {!loading && user ? (
              <>
                {/* Dashboard button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/dashboard")}
                  className="hidden md:flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow relative group overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    Dashboard
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </motion.button>

                {/* Logout button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(239, 68, 68, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden md:flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-gray-300 border border-gray-700 hover:border-red-500/50 hover:text-white transition-all relative group"
                >
                  <span className="relative flex items-center gap-2">
                    Logout
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 180, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </motion.svg>
                  </span>
                </motion.button>

                {/* User avatar for mobile */}
                <div className="md:hidden relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/dashboard")}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="hidden md:flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Login
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ 
                      x: [0, 2, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </motion.svg>
                </span>
              </motion.button>
            )}

            {/* Mobile menu button with enhanced animation */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/30 transition-colors"
            >
              {/* Animated hamburger icon */}
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute top-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.span
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    scaleX: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200 
              }}
              className="fixed top-0 left-0 w-80 h-full z-50 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl border-r border-gray-800"
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500" />
              
              <div className="flex flex-col h-full pt-6 pb-8">
                {/* Header with logo */}
                <div className="px-6 mb-8">
                  <div className="flex items-center justify-between">
                    <motion.a
                      href="/"
                      className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      Sourav Bhukta
                    </motion.a>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {user && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name || "User"}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3">
                  <div className="space-y-1">
                    {navLinks.map(({ link, name }, index) => (
                      <motion.a
                        key={name}
                        href={link}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl mx-2 text-base font-medium transition-all ${
                          location.pathname === link
                            ? "bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-white border border-indigo-500/30"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                      >
                        {name}
                        {location.pathname === link && (
                          <motion.div
                            className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Auth Buttons */}
                <div className="px-6 pt-6 border-t border-gray-800/50">
                  {!loading && user ? (
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate("/dashboard");
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium shadow-lg"
                      >
                        Dashboard
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full py-3 rounded-xl bg-gray-800 text-gray-300 font-medium border border-gray-700"
                      >
                        Logout
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/login");
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium shadow-lg"
                    >
                      Sign In
                    </motion.button>
                  )}
                  
                  {/* Footer note */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center text-xs text-gray-500"
                  >
                    © {new Date().getFullYear()} Sourav Bhukta
                  </motion.p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;