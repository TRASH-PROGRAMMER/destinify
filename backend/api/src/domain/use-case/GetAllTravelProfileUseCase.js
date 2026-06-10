"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTravelProfileUseCase = void 0;
// definicion de la clase UseCase
class GetAllTravelProfileUseCase {
    travelerProfilesRepository;
    // constructor
    constructor(travelerProfilesRepository) {
        this.travelerProfilesRepository = travelerProfilesRepository;
    }
    // metodo para obtener todos los perfiles de viajeros
    async execute() {
        return await this.travelerProfilesRepository.findAll();
    }
}
exports.GetAllTravelProfileUseCase = GetAllTravelProfileUseCase;
// exportacion de la clase UseCase
exports.default = GetAllTravelProfileUseCase;
