"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolUseCase = void 0;
// definicion de la clase UseCase
class CreateRolUseCase {
    repo;
    // constructor
    constructor(repo) {
        this.repo = repo;
    }
    // metodo para crear rol
    async execute(data) {
        return await this.repo.create(data);
    }
}
exports.CreateRolUseCase = CreateRolUseCase;
// exportacion de la clase UseCase
exports.default = CreateRolUseCase;
