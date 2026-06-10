"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelProfileController = void 0;
class TravelProfileController {
    createTravelProfileUseCase;
    getAllTravelProfileUseCase;
    constructor(createTravelProfileUseCase, getAllTravelProfileUseCase) {
        this.createTravelProfileUseCase = createTravelProfileUseCase;
        this.getAllTravelProfileUseCase = getAllTravelProfileUseCase;
    }
    create = async (req, res) => {
        const travelProfile = await this.createTravelProfileUseCase.execute(req.body);
        res.json(travelProfile);
    };
    getAll = async (req, res) => {
        const travelProfiles = await this.getAllTravelProfileUseCase.execute();
        res.json(travelProfiles);
    };
}
exports.TravelProfileController = TravelProfileController;
