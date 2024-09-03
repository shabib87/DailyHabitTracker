import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { JWTPayloadDTO } from '../dto/jwt.payload.dto';

dotenv.config();
const { JWT_SECRET = '' } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const encrypt = {
  async encryptPass(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  },

  generateToken(payload: JWTPayloadDTO): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  },
};
