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

// ✅ PINAKA-SIMPLE AT PERMISSIVE CORS - PARA LANG SA TESTING
app.use(cors({
    origin: '*',  // Payagan lahat ng domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false  // Dahil naka '*' ang origin, dapat false ang credentials
}));

// O kaya ganito para sa credentials
// app.use(cors({
//     origin: 'https://myblogsite-widi.vercel.app',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

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