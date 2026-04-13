const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/products');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trendywear';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for seeding');
    try {
      await Product.deleteMany();
      await User.deleteMany();
      console.log('Existing data removed');
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);

      const adminUser = {
        name: 'Admin Trendy',
        email: 'admin@trendywear.com',
        password: hashedPassword,
        isAdmin: true
      };

      await User.create(adminUser);
      console.log('Admin user injected');

      await Product.insertMany(products);
      console.log('Products successfully inserted');
      
      process.exit();
    } catch (error) {
      console.error('Error with data imported!', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
