import { DataSource } from 'typeorm';
import { config } from './config';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: config.dbPath,
  synchronize: true, // This will auto-create the database schema on every application launch.
  logging: false, // Set to true to enable query logging.
  entities: [__dirname + '/../entities/*.ts'],
  migrations: [__dirname + '/../migrations/*.ts'],
});
