require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// 1. Define default admin credentials (customize these)
const DEFAULT_ADMIN = {
  name: "Admin",
  email: "newadmin@gmail.com",  // Change this!
  password: "admin123@123",       // Change this!
  profileImageUrl: "/uploads/admin-default.png", // Path to your admin photo
  role: "admin"
};

// 2. Connect to DB and create admin
async function setupAdmin() {
  try {
    // Use your existing MongoDB connection from .env
    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log(' Admin already exists:', adminExists.email);
      return;
    }

    // Hash password and create admin
    DEFAULT_ADMIN.password = await bcrypt.hash(DEFAULT_ADMIN.password, 12);
    await User.create(DEFAULT_ADMIN);
    console.log('Default admin created:', DEFAULT_ADMIN.email);

  } catch (error) {
    console.error(' Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

// 3. Run the script
setupAdmin();