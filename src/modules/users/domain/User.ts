export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public active?: boolean,
    public role?: 'ADMIN' | 'TECHNICIAN',
    public id?: string,
    public createdAt?: string,
    public updatedAt?: string
  ) {}
}
