import { Pool } from "pg";
import { TravelerProfiles } from "../../domain/entities/Traveler_Profiles";
import TravelerProfilesRepository from "../../domain/interfaces/TravelerProfilesRepository";

export class PgTravelProfileRepository implements TravelerProfilesRepository {
    constructor(private readonly db: Pool) {}

    async create(data: TravelerProfiles): Promise<TravelerProfiles> {
        const result = await this.db.query(
            `INSERT INTO traveler_profiles (
                user_id, budget_min, budget_max, currency, preferred_style, accessibility_needs
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                data.userId,
                data.budgetMin,
                data.budgetMax,
                data.currency,
                data.preferredStyle,
                data.accessibilityNeeds,
            ]
        );
        return result.rows[0];
    }

    async findAll(): Promise<TravelerProfiles[]> {
        const result = await this.db.query("SELECT * FROM traveler_profiles");
        return result.rows;
    }
}

export default PgTravelProfileRepository;
