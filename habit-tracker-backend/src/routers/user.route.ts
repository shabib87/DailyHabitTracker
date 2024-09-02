import { Router } from 'express';
import { userController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/auth.middleware';

export const userRouter = Router();

// Get all users with pagination
userRouter.get('/users', isAuthenticated, userController.findAll);

// Create a new user
userRouter.post('/users', userController.create);

// Get a single user by ID
userRouter.get('/users/:id', isAuthenticated, userController.findOne);

// Update a user by ID
userRouter.put('/users/:id', isAuthenticated, userController.update);

// Delete a user by ID
userRouter.delete('/users/:id', isAuthenticated, userController.delete);
