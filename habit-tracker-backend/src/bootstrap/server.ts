import express from 'express';
import { config } from '../config/config';

const app = express();
const port = config.port;

export function startServer() {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
