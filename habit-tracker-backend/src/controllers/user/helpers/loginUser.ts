import { Response } from 'express';
import { userRepository } from '../../../repositories/userRepository';
import { APIRequest } from '../../../utils/APIRequest';
import { encrypt } from '../../../utils/encrypt';
import { validateLogin } from '../../../utils/validateLogin';

export async function loginUser(req: APIRequest, res: Response) {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await userRepository.readUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await encrypt.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const { token, expiresAt } = encrypt.generateToken({ id: user.id });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      jwt: {
        token,
        expiresAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
