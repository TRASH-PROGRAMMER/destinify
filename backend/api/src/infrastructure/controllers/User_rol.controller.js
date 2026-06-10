"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolController = void 0;
class UserRolController {
    createUseCase;
    getAllUseCase;
    constructor(createUseCase, getAllUseCase) {
        this.createUseCase = createUseCase;
        this.getAllUseCase = getAllUseCase;
    }
    create = async (req, res) => {
        try {
            const user_rol = await this.createUseCase.execute(req.body);
            res.json(user_rol);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };
    getAll = async (_req, res) => {
        try {
            const user_rol = await this.getAllUseCase.execute();
            res.json(user_rol);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };
}
exports.UserRolController = UserRolController;
