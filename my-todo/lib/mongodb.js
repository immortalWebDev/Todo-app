import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please provide valid mongodb string');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // console.log('Connecting to database...'); 

  if (cached.conn) {
    // console.log('Returning existing connectx...',mongoose.connection.db.databaseName);
    return cached.conn;
  }

  if (!cached.promise) {
    // console.log('Creating new connection...');
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      // console.log('Connected to database:', mongoose.connection.db.databaseName); // Log database name
      return mongoose;
    }).catch(error => {
      // console.error('Error connecting to MongoDB:', error);
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;