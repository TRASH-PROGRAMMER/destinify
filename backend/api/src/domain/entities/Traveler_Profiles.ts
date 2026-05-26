export class TravelerProfiles {
    constructor(
        public id: number,
        public userId: number,
        public budgetMin: number,
        public budgetMax: number,
        public currency: string,
        public preferredStyle: string,
        public accessibilityNeeds: string
    ) {}
}
export type CreateTravelerProfilesDTO = {
    userId: number;
    budgetMin: number;
    budgetMax: number;
    currency: string;
    preferredStyle: string;
    accessibilityNeeds: string;
}
export type UpdateTravelerProfilesDTO = {
    userId?: number;
    budgetMin?: number;
    budgetMax?: number;
    currency?: string;
    preferredStyle?: string;
    accessibilityNeeds?: string;
}

