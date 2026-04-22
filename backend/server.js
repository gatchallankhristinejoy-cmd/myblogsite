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

// ============================================
// ✅ ULTIMATE CORS FIX - ITO ANG GAMITIN MO
// ============================================
app.use((req, res, next) => {
    // Allow specific origin
    const allowedOrigins = ['https://myblogsite-widi.vercel.app', 'http://localhost:5173'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json());

// Static folder para sa mga uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -- Routes --
app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 
app.use('/api/admin', adminRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('TheFolio API is running...');
});

// -- Start Server --
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});