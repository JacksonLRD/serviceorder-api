import { RoleEnum } from '../../Enums/RoleEnum';

export default interface TokenPayLoad {
  id: string;
  name: string;
  active: boolean;
  role: RoleEnum;
}
