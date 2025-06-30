const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://atlas-sql-67cbe81811131b076c98b883-hc9ga.a.query.mongodb.net/auth-db?ssl=true&authSource=admin");
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
