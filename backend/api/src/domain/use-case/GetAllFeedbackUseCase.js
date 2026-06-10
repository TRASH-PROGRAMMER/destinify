"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFeedbackUseCase = void 0;
// definicion de la clase UseCase
class GetAllFeedbackUseCase {
    FeedbackRepository;
    // constructor
    constructor(FeedbackRepository) {
        this.FeedbackRepository = FeedbackRepository;
    }
    // metodo para obtener todos los feedbacks
    async execute() {
        return await this.FeedbackRepository.findAll();
    }
}
exports.GetAllFeedbackUseCase = GetAllFeedbackUseCase;
// exportacion de la clase UseCase
