require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const path = require('path');
const { connectDB } = require('./config/db'); // Use braces to match your db.js

// Import routes
const authRoutes = require('./routes/auth.routes'); 
const postRoutes = require('./routes/post.routes'); 
const commentRoutes = require('./routes/comment.routes'); 
const adminRoutes = require('./routes/admin.routes');

const app = express(); // This is line 12 now, express is defined above

connectDB(); 

// -- Middleware --
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://[::1]:3000',
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -- Routes --
app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 
app.use('/api/admin', adminRoutes);

// -- Start Server --
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});