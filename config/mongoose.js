const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SocialBuzz_dev');

// const db = mongoose.connection;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error :${error.message}`);
    process.exit(1);
  }
};

// db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

// db.once('open', function () {
//   console.log('Successfully connected to MongoDB');
// });

module.exports = connectDB;
