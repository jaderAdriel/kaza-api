import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mongo';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected with success!');
  } catch (error) {
    console.error('Error on connecting to MongoDB:', error);
    process.exit(1);
  }
};