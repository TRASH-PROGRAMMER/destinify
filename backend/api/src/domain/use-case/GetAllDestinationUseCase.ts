import { Destination } from "../entities/Destination";
import { DestinationRepository } from "../interfaces/DestinationRepository";
// definicion de la clase UseCas
export class GetAllDestinationUseCase {
    // constructor
    constructor(private repo: DestinationRepository) {}
    // metodo para obtener todos los destinos
    async execute(): Promise<Destination[]> {
        return await this.repo.findAll();
    }
}
// exportacion de la clase UseCase
export default GetAllDestinationUseCase;