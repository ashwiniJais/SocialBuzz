const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/SocialBuzz_dev');

const mongoAtlasUri = process.env.MONGO_URI;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(' Mongoose is connected')
  );
} catch (e) {
  console.log('could not connect');
}

//   const db = mongoose.connection;
const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

// db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

// db.once('open', function () {
//   console.log('Successfully connected to MongoDB');
// });

module.exports = dbConnection;
