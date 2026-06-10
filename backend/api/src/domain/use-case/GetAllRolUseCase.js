"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRolUseCase = void 0;
// definicion de la clase UseCase
class GetAllRolUseCase {
    repo;
    // constructor
    constructor(repo) {
        this.repo = repo;
    }
    // metodo para obtener rol
    async execute() {
        return await this.repo.findAll();
    }
}
exports.GetAllRolUseCase = GetAllRolUseCase;
// exportacion de la clase UseCase
exports.default = GetAllRolUseCase;
