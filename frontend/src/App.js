import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';

// Public pages
import Splash from './pages/Splash';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Protected pages
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

// 👇 ADD GAMES
import Games from './pages/Games';

// Protected route
import ProtectedRoute from './components/ProtectedRoute';

// Auth context
import { useAuth } from './context/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
        
        {/* HEADER */}
        <header>
          <h1>Music World</h1>

          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {/* ✅ ALWAYS AVAILABLE */}
            <NavLink to="/games">Games</NavLink>

            {/* 👤 GUEST */}
            {!user && (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}

            {/* 👤 LOGGED IN */}
            {user && (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/create">New Post</NavLink>

                {/* 👑 ADMIN ONLY */}
                {user.role === 'admin' && (
                  <NavLink to="/admin">Admin</NavLink>
                )}

                <button onClick={logout}>Logout</button>
              </>
            )}
          </nav>

          <button onClick={toggleDarkMode} className="dark-toggle">
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* MAIN */}
        <main>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts/:id" element={<PostPage />} />

            {/* ✅ GAMES (PUBLIC OR PROTECTED - pili ka) */}
            <Route path="/games" element={<Games />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-post/:id"
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer>
          <p>© {new Date().getFullYear()} Music World.</p>
        </footer>

      </div>
    </Router>
  );
}

export default App;