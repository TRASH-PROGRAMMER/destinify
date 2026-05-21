import { UserRepository } from './../interfaces/UserRepository';
import { User } from "../entities/User";
// definicion de la clase UseCase
export class GetAllUsersUseCase {
  constructor(private readonly repository: UserRepository) {}
  // metodo para obtener todos los usuarios
  async execute(): Promise<User[]> {
    return  await this.repository.findAll();
  }
}
// exportacion de la clase UseCase
export default GetAllUsersUseCase;
