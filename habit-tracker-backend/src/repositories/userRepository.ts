import { Repository } from 'typeorm';
import { dataSource } from '../config/typeorm.config';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/User';

interface UserRepository {
  createUser: (userDTO: UserDTO) => Promise<User>;
  readAllUsers: (page: number, limit: number) => Promise<User[]>;
  readUserById: (id: string) => Promise<User | null>;
  readUserByEmail: (email: string) => Promise<User | null>;
  updateUser: (id: string, userDTO: UserDTO) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
}

const repository: Repository<User> = dataSource.getRepository(User);

export const userRepository: UserRepository = {
  async createUser(userDTO: UserDTO): Promise<User> {
    const user = repository.create(userDTO);
    return repository.save(user);
  },
  async readAllUsers(page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit;
    return repository.find({
      skip: offset,
      take: limit,
    });
  },
  async readUserById(id: string): Promise<User | null> {
    return repository.findOneBy({ id });
  },
  async readUserByEmail(email: string): Promise<User | null> {
    return repository.findOneBy({ email });
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
