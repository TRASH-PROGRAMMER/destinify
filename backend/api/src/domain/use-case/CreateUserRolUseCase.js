"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRolUseCase = void 0;
class CreateUserRolUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(user_rol) {
        return await this.repository.create(user_rol);
    }
}
exports.CreateUserRolUseCase = CreateUserRolUseCase;
exports.default = CreateUserRolUseCase;
