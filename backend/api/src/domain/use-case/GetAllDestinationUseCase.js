"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDestinationUseCase = void 0;
// definicion de la clase UseCas
class GetAllDestinationUseCase {
    repo;
    // constructor
    constructor(repo) {
        this.repo = repo;
    }
    // metodo para obtener todos los destinos
    async execute() {
        return await this.repo.findAll();
    }
}
exports.GetAllDestinationUseCase = GetAllDestinationUseCase;
// exportacion de la clase UseCase
exports.default = GetAllDestinationUseCase;
