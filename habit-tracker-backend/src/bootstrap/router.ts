import express from 'express';
import { habitRouter } from '../routers/habit.route';
import { userRouter } from '../routers/user.route';

export function setupRoutes(app: express.Application) {
  app.use(express.json());
  app.use('/api', userRouter);
  app.use('/api', habitRouter);
}
