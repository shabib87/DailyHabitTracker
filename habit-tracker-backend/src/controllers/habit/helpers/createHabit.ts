import { Response } from 'express';
import { HabitDTO } from '../../../dto/habit.dto';
import { habitRepository } from '../../../repositories/habitRepository';
import { APIRequest } from '../../../utils/APIRequest';

export async function createHabit(req: APIRequest, res: Response) {
  const habitDTO: HabitDTO = req.body;

  try {
    const newHabit = await habitRepository.createHabit(habitDTO);
    res.status(201).json(newHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
