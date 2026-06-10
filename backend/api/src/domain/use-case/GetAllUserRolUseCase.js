"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserRolUseCase = void 0;
class GetAllUserRolUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetAllUserRolUseCase = GetAllUserRolUseCase;
exports.default = GetAllUserRolUseCase;
