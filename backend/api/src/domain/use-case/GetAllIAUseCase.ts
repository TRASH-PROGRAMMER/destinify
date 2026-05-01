import { IARepository } from "../interfaces/IARepository";
import { IA } from "../entities/ia";

export class GetAllIAUseCase {
    constructor(private repo: IARepository) {}

    async execute(): Promise<IA[]> {
        return await this.repo.findAll();
    }
}
export default GetAllIAUseCase;