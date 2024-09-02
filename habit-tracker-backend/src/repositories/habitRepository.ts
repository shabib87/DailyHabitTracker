import { Repository } from 'typeorm';
import { Habit } from '../entities/Habit';
import { dataSource } from '../config/typeorm.config';
import { HabitDTO } from '../dto/habit.dto';

interface HabitRepository {
  findAllHabits: (
    userId: string,
    page: number,
    limit: number,
  ) => Promise<Habit[]>;
  createHabit: (habitDTO: HabitDTO) => Promise<Habit>;
  findHabitById: (id: string) => Promise<Habit | null>;
  updateHabit: (id: string, habitDTO: HabitDTO) => Promise<Habit | null>;
  deleteHabit: (id: string) => Promise<boolean>;
}

const repository: Repository<Habit> = dataSource.getRepository(Habit);

export const habitRepository: HabitRepository = {
  async findAllHabits(
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

  async createHabit(habitDTO: HabitDTO): Promise<Habit> {
    const habit = repository.create(habitDTO);
    return repository.save(habit);
  },

  async findHabitById(id: string): Promise<Habit | null> {
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
