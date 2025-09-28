
import {createServer} from './server'
import config from './config'
import connectDb from './database/db'
import logger from './logger'


const startServer = async () => {
  try {
    // Initialize database connection
    await connectDb();
    // Create Express server
    const server = createServer();

    // Start server
    const httpServer = server.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`Database: ${config.dbUrl.replace(/\/\/.*@/, '//***:***@')}`);
    });


    // Handle unhandled rejections
    process.on('unhandledRejection', (err: Error) => {
      logger.error(`Unhandled Rejection: ${err.message}`);
      httpServer.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
      logger.error(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};


startServer()