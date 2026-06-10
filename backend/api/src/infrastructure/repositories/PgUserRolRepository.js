"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgUserRolRepository = void 0;
const db_1 = require("../database/db");
class pgUserRolRepository {
    async create(user_rol) {
        const result = await db_1.pool.query("INSERT INTO user_rol (user_id, rol_id) VALUES ($1, $2) RETURNING *", [user_rol.user_id, user_rol.rol_id]);
        return result.rows[0];
    }
    async findAll() {
        const result = await db_1.pool.query("SELECT * FROM user_rol");
        return result.rows;
    }
}
exports.pgUserRolRepository = pgUserRolRepository;
