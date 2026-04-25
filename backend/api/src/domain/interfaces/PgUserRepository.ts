import { pool } from "../../infrastructure/database/db";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class PgUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *",
      [user.email, user.password]
    );
    return result.rows[0];
  }

  async findAll(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}