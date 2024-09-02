import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { dataSource } from '../config/typeorm.config';
import { UserDTO } from '../dto/user.dto';

interface UserRepository {
  findAllUsers: (page: number, limit: number) => Promise<User[]>;
  createUser: (userDTO: UserDTO) => Promise<User>;
  findUserById: (id: string) => Promise<User | null>;
  updateUser: (id: string, userDTO: UserDTO) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
}

const repository: Repository<User> = dataSource.getRepository(User);

export const userRepository: UserRepository = {
  async findAllUsers(page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit;
    return repository.find({
      skip: offset,
      take: limit,
    });
  },

  async createUser(userDTO: UserDTO): Promise<User> {
    const user = repository.create(userDTO);
    return repository.save(user);
  },

  async findUserById(id: string): Promise<User | null> {
    return repository.findOneBy({ id });
  },

  async updateUser(id: string, userDTO: UserDTO): Promise<User | null> {
    const user = await repository.findOneBy({ id });
    if (!user) {
      return null;
    }
    repository.merge(user, userDTO);
    return repository.save(user);
  },

  async deleteUser(id: string): Promise<boolean> {
    const result = await repository.delete(id);
    return result.affected !== 0;
  },
};
