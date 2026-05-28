import { TravelerProfiles } from "../../domain/entities/Traveler_Profiles";
import TravelerProfilesRepository from "../../domain/interfaces/TravelerProfilesRepository";
// definicion de la clase repository
export class PgTravelProfileRepository implements TravelerProfilesRepository {
    // constructor
    constructor(private readonly db: Database) {}
    // metodo para crear perfil de viajero
    async create(data: TravelerProfiles): Promise<TravelerProfiles> {
        return await this.db.query('INSERT INTO traveler_profiles (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [data.name, data.email, data.phone]);
    }
    // metodo para obtener todos los perfiles de viajeros
    async findAll(): Promise<TravelerProfiles[]> {
        return await this.db.query('SELECT * FROM traveler_profiles');
    }
}
// exportacion de la clase repository
export default PgTravelProfileRepository;