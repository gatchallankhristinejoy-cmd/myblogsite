require('dotenv').config();
const { connectDB } = require('./config/db');
const User = require('./models/User');

const adminEmail = 'admin@thefolio.com';
const adminPassword = 'Admin@1234';

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    existing.password = adminPassword;
    existing.role = 'admin';
    existing.status = 'active';
    await existing.save();

    console.log(`Admin user already exists: ${adminEmail}`);
    console.log('Admin password has been reset to the current seed password.');
    console.log(`Password: ${adminPassword}`);
    process.exit(0);
  }

  const admin = await User.create({
    name: 'Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
    status: 'active',
  });

  console.log('Admin user created successfully.');
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${adminPassword}`);
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error('Failed to seed admin:', error.message);
  process.exit(1);
});
