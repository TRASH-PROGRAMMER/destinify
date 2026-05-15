import { pool } from "../database/db";
import { RolRepository } from "../../domain/interfaces/RolRepository";
import { Rol } from "../../domain/entities/Rol";
// implementacion de la interfaz RolRepository
export class PgRolRepository implements RolRepository {
    // metodo para obtener todos los roles
    async findAll(): Promise<Rol[]> {
        // query para obtener todos los roles
        const query = `SELECT * FROM rol`;
        // ejecutamos la query
        const result = await pool.query(query);
        // retornamos los roles
        return result.rows;
    }
    // metodo para obtener un rol por id
    async getById(id: number): Promise<Rol> {
        // query para obtener un rol por id
        const query = `SELECT * FROM rol WHERE id = $1`;
        // ejecutamos la query
        const result = await pool.query(query, [id]);
        // retornamos el rol
        return result.rows[0];
    }
    // metodo para crear un rol
    async create(rol: Rol): Promise<Rol> {
        // query para crear rol
        const query = `
            INSERT INTO rol (
                name, description
            ) VALUES ($1, $2)
            RETURNING *
        `;
        // ejecutamos la query
        const result = await pool.query(query, [
            rol.nombre, rol.descripcion
        ]);
        // retornamos el rol creado
        return result.rows[0];
    }
    // metodo para actualizar un rol
    async update(id: number, rol: Rol): Promise<Rol> {
        // query para actualizar rol
        const query = `
            UPDATE rol SET
                name = $2,
                description = $3
            WHERE id = $1
            RETURNING *
        `;
        // ejecutamos la query
        const result = await pool.query(query, [
            id, rol.nombre, rol.descripcion

        ]);
        // retornamos el rol actualizado
        return result.rows[0];
    }
    // metodo para eliminar un rol
    async delete(id: number): Promise<Rol> {
        // query para eliminar rol
        const query = `DELETE FROM rol WHERE id = $1 RETURNING *`;
        // ejecutamos la query
        const result = await pool.query(query, [id]);
        // retornamos el rol eliminado
        return result.rows[0];
    }
}