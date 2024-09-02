import { Response } from 'express';
import { HabitDTO } from '../dto/habit.dto';
import { habitRepository } from '../repositories/habitRepository';
import { APIRequest } from '../utils/APIRequest';

interface HabitController {
  findAll: (req: APIRequest, res: Response) => void;
  create: (req: APIRequest, res: Response) => void;
  findOne: (req: APIRequest, res: Response) => void;
  update: (req: APIRequest, res: Response) => void;
  delete: (req: APIRequest, res: Response) => void;
}

export const habitController: HabitController = {
  async findAll(req: APIRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const currentUser = req.currentUser;

    if (!currentUser || typeof currentUser !== 'string') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const habits = await habitRepository.findAllHabits(
        currentUser,
        page,
        limit,
      );
      res.json(habits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async create(req: APIRequest, res: Response) {
    const habitDTO: HabitDTO = req.body;

    try {
      const newHabit = await habitRepository.createHabit(habitDTO);
      res.status(201).json(newHabit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async findOne(req: APIRequest, res: Response) {
    const habitId = req.params.id;

    try {
      const habit = await habitRepository.findHabitById(habitId);
      if (habit) {
        res.json(habit);
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async update(req: APIRequest, res: Response) {
    const habitId = req.params.id;
    const habitDTO: HabitDTO = req.body;

    try {
      const updatedHabit = await habitRepository.updateHabit(habitId, habitDTO);
      if (updatedHabit) {
        res.json(updatedHabit);
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async delete(req: APIRequest, res: Response) {
    const habitId = req.params.id;

    try {
      const deleted = await habitRepository.deleteHabit(habitId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Habit not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
