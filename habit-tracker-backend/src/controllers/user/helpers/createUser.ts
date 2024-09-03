import { Response } from 'express';
import { JWTPayloadDTO } from '../../../dto/jwt.payload.dto';
import { userRepository } from '../../../repositories/userRepository';
import { APIRequest } from '../../../utils/APIRequest';
import { encrypt } from '../../../utils/encrypt';
import { validateSignup } from '../../../utils/validateSignup';

export async function createUser(req: APIRequest, res: Response) {
  const { email, username, password } = req.body;

  // Validate user input
  const { error } = validateSignup(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Check if user already exists
    const existingUser = await userRepository.readUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await encrypt.encryptPass(password);

    // Create new user
    const newUser = await userRepository.createUser({
      email,
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload: JWTPayloadDTO = { id: newUser.id };
    const { token, expiresAt } = encrypt.generateToken(payload);

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      jwt: {
        token,
        expiresAt,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
