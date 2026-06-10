"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDestinationUseCase = void 0;
// definicion de la clase UseCas
class CreateDestinationUseCase {
    repo;
    // constructor
    constructor(repo) {
        this.repo = repo;
    }
    // metodo para crear destino
    async execute(data) {
        return await this.repo.create(data);
    }
}
exports.CreateDestinationUseCase = CreateDestinationUseCase;
// exportacion de la clase UseCase
exports.default = CreateDestinationUseCase;
