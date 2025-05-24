const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // عدل المسار حسب مشروعك

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/kemetdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = 'admin';
    const password = 'kemet@2052001';

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log('Admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
