"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgTravelProfileRepository = void 0;
class PgTravelProfileRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const result = await this.db.query(`INSERT INTO traveler_profiles (
                user_id, budget_min, budget_max, currency, preferred_style, accessibility_needs
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
            data.userId,
            data.budgetMin,
            data.budgetMax,
            data.currency,
            data.preferredStyle,
            data.accessibilityNeeds,
        ]);
        return result.rows[0];
    }
    async findAll() {
        const result = await this.db.query("SELECT * FROM traveler_profiles");
        return result.rows;
    }
}
exports.PgTravelProfileRepository = PgTravelProfileRepository;
exports.default = PgTravelProfileRepository;
