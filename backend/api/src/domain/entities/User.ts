export class User {
  constructor(
    public email: string, 
    public password_hash: string,
    public id?: number,
    public name?: string,
    public lastname?: string,
    public phone?: string,
    public avatar_url?: string,
    public country?: string,
    public preferred_language?: string,
    public timezone?: string,
    public status?: string,
    public last_login?: Date,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}

export type CreateUserDTO = {
  email: string;
  password_hash: string;
  name?: string;
  lastname?: string;
};

export type UpdateUserDTO = {
  name?: string;
  lastname?: string;
  phone?: string;
  avatar_url?: string;
  country?: string;
  preferred_language?: string;
  timezone?: string;
  status?: string;
  last_login?: Date;
};