import { DestinationRepository } from "../../domain/interfaces/DestinationRepository";
import { Destination } from "../../domain/entities/Destination";
import { pool } from "../database/db";  
// implementacion de la interfaz DestinationRepository
export class PgDestinationRepository implements DestinationRepository {
    // metodo para crear destino
    async create(dest: Destination): Promise<Destination> {
        // query para crear destino
        const query = `
            INSERT INTO destinations (
                name, slug, description, city, province, country, 
                latitude, longitude, climate, popularity_score
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        // ejecutamos la query
        const result = await pool.query(query, [
            dest.name, dest.slug, dest.description, dest.city || null, 
            dest.province || null, dest.country || null, dest.latitude || null, 
            dest.longitude || null, dest.climate || null, dest.popularity_score || 0.00
        ]);
        // retornamos el destino creado
        return result.rows[0];
    }
    // metodo para obtener todos los destinos
    async findAll(): Promise<Destination[]> {
        // query para obtener todos los destinos
        const query = `SELECT * FROM destinations`;
        // ejecutamos la query
        const result = await pool.query(query);
        return result.rows;
    }
}