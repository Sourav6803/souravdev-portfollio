// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// import {  useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../server";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from '../context/AuthContext';


// const Login = () => {
//   const { setUser } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);


// const handleSubmit = async (e) => {
  
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${server}/auth/login`,
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );
      
//       toast.success("Login success");
//       console.log("res.data", res.data);
//       setUser(res.data.user);
//       setLoading(false);
//       navigate("/", { replace: true }); // Added replace option
//       // window.location.reload(); // Removed the deprecated 'true' parameter
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//       setLoading(false);
//     }
//   };
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center py-6 sm:px-6 lg:px-8"
//       style={{
//         backgroundImage:
//           "url('https://media.istockphoto.com/id/1253357948/photo/yellow-school-supplies-on-black-board-background-flat-lay-top-view-copy-space-back-to-school.jpg?s=2048x2048&w=is&k=20&c=bhZECuTQQ9ftg_whPEsf1CClzvclT335X1F9nNk5f4o=')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {loading ? (
//         <div className="flex items-center justify-center h-screen w-full">
//           {/* <Loader /> */}
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden sm:max-w-md sm:w-full">
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-pink-500 opacity-80"></div>
//             <div className="relative p-4">
//               <h2 className="text-center text-2xl font-extrabold text-white">
//                 Welcome to Sourav Portfolio
//               </h2>
//             </div>
//           </div>
//           <div className="px-8 py-6">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     type={visible ? "text" : "password"}
//                     name="password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   {visible ? (
//                     <AiOutlineEye
//                       className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                       size={25}
//                       onClick={() => setVisible(false)}
//                     />
//                   ) : (
//                     <AiOutlineEyeInvisible
//                       className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                       size={25}
//                       onClick={() => setVisible(true)}
//                     />
//                   )}
//                 </div>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="remember-me"
//                     id="remember-me"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-2 mt-2 block text-sm text-gray-900"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <a
//                     href="/forgot-password"
//                     className="font-medium text-blue-600 hover:text-blue-500"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full h-[45px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//                 >
//                   Login
//                 </button>
//               </div>


//               <div className="flex items-center justify-between">
//                 <h4 className="text-sm text-gray-700">
//                   Don't have an account?
//                 </h4>
//                 {/* <Link
//                   to="/sign-up"
//                   className="text-pink-600 hover:text-pink-700 pl-2 font-medium text-sm"
//                 >
//                   Create Account
//                 </Link> */}
//               </div>

//               <h5 className="text-center pt-4 text-sm text-gray-700">
//                 Or Join with
//               </h5>
//               <div className="flex justify-center items-center text-lg mt-4 space-x-4">
//                 {/* <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} /> */}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiGithub, FiTwitter, FiLinkedin, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Password strength calculator
  useEffect(() => {
    if (activeTab === "register" && formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 1;
      if (/[A-Z]/.test(formData.password)) strength += 1;
      if (/[0-9]/.test(formData.password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
      setPasswordStrength(strength);
    }
  }, [formData.password, activeTab]);

  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === "login") {
      if (!email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
      
      if (!password) newErrors.password = "Password is required";
    } else {
      if (!formData.name) newErrors.name = "Name is required";
      
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${server}/auth/login`, { email, password }, { withCredentials: true });
      setUser(data.user);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setErrors({
        ...errors,
        server: error.response?.data?.message || "Invalid credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${server}/auth/register`, formData, { withCredentials: true });
      setUser(data.user);
      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      setErrors({
        ...errors,
        server: error.response?.data?.message || "Registration failed"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.open(`${server}/auth/${provider}`, "_self");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === "login" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === "register" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`}
            >
              Register
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400">
                {activeTab === "login" 
                  ? "Sign in to access your dashboard" 
                  : "Get started with your portfolio"}
              </p>
            </div>

            {/* Server Error */}
            {errors.server && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 flex items-center gap-2"
              >
                <FiAlertCircle className="flex-shrink-0" />
                <span>{errors.server}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* Login Form */}
              {activeTab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                >
                  {/* Email Field */}
                  <div className="mb-5">
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <motion.span
                      animate={{ 
                        backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
                      }}
                      transition={{ duration: 0.5 }}
                      className="block"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </motion.span>
                  </button>
                </motion.form>
              ) : (
                /* Registration Form */
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegister}
                >
                  {/* Name Field */}
                  <div className="mb-5">
                    <label htmlFor="register-name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="register-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="mb-5">
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        id="register-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-5">
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                    
                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${
                                passwordStrength >= i
                                  ? i <= 2
                                    ? "bg-red-500"
                                    : i === 3
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-gray-600"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">
                          {passwordStrength === 0
                            ? "Very weak"
                            : passwordStrength === 1
                            ? "Weak"
                            : passwordStrength === 2
                            ? "Moderate"
                            : passwordStrength === 3
                            ? "Strong"
                            : "Very strong"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-6">
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        id="register-confirm-password"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.confirmPassword ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("github")}
                className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FiGithub className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("twitter")}
                className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FiTwitter className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("linkedin")}
                className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FiLinkedin className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {activeTab === "login" 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              {activeTab === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;