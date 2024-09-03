import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface APIRequest extends Request {
  currentUser?: string | jwt.JwtPayload;
}
