import { UserRol } from "../entities/User_Rol";
import { UserRolRepository } from "../interfaces/UserRolRepository";

export class GetAllUserRolUseCase {
  constructor(private readonly repository: UserRolRepository) {}

  async execute(): Promise<UserRol[]> {
    return await this.repository.findAll();
  }
}

export default GetAllUserRolUseCase;
