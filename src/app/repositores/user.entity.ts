import { UserRole } from './user.entity.roles';

export type User = {
  id: number;
  firstname: string;
  username: string;
  password: string;
  role: UserRole;
};
