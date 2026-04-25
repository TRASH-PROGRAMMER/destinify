export class User {
  constructor(public email: string, public password: string) {}
}

export type CreateUserDTO = {
  email: string;
  password: string;
};