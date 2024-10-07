import { Role } from './role.interfaces'

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  state: string;
  google: string;
  img: string;
}
