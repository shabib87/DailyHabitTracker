import { Response } from 'express';
import { APIRequest } from '../../utils/APIRequest';
import { createUser } from './helpers/createUser';
import { deleteUser } from './helpers/deleteUser';
import { loginUser } from './helpers/loginUser';
import { readUser } from './helpers/readUser';
import { updateUser } from './helpers/updateUser';

interface UserController {
  login: (req: APIRequest, res: Response) => void;
  create(req: APIRequest, res: Response): void;
  readAll: (req: APIRequest, res: Response) => void;
  readOne: (req: APIRequest, res: Response) => void;
  update: (req: APIRequest, res: Response) => void;
  delete: (req: APIRequest, res: Response) => void;
}

export const userController: UserController = {
  async login(req: APIRequest, res: Response) {
    loginUser(req, res);
  },
  async create(req: APIRequest, res: Response) {
    createUser(req, res);
  },
  async readAll(req: APIRequest, res: Response) {
    readUser.readAll(req, res);
  },
  async readOne(req: APIRequest, res: Response) {
    readUser.readOne(req, res);
  },
  async update(req: APIRequest, res: Response) {
    updateUser(req, res);
  },
  async delete(req: APIRequest, res: Response) {
    deleteUser(req, res);
  },
};
