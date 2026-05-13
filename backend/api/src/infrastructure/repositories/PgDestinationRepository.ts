import { DestinationRepository } from "../../domain/interfaces/DestinationRepository";
import { Destination } from "../../domain/entities/Destination";
import { pool } from "../database/db";  

export class PgDestinationRepository implements DestinationRepository {
    async create(dest: Destination): Promise<Destination> {
        const query = `
            INSERT INTO destinations (
                name, slug, description, city, province, country, 
                latitude, longitude, climate, popularity_score
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const result = await pool.query(query, [
            dest.name, dest.slug, dest.description, dest.city || null, 
            dest.province || null, dest.country || null, dest.latitude || null, 
            dest.longitude || null, dest.climate || null, dest.popularity_score || 0.00
        ]);
        return result.rows[0];
    }

    async findAll(): Promise<Destination[]> {
        const query = `SELECT * FROM destinations`;
        const result = await pool.query(query);
        return result.rows;
    }
}