export class User {
  constructor(
    public id_user: number,
    public email: string, 
    public password: string,
    public createdAt: Date) {}
}

export type CreateUserDTO = {
  email: string;
  password: string;
  createdAt: Date;
};
export type UpdateUserDTO = {
  email?: string;
  password?: string;
  createdAt?: Date;
};