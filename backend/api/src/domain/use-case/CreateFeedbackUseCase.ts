import { Felback } from "../entities/Feedback";
import { FeedbackRepository } from "../interfaces/FeedbackRepository";
// definicion de la clase UseCase
export class CreateFeedbackUseCase {
    // constructor
    constructor(private readonly FeedbackRepository: FeedbackRepository) {
        
    }
    // metodo para crear feedback
    async execute(feedback: Felback): Promise<Felback> {
        return await this.FeedbackRepository.create(feedback);
    }
}
// exportacion de la clase UseCase
export default CreateFeedbackUseCase;
