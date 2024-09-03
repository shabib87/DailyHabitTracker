import { Response } from 'express';
import { APIRequest } from '../../utils/APIRequest';
import { createHabit } from './helpers/createHabit';
import { deleteHabit } from './helpers/deleteHabit';
import { readHabit } from './helpers/readHabit';
import { updateHabit } from './helpers/updateHabit';

interface HabitController {
  create: (req: APIRequest, res: Response) => void;
  readAll: (req: APIRequest, res: Response) => void;
  readOne: (req: APIRequest, res: Response) => void;
  update: (req: APIRequest, res: Response) => void;
  delete: (req: APIRequest, res: Response) => void;
}

export const habitController: HabitController = {
  async create(req: APIRequest, res: Response) {
    createHabit(req, res);
  },
  async readAll(req: APIRequest, res: Response) {
    readHabit.readAll(req, res);
  },
  async readOne(req: APIRequest, res: Response) {
    readHabit.readOne(req, res);
  },
  async update(req: APIRequest, res: Response) {
    updateHabit(req, res);
  },
  async delete(req: APIRequest, res: Response) {
    deleteHabit(req, res);
  },
};
