"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgFeedbackRepository = void 0;
const db_1 = require("../database/db");
// clase para implementar el repositorio
class pgFeedbackRepository {
    // metodo para crear feedback
    async create(feedback) {
        const result = await db_1.pool.query("INSERT INTO feedback (user_id,rating,comentario) VALUES ($1,$2,$3) RETURNING *", [feedback.user_id, feedback.rating, feedback.comentario]);
        return result.rows[0];
    }
    // metodo para obtener todos los feedbacks
    async findAll() {
        const result = await db_1.pool.query("SELECT * FROM feedback");
        return result.rows;
    }
}
exports.pgFeedbackRepository = pgFeedbackRepository;
