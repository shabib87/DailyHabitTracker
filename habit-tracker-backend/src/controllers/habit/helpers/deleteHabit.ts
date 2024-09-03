import { Response } from 'express';
import { habitRepository } from '../../../repositories/habitRepository';
import { APIRequest } from '../../../utils/APIRequest';

export async function deleteHabit(req: APIRequest, res: Response) {
  const habitId = req.params.id;
  const currentUser = req.currentUser;

  if (!currentUser || typeof currentUser !== 'string') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const deleted = await habitRepository.deleteHabit(currentUser, habitId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
