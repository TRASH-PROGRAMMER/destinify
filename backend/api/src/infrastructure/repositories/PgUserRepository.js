"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgUserRepository = void 0;
const db_1 = require("../database/db");
class PgUserRepository {
    async create(user) {
        const query = `
      INSERT INTO users (
        email, password_hash, name, lastname, phone, avatar_url, 
        country, preferred_language, timezone, status, last_login
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, COALESCE($10, 'active'), $11) 
      RETURNING *
    `;
        const result = await db_1.pool.query(query, [
            user.email,
            user.password_hash,
            user.name || null,
            user.lastname || null,
            user.phone || null,
            user.avatar_url || null,
            user.country || null,
            user.preferred_language || null,
            user.timezone || null,
            user.status || null,
            user.last_login || null
        ]);
        return result.rows[0];
    }
    async findAll() {
        const result = await db_1.pool.query("SELECT * FROM users");
        return result.rows;
    }
}
exports.PgUserRepository = PgUserRepository;
