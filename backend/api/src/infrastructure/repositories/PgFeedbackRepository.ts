import { pool } from "../database/db";
import { Feedback } from "../../domain/entities/Feedback";
import { FeedbackRepository } from "../../domain/interfaces/FeedbackRepository";
// clase para implementar el repositorio
export class pgFeedbackRepository implements FeedbackRepository {
  // metodo para crear feedback
  async create(feedback: Feedback): Promise<Feedback> {
    const result = await pool.query(
      "INSERT INTO feedback (user_id,rating,comentario) VALUES ($1,$2,$3) RETURNING *",
      [feedback.user_id, feedback.rating, feedback.comentario]
    );
    return result.rows[0];
  }
  // metodo para obtener todos los feedbacks
  async findAll(): Promise<Feedback[]> {
    const result = await pool.query("SELECT * FROM feedback");
    return result.rows;
  }
}

