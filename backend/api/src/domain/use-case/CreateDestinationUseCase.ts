import { Destination } from "../entities/Destination";
import { DestinationRepository } from "../interfaces/DestinationRepository";
// definicion de la clase UseCas
export class CreateDestinationUseCase {
    // constructor
    constructor(private repo: DestinationRepository) {}
    // metodo para crear destino
    async execute(data: Destination): Promise<Destination> {
        return await this.repo.create(data);
    }
}
// exportacion de la clase UseCase
export default CreateDestinationUseCase;