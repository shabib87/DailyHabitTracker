import { Response } from 'express';
import { userRepository } from '../../../repositories/userRepository';
import { APIRequest } from '../../../utils/APIRequest';

export const readUser = {
  async readAll(req: APIRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const users = await userRepository.readAllUsers(page, limit);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async readOne(req: APIRequest, res: Response) {
    const userId = req.params.id;

    try {
      const user = await userRepository.readUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
