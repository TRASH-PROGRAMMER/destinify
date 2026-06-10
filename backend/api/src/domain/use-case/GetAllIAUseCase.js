"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllIAUseCase = void 0;
class GetAllIAUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return await this.repo.findAll();
    }
}
exports.GetAllIAUseCase = GetAllIAUseCase;
exports.default = GetAllIAUseCase;
