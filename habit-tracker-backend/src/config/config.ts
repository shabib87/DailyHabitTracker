import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbPath: process.env.DB_PATH || './data/db.sqlite',
  dbUsername: process.env.DB_USER_NAME || 'habit_tracker',
  dbPassword: process.env.DB_PASSWORD || 'habit_tracker',
  dbName: process.env.DB_NAME || 'habit_tracker',
};
