import express from 'express';
import { config } from '../config/config';
import { setupRoutes } from './router';

const app = express();
const port = config.port;

export function startServer() {
  setupRoutes(app);
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
