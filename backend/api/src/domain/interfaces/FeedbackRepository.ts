import { Feedback } from "../entities/Feedback";
// definicion de la interfaz repository
export interface FeedbackRepository {
  // metodo para crear feedback
  create(feedback: Feedback): Promise<Feedback>;
  // metodo para obtener todos los feedbacks
  findAll(): Promise<Feedback[]>;
}
// exportacion de la interfaz
export default FeedbackRepository;