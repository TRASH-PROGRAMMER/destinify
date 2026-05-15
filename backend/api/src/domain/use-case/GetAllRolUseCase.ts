import { Rol } from "../entities/Rol";
import { RolRepository } from "../interfaces/RolRepository";
// definicion de la clase UseCase
export class GetAllRolUseCase {
    // constructor
    constructor(private repo: RolRepository) {}
    // metodo para obtener rol
    async execute(): Promise<Rol[]> {
        return await this.repo.findAll();
    }
}
// exportacion de la clase UseCase
export default GetAllRolUseCase;