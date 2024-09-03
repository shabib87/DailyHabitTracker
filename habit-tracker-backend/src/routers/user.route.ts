import { Router } from 'express';
import { userController } from '../controllers/user/userController';
import { verifyAuthToken } from '../middlewares/auth.middleware';

export const userRouter = Router();

// Login user
userRouter.post('/login', userController.login);

// Create a new user (signup)
userRouter.post('/signup', userController.create);

// Get all users with pagination
userRouter.get('/users', verifyAuthToken, userController.readAll);

// Get a single user by ID
userRouter.get('/users/:id', verifyAuthToken, userController.readOne);

// Update a user by ID
userRouter.put('/users/:id', verifyAuthToken, userController.update);

// Delete a user by ID
userRouter.delete('/users/:id', verifyAuthToken, userController.delete);
