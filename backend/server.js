require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const path = require('path');
const { connectDB } = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes'); 
const postRoutes = require('./routes/post.routes'); 
const commentRoutes = require('./routes/comment.routes'); 
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Connect to MongoDB
connectDB(); 

// -- Middleware --
// Sa deployment, mas safe na gamitin ang origin: true o ang specific Vercel URL mo mamaya
app.use(cors({
  origin: ["https://myblogsite-widi.vercel.app", "http://localhost:5173"], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

// Static folder para sa mga uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -- Routes --
app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 
app.use('/api/admin', adminRoutes);

// Test Route para malaman kung working ang backend
app.get('/', (req, res) => {
  res.send('TheFolio API is running...');
});

// -- Start Server --
// Importante: Gamitin ang process.env.PORT para sa Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
});