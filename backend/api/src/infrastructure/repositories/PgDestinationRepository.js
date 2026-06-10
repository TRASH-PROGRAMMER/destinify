"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgDestinationRepository = void 0;
const db_1 = require("../database/db");
// implementacion de la interfaz DestinationRepository
class PgDestinationRepository {
    // metodo para crear destino
    async create(dest) {
        // query para crear destino
        const query = `
            INSERT INTO destinations (
                name, slug, description, city, province, country, 
                latitude, longitude, climate, popularity_score
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        // ejecutamos la query
        const result = await db_1.pool.query(query, [
            dest.name, dest.slug, dest.description, dest.city || null,
            dest.province || null, dest.country || null, dest.latitude || null,
            dest.longitude || null, dest.climate || null, dest.popularity_score || 0.00
        ]);
        // retornamos el destino creado
        return result.rows[0];
    }
    // metodo para obtener todos los destinos
    async findAll() {
        // query para obtener todos los destinos
        const query = `SELECT * FROM destinations`;
        // ejecutamos la query
        const result = await db_1.pool.query(query);
        return result.rows;
    }
}
exports.PgDestinationRepository = PgDestinationRepository;
