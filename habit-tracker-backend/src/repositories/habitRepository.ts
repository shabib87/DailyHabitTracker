import { Repository } from 'typeorm';
import { dataSource } from '../config/typeorm.config';
import { HabitDTO } from '../dto/habit.dto';
import { Habit } from '../entities/Habit';

interface HabitRepository {
  createHabit: (habitDTO: HabitDTO) => Promise<Habit>;
  readAllHabits: (
    userId: string,
    page: number,
    limit: number,
  ) => Promise<Habit[]>;
  readHabitById: (userId: string, id: string) => Promise<Habit | null>;
  updateHabit: (
    userId: string,
    id: string,
    habitDTO: HabitDTO,
  ) => Promise<Habit | null>;
  deleteHabit: (userId: string, id: string) => Promise<boolean>;
}

const repository: Repository<Habit> = dataSource.getRepository(Habit);

export const habitRepository: HabitRepository = {
  async createHabit(habitDTO: HabitDTO): Promise<Habit> {
    const habit = repository.create(habitDTO);
    return repository.save(habit);
  },
  async readAllHabits(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Habit[]> {
    const offset = (page - 1) * limit;
    return repository.find({
      where: { user: { id: userId } },
      skip: offset,
      take: limit,
    });
  },
  async readHabitById(userId: string, id: string): Promise<Habit | null> {
    return repository.findOne({
      where: { id, user: { id: userId } },
    });
  },
  async updateHabit(
    userId: string,
    id: string,
    habitDTO: HabitDTO,
  ): Promise<Habit | null> {
    const habit = await repository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!habit) {
      return null;
    }
    repository.merge(habit, habitDTO);
    return repository.save(habit);
  },
  async deleteHabit(userId: string, id: string): Promise<boolean> {
    const result = await repository.delete({
      id,
      user: { id: userId },
    });
    return result.affected !== 0;
  },
};
