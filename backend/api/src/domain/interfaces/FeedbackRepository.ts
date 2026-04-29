import { Felback } from "../entities/Feedback";
export interface FelbackRepository {
  create(felback: Felback): Promise<Felback>;
  findAll(): Promise<Felback[]>;
}