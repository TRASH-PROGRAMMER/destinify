"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUseCase = void 0;
// definicion de la clase UseCase
class GetAllUsersUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    // metodo para obtener todos los usuarios
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetAllUsersUseCase = GetAllUsersUseCase;
// exportacion de la clase UseCase
exports.default = GetAllUsersUseCase;
