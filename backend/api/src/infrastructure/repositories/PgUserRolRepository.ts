import { pool } from "../database/db";
import { UserRol } from "../../domain/entities/User_Rol";
import { UserRolRepository } from "../../domain/interfaces/IARepository";

export class pgUserRolRepository implements UserRolRepository {
    async create(user_rol: UserRol): Promise<UserRol> {
        const result = await pool.query(
            "INSERT INTO user_rol (user_id, rol_id) VALUES ($1, $2) RETURNING *",
            [user_rol.user_id, user_rol.rol_id]
        );
        return result.rows[0];
    }
    async findAll(): Promise<UserRol[]> {
        const result = await pool.query("SELECT * FROM user_rol");
        return result.rows;
    }
}