import { Role } from '@/constants';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}
