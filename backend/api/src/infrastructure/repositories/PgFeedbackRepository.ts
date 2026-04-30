import { pool } from "../database/db";
import { Felback } from "../../domain/entities/Feedback";
import { FeedbackRepository } from "../../domain/interfaces/FeedbackRepository";
// clase para implementar el repositorio
export class pgFeedbackRepository implements FeedbackRepository {
  // metodo para crear feedback
  async create(feedback: Felback): Promise<Felback> {
    const result = await pool.query(
      "INSERT INTO feedback (user_id,rating,comment) VALUES ($1,$2,$3) RETURNING *",
      [feedback.userId, feedback.rating, feedback.comment]
    );
    return result.rows[0];
  }
  // metodo para obtener todos los feedbacks
  async findAll(): Promise<Felback[]> {
    const result = await pool.query("SELECT * FROM feedback");
    return result.rows;
  }
}

