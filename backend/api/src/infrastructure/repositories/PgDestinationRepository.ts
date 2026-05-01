import { DestinationRepository } from "../../domain/interfaces/DestinationRepository";
import { Destination } from "../../domain/entities/Destination";
import { pool } from "../database/db";  
// definicion de la clase repository
export class PgDestinationRepository implements DestinationRepository {
    // metodo para crear destino
    async create(destination: Destination): Promise<Destination> {
        const query = `
            INSERT INTO destinations (
                name, 
                description, 
                image, 
                ubicacion, 
                duracion
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id_destination, name, description, image, ubicacion, duracion
        `;
        const result = await pool.query(query, [
            destination.name,
            destination.description,
            destination.image,
            destination.ubicacion,
            destination.duracion
        ]);
        return result.rows[0];
    }
    // metodo para obtener todos los destinos
    async findAll(): Promise<Destination[]> {
        const query = `
            SELECT * FROM destinations
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}