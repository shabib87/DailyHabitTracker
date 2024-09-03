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

  generateToken(payload: JWTPayloadDTO): {
    token: string;
    expiresAt: number | undefined;
  } {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    const expiresAt = decodedToken.exp;
    return { token, expiresAt };
  },
};
