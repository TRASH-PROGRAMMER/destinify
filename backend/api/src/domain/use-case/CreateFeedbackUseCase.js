"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFeedbackUseCase = void 0;
// definicion de la clase UseCase
class CreateFeedbackUseCase {
    FeedbackRepository;
    // constructor
    constructor(FeedbackRepository) {
        this.FeedbackRepository = FeedbackRepository;
    }
    // metodo para crear feedback
    async execute(feedback) {
        return await this.FeedbackRepository.create(feedback);
    }
}
exports.CreateFeedbackUseCase = CreateFeedbackUseCase;
// exportacion de la clase UseCase
exports.default = CreateFeedbackUseCase;
