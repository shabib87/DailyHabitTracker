import { Response } from 'express';
import { UserDTO } from '../../../dto/user.dto';
import { userRepository } from '../../../repositories/userRepository';
import { APIRequest } from '../../../utils/APIRequest';

export async function updateUser(req: APIRequest, res: Response) {
  const userId = req.params.id;
  const userDTO: UserDTO = req.body;

  try {
    const updatedUser = await userRepository.updateUser(userId, userDTO);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
