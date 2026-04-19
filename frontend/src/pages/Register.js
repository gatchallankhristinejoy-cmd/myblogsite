import React, { useState } from 'react';

const Register = () => {
  // 1. Dito itatago ang lahat ng data mula sa input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    terms: false
  });

  // 2. Dito itatago ang mga error messages
  const [errors, setErrors] = useState({});

  // Function para i-update ang state habang nagta-type ang user
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  // 3. Validation Logic
  const validateForm = (e) => {
    e.preventDefault(); // Iwasan ang pag-refresh ng page
    let tempErrors = {};
    let isValid = true;

    // Name check
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    // Email check
    if (!formData.email) {
  tempErrors.email = "Email is required";
  isValid = false;
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  tempErrors.email = "Invalid email format";
  isValid = false;
}

    // Password check (min 8 characters)
    if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm Password check
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Age check (Dapat 18 years old pataas)
    if (!formData.dob) {
      tempErrors.dob = "Birthdate is required";
      isValid = false;
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        tempErrors.dob = "You must be at least 18 years old.";
        isValid = false;
      }
    }

    // Terms check
    if (!formData.terms) {
      tempErrors.terms = "You must agree to the terms";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      alert("Registration Successful! Welcome to Music World.");
      console.log("User Data:", formData);
      // Dito mo pwedeng i-save ang data sa database sa future
    }
  };

  return (
    <section>
      <div className="form-container">
        <h2>Music Sign-Up</h2>
        <p>Sign up to receive music updates and playlists.</p>

        <form onSubmit={validateForm}>
          {/* --- NAME --- */}
          <label>Full Name:</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          {/* --- EMAIL --- */}
          <label>Email Address:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* --- BIRTHDATE --- */}
          <label>Birthdate:</label>
          <input 
            type="date" 
            id="dob" 
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}

          {/* --- PASSWORD --- */}
          <label>Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          {/* --- CONFIRM PASSWORD --- */}
          <label>Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          {/* --- TERMS --- */}
          <div style={{ marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="terms" 
              checked={formData.terms}
              onChange={handleChange}
              style={{ width: 'auto', marginRight: '10px' }}
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>
          {errors.terms && <span className="error">{errors.terms}</span>}

          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>
            Register Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;