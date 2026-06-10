"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecommendationsUseCase = void 0;
class GetRecommendationsUseCase {
    iaService;
    constructor(iaService) {
        this.iaService = iaService;
    }
    async execute(userData) {
        // Aquí llamas al servicio externo que se comunica con Flask
        return await this.iaService.getRecommendations(userData);
    }
}
exports.GetRecommendationsUseCase = GetRecommendationsUseCase;
