// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: if a token exists in localStorage, fetch the user's data
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token')) // remove bad token
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // login(): call the backend, save token, store user in state
  const login = async (email, password) => {
    console.log('🔐 Attempting login for:', email);
    const { data } = await API.post('/auth/login', { email, password });
    console.log('🔐 Login response received:', data.token ? 'Token present' : 'No token');
    localStorage.setItem('token', data.token);
    console.log('💾 Token saved to localStorage');
    setUser(data.user);
    console.log('👤 User set in state:', data.user.role);
    return data.user; // return user so caller can check role
  };

  // logout(): clear token and user from memory
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this instead of useContext(AuthContext)
export const useAuth = () => useContext(AuthContext);