import mongoose from 'mongoose';
import log from 'node:console';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mongo';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    log.info({message: 'MongoDB connected with success!'})
  } catch (error) {
    log.error({
      message: 'Error on connecting to MongoDB:',
      'error': error
    });
    process.exit(1);
  }
};