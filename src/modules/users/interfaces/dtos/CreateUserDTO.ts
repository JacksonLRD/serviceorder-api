export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'TECHNICIAN';
  active?: boolean;
}
