import { RoleEnum } from '../../Enums/RoleEnum';

export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: RoleEnum;
  active?: boolean;
}
