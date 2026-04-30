import { Felback } from "../entities/Feedback";
// definicion de la interfaz repository
export interface FeedbackRepository {
  // metodo para crear feedback
  create(felback: Felback): Promise<Felback>;
  // metodo para obtener todos los feedbacks
  findAll(): Promise<Felback[]>;
}
// exportacion de la interfaz
export default FeedbackRepository;