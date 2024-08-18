import { initializeDatabase } from './bootstrap/database';
import { startServer } from './bootstrap/server';

async function startApplication() {
  try {
    await initializeDatabase();
    startServer();
  } catch (error) {
    console.error('Failed to start application', error);
  }
}

startApplication();
