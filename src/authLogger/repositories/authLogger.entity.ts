import { User } from '@prisma/client';

export type AuthLogger = {
  id: number;
  user: User;
  userId: number;
  username: string;
  time: Date;
};
