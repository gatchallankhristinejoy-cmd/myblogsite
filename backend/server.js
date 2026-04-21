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

// ✅ FIX FOR WebAssembly MIME TYPE ERROR
// Ito ang magsa-solve ng 'application/wasm' MIME type error
app.use((req, res, next) => {
    if (req.url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
    next();
});

// Static folder para sa mga uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Para sa mga static files (JS, CSS, WASM) kung meron
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
        }
    }
}));

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
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});