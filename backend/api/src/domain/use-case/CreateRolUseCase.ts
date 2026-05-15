import { Rol } from "../entities/Rol";
import { RolRepository } from "../interfaces/RolRepository";
// definicion de la clase UseCase
export class CreateRolUseCase {
    // constructor
    constructor(private repo: RolRepository) {}
    // metodo para crear rol
    async execute(data: Rol): Promise<Rol> {
        return await this.repo.create(data);
    }
}
// exportacion de la clase UseCase
export default CreateRolUseCase;