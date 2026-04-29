import { Felback } from "../entities/Feedback";
import { FelbackRepository } from "../interfaces/FeedbackRepository";

export class CreateFelbackUseCase {
    constructor(private readonly FelbackRepository: FelbackRepository) {}
    async execute(felback: Felback): Promise<Felback> {
        return await this.FelbackRepository.create(felback);
    }
}

export default CreateFelbackUseCase;
