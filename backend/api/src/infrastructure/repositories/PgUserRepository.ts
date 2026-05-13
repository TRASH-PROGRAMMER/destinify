import { pool } from "../database/db";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class PgUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (
        email, password_hash, name, lastname, phone, avatar_url, 
        country, preferred_language, timezone, status, last_login
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, COALESCE($10, 'active'), $11) 
      RETURNING *
    `;
    const result = await pool.query(query, [
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

  async findAll(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}