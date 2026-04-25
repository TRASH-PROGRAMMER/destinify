import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";

export class CreateUserUseCase {
  constructor(private repo: UserRepository) {}

  async execute(data: User): Promise<User> {
    return await this.repo.create(data);
  }
}