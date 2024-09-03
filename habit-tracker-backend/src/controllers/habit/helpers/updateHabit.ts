import { Response } from 'express';
import { HabitDTO } from '../../../dto/habit.dto';
import { habitRepository } from '../../../repositories/habitRepository';
import { APIRequest } from '../../../utils/APIRequest';

export async function updateHabit(req: APIRequest, res: Response) {
  const habitId = req.params.id;
  const habitDTO: HabitDTO = req.body;
  const currentUser = req.currentUser;

  if (!currentUser || typeof currentUser !== 'string') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const updatedHabit = await habitRepository.updateHabit(
      currentUser,
      habitId,
      habitDTO,
    );
    if (updatedHabit) {
      res.json(updatedHabit);
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
