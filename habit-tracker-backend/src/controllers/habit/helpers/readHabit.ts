import { Response } from 'express';
import { habitRepository } from '../../../repositories/habitRepository';
import { APIRequest } from '../../../utils/APIRequest';

export const readHabit = {
  async readAll(req: APIRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const currentUser = req.currentUser;

    if (!currentUser || typeof currentUser !== 'string') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const habits = await habitRepository.readAllHabits(
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
  async readOne(req: APIRequest, res: Response) {
    const habitId = req.params.id;
    const currentUser = req.currentUser;

    if (!currentUser || typeof currentUser !== 'string') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const habit = await habitRepository.readHabitById(currentUser, habitId);
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
};
