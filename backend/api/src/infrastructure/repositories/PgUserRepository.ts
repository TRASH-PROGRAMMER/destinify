import { pool } from "../database/db";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
// clase para implementar el repositorio
export class PgUserRepository implements UserRepository {
  // metodo para crear usuario
  async create(user: User): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *",
      [user.email, user.password]
    );
    return result.rows[0];
  }
// metodo para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}