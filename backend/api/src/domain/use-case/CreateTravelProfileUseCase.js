"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTravelProfileUseCase = void 0;
// definicion de la clase UseCase
class CreateTravelProfileUseCase {
    travelerProfilesRepository;
    // constructor
    constructor(travelerProfilesRepository) {
        this.travelerProfilesRepository = travelerProfilesRepository;
    }
    // metodo para crear perfil de viajero
    async execute(data) {
        return await this.travelerProfilesRepository.create(data);
    }
}
exports.CreateTravelProfileUseCase = CreateTravelProfileUseCase;
// exportacion de la clase UseCase
exports.default = CreateTravelProfileUseCase;
