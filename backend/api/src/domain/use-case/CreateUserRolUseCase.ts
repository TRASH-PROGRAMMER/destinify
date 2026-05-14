import { UserRol } from "../entities/User_rol";
import { UserRolRepository } from "../interfaces/IARepository";

export class CreateUserRolUseCase {
    constructor(private readonly repository: UserRolRepository) {}
    async execute(user_rol: UserRol): Promise<UserRol> {
        return await this.repository.create(user_rol);
    }
}
export default CreateUserRolUseCase;