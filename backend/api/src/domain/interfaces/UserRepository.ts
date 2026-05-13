import { User } from "../entities/User";
// definicion de la interfaz para el repositorio
export interface UserRepository {
  // metodo para crear usuario
  create(user: User): Promise<User>;
  // metodo para obtener todos los usuarios
  findAll(): Promise<User[]>;
}