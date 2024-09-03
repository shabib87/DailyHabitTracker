import { Router } from 'express';
import { habitController } from '../controllers/habit/habitController';
import { isAuthenticated } from '../middlewares/auth.middleware';

export const habitRouter = Router();

// Get all habits with pagination
habitRouter.get('/habits', isAuthenticated, habitController.readAll);

// Create a new habit
habitRouter.post('/habits', isAuthenticated, habitController.create);

// Get a single habit by ID
habitRouter.get('/habits/:id', isAuthenticated, habitController.readOne);

// Update a habit by ID
habitRouter.put('/habits/:id', isAuthenticated, habitController.update);

// Delete a habit by ID
habitRouter.delete('/habits/:id', isAuthenticated, habitController.delete);
