import { IA } from "../entities/ia";

export interface IARepository {
    create(ia: IA): Promise<IA>;
    findAll(): Promise<IA[]>;
}   