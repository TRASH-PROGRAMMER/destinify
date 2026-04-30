import { PgUserRepository } from "../../infrastructure/repositories/PgUserRepository";
import { User } from "../entities/User";
// definicion de la clase UseCase
export class GetAllUsersUseCase {
  constructor(private readonly UserRepository: PgUserRepository) {}
  // metodo para obtener todos los usuarios
  async execute(): Promise<User[]> {
    return  await this.UserRepository.findAll();
  }
}
// exportacion de la clase UseCase
export default GetAllUsersUseCase;
