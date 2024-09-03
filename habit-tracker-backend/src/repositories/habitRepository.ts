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
  readHabitById: (id: string) => Promise<Habit | null>;
  updateHabit: (id: string, habitDTO: HabitDTO) => Promise<Habit | null>;
  deleteHabit: (id: string) => Promise<boolean>;
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
  async readHabitById(id: string): Promise<Habit | null> {
    return repository.findOneBy({ id });
  },
  async updateHabit(id: string, habitDTO: HabitDTO): Promise<Habit | null> {
    const habit = await repository.findOneBy({ id });
    if (!habit) {
      return null;
    }
    repository.merge(habit, habitDTO);
    return repository.save(habit);
  },
  async deleteHabit(id: string): Promise<boolean> {
    const result = await repository.delete(id);
    return result.affected !== 0;
  },
};
