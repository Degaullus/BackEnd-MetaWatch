import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to database: ${conn.connection.db.databaseName}`);
    // Here
  }
  catch (error) {
    if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
    process.exit(1);
  }
};

export { connectDB };