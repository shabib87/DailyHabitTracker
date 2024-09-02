import express from 'express';
import { config } from '../config/config';
import { userRouter } from '../routers/user.route';

const app = express();
const port = config.port;

function setupRoutes() {
  app.use(express.json());
  app.use('/api', userRouter);
}

export function startServer() {
  setupRoutes();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
