import { UserRol } from "../entities/User_Rol";
import { UserRolRepository } from "../interfaces/UserRolRepository";

export class CreateUserRolUseCase {
  constructor(private readonly repository: UserRolRepository) {}

  async execute(userRol: UserRol): Promise<UserRol> {
    return await this.repository.create(userRol);
  }
}

export default CreateUserRolUseCase;
