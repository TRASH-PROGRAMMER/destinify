"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgRolRepository = void 0;
const db_1 = require("../database/db");
// implementacion de la interfaz RolRepository
class PgRolRepository {
    // metodo para obtener todos los roles
    async findAll() {
        // query para obtener todos los roles
        const query = `SELECT * FROM rol`;
        // ejecutamos la query
        const result = await db_1.pool.query(query);
        // retornamos los roles
        return result.rows;
    }
    // metodo para obtener un rol por id
    async getById(id) {
        // query para obtener un rol por id
        const query = `SELECT * FROM rol WHERE id = $1`;
        // ejecutamos la query
        const result = await db_1.pool.query(query, [id]);
        // retornamos el rol
        return result.rows[0];
    }
    // metodo para crear un rol
    async create(rol) {
        // query para crear rol
        const query = `
            INSERT INTO rol (
                name, description
            ) VALUES ($1, $2)
            RETURNING *
        `;
        // ejecutamos la query
        const result = await db_1.pool.query(query, [
            rol.nombre, rol.descripcion
        ]);
        // retornamos el rol creado
        return result.rows[0];
    }
    // metodo para actualizar un rol
    async update(id, rol) {
        // query para actualizar rol
        const query = `
            UPDATE rol SET
                name = $2,
                description = $3
            WHERE id = $1
            RETURNING *
        `;
        // ejecutamos la query
        const result = await db_1.pool.query(query, [
            id, rol.nombre, rol.descripcion
        ]);
        // retornamos el rol actualizado
        return result.rows[0];
    }
    // metodo para eliminar un rol
    async delete(id) {
        // query para eliminar rol
        const query = `DELETE FROM rol WHERE id = $1 RETURNING *`;
        // ejecutamos la query
        const result = await db_1.pool.query(query, [id]);
        // retornamos el rol eliminado
        return result.rows[0];
    }
}
exports.PgRolRepository = PgRolRepository;
