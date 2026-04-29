import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";
// definicion de la clase UseCase
export class CreateUserUseCase {
  constructor(private repo: UserRepository) {}
  // metodo para crear usuario
  async execute(data: User): Promise<User> {
    return await this.repo.create(data);
  }
}
export default CreateUserUseCase;