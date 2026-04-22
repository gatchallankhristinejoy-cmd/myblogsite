const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ✅ Gamitin ang TAMANG pangalan ng environment variable
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined!');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1); 
  }
};

module.exports = { connectDB };