import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { UserDTO } from '../dto/user.dto';

interface UserController {
  findAll: (req: Request, res: Response) => void;
  create: (req: Request, res: Response) => void;
  findOne: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  delete: (req: Request, res: Response) => void;
}

export const userController: UserController = {
  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const users = await userRepository.findAllUsers(page, limit);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async create(req: Request, res: Response) {
    const userDTO: UserDTO = req.body;

    try {
      const newUser = await userRepository.createUser(userDTO);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async findOne(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const user = await userRepository.findUserById(userId);
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

  async update(req: Request, res: Response) {
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
  },

  async delete(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const deleted = await userRepository.deleteUser(userId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
