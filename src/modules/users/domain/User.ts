import { RoleEnum } from '../Enums/RoleEnum';

export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public active?: boolean,
    public role?: RoleEnum,
    public id?: string,
    public createdAt?: string,
    public updatedAt?: string
  ) {}
}
