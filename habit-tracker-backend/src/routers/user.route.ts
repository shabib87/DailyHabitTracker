import { Router } from 'express';
import { userController } from '../controllers/user/userController';
import { isAuthenticated } from '../middlewares/auth.middleware';

export const userRouter = Router();

// Create a new user (signup)
userRouter.post('/signup', userController.create);

// Get all users with pagination
userRouter.get('/users', isAuthenticated, userController.readAll);

// Get a single user by ID
userRouter.get('/users/:id', isAuthenticated, userController.readOne);

// Update a user by ID
userRouter.put('/users/:id', isAuthenticated, userController.update);

// Delete a user by ID
userRouter.delete('/users/:id', isAuthenticated, userController.delete);
