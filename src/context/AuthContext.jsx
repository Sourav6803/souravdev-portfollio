import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../services/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user data
  const [loading, setLoading] = useState(true); // for initial load

  // console.log('AuthProvider rendered', user);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/getUser'); // backend reads cookie
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // runs once when app mounts
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
