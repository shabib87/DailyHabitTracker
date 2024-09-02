import { Request, Response } from 'express';

export interface UserController {
  findAll: (req: Request, res: Response) => void;
}

export const userController: UserController = {
  async findAll(req: Request, res: Response) {
    res.send('Hello, user!');
  },
};
