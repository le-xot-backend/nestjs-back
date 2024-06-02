import { User } from './user.entity';
import { UserRole } from './user.entity.roles';

export const UsersInjectSymbol = Symbol();

export interface UsersRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  deleteUser(username: string): Promise<void>;
  findAll(): Promise<User[]>;
  deleteAll(role?: UserRole): Promise<void>;
}
