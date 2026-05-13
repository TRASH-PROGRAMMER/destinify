export class Destination {
    constructor(
        public name: string,
        public slug: string,
        public description: string,
        public id?: number,
        public city?: string,
        public province?: string,
        public country?: string,
        public latitude?: number,
        public longitude?: number,
        public climate?: string,
        public popularity_score?: number,
        public created_at?: Date
    ) {}
}

export type CreateDestinationDTO = {
    name: string;
    slug: string;
    description: string;
    city?: string;
    province?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    climate?: string;
    popularity_score?: number;
}

export type UpdateDestinationDTO = {
    name?: string;
    slug?: string;
    description?: string;
    city?: string;
    province?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    climate?: string;
    popularity_score?: number;
}