import { TravelerProfiles } from "../entities/Traveler_Profiles";
export interface TravelerProfilesRepository {
    create(travelerProfiles: TravelerProfiles): Promise<TravelerProfiles>;
    findAll(): Promise<TravelerProfiles[]>;
}

export default TravelerProfilesRepository;