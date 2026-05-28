import { TravelerProfiles } from "../entities/Traveler_Profiles";
import TravelerProfilesRepository from "../interfaces/TravelerProfilesRepository";
// definicion de la clase UseCase
export class GetAllTravelProfileUseCase {
    // constructor
    constructor(private readonly travelerProfilesRepository: TravelerProfilesRepository) {}
    // metodo para obtener todos los perfiles de viajeros
    async execute(): Promise<TravelerProfiles[]> {
        return await this.travelerProfilesRepository.findAll();
    }
}
// exportacion de la clase UseCase
export default GetAllTravelProfileUseCase;