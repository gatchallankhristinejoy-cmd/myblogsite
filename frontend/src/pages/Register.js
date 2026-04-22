// frontend/src/pages/Register.js (Palitan ito ng buo)
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    terms: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const fieldName = id || name;
    setFormData({
      ...formData,
      [fieldName]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    // Name check
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    // Email check
    if (!formData.email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }

    // Password check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Confirm Password check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Age check (18+)
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setError("You must be at least 18 years old");
        return false;
      }
    }

    // Terms check
    if (!formData.terms) {
      setError("You must agree to the terms");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // ✅ ITO ANG IMPORTANTE - Tumatawag na sa backend!
      const { data } = await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // I-save ang token at mag-redirect
      localStorage.setItem('token', data.token);
      navigate('/');
      
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="form-container">
        <h2>Create an Account</h2>
        <p>Sign up to receive music updates and playlists.</p>

        {error && <div className="error-msg" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <label>Full Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <label>Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* BIRTHDATE */}
          <label>Birthdate:</label>
          <input 
            type="date" 
            id="dob" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <label>Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* CONFIRM PASSWORD */}
          <label>Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* TERMS */}
          <div style={{ marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="terms" 
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              style={{ width: 'auto', marginRight: '10px' }}
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px' }}>
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <p style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;