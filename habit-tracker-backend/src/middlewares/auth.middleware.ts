import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { APIRequest } from '../utils/APIRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const isAuthenticated = async (
  req: APIRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check if the authorization header is valid
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Access denied' });
    }
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Store the decoded user information in the request object
    req.currentUser = decoded;

    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
