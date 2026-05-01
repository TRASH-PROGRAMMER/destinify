import { Feedback } from "../entities/Feedback";
import { FeedbackRepository } from "../interfaces/FeedbackRepository";
// definicion de la clase UseCase
export class GetAllFeedbackUseCase {
    // constructor
    constructor(private readonly FeedbackRepository: FeedbackRepository) {
    }
    // metodo para obtener todos los feedbacks
    async execute(): Promise<Feedback[]> {
        return await this.FeedbackRepository.findAll();
    }
}
// exportacion de la clase UseCase