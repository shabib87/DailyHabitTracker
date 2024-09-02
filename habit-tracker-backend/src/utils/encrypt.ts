import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserDTO } from '../dto/user.dto';

dotenv.config();
const { JWT_SECRET = '' } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const Encrypt = {
  async encryptPass(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  },

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  },

  generateToken(payload: UserDTO): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  },
};
