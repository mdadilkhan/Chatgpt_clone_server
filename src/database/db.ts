import mongoose from "mongoose";
import config from "../config";
import logger from "../logger";
const MAX_RETRY_ATTEMPTS = 5;
const RETRY_DELAY_MS = 5000;

const connectDb = async (retryCount = 0): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.dbUrl, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
    });
    logger.info('✅ Database connected successfully');

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      logger.info('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected from DB');
    });


  } catch (error) {
    if (retryCount < MAX_RETRY_ATTEMPTS - 1) {
      logger.warn(`Retrying database connection (attempt ${retryCount + 1})...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDb(retryCount + 1);
    }
    logger.error('❌ Failed to connect to database after retries:', error);
    process.exit(1);
  }
};


// Graceful shutdown handler
const shutdown = async (): Promise<void> => {
  await mongoose.connection.close();
  logger.info('Mongoose connection closed through app termination');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default connectDb;
