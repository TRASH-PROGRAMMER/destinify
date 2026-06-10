"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
// definicion de la clase UseCase
class CreateUserUseCase {
    repo;
    // constructor
    constructor(repo) {
        this.repo = repo;
    }
    // metodo para crear usuario
    async execute(data) {
        return await this.repo.create(data);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
// exportacion de la clase UseCase
exports.default = CreateUserUseCase;
