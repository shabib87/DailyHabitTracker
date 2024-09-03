import 'reflect-metadata';
import { dataSource } from '../config/typeorm.config';

export async function initializeDatabase() {
  try {
    await dataSource.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}
