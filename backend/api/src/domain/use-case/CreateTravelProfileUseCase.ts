import { TravelerProfiles } from "../entities/Traveler_Profiles";
import TravelerProfilesRepository from "../interfaces/TravelerProfilesRepository";
// definicion de la clase UseCase
export class CreateTravelProfileUseCase {
    // constructor
    constructor(private readonly travelerProfilesRepository: TravelerProfilesRepository) {}
    // metodo para crear perfil de viajero
    async execute(data: TravelerProfiles): Promise<TravelerProfiles> {
        return await this.travelerProfilesRepository.create(data);
    }
}
// exportacion de la clase UseCase
export default CreateTravelProfileUseCase;