import { Router } from 'express';
import { userController } from '../controllers/userController';

export const userRouter = Router();

// Get all users with pagination
userRouter.get('/users', userController.findAll);

// Create a new user
userRouter.post('/users', userController.create);

// Get a single user by ID
userRouter.get('/users/:id', userController.findOne);

// Update a user by ID
userRouter.put('/users/:id', userController.update);

// Delete a user by ID
userRouter.delete('/users/:id', userController.delete);
