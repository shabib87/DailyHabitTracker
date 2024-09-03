import { Router } from 'express';
import { habitController } from '../controllers/habit/habitController';
import { verifyAuthToken } from '../middlewares/auth.middleware';

export const habitRouter = Router();

// Get all habits with pagination
habitRouter.get('/habits', verifyAuthToken, habitController.readAll);

// Create a new habit
habitRouter.post('/habits', verifyAuthToken, habitController.create);

// Get a single habit by ID
habitRouter.get('/habits/:id', verifyAuthToken, habitController.readOne);

// Update a habit by ID
habitRouter.put('/habits/:id', verifyAuthToken, habitController.update);

// Delete a habit by ID
habitRouter.delete('/habits/:id', verifyAuthToken, habitController.delete);
