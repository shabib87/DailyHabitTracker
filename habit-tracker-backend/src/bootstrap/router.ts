import express from 'express';
import { userRouter } from '../routers/user.route';

export function setupRoutes(app: express.Application) {
  app.use(express.json());
  app.use('/api', userRouter);
}
