import { Response } from 'express';
import { userRepository } from '../../../repositories/userRepository';
import { APIRequest } from '../../../utils/APIRequest';

export async function deleteUser(
  req: APIRequest,
  res: Response,
): Promise<void> {
  const userId = req.params.id;

  try {
    const deleted = await userRepository.deleteUser(userId);
    if (deleted) {
      res.status(204).json({ success: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
