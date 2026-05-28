import { Request, Response } from "express";
import { CreateTravelProfileUseCase } from "../../domain/use-case/CreateTravelProfileUseCase";
import { GetAllTravelProfileUseCase } from "../../domain/use-case/GetAllTravelProfileUseCase";
import { TravelerProfiles } from "../../domain/entities/Traveler_Profiles";
export class TravelProfileController {
    constructor(private readonly createTravelProfileUseCase: CreateTravelProfileUseCase, private readonly getAllTravelProfileUseCase: GetAllTravelProfileUseCase) {}
    create = async (req: Request, res: Response) => {
        const travelProfile = await this.createTravelProfileUseCase.execute(req.body);
        res.json(travelProfile);
    }
    getAll = async (req: Request, res: Response) => {
        const travelProfiles = await this.getAllTravelProfileUseCase.execute();
        res.json(travelProfiles);
    }
}