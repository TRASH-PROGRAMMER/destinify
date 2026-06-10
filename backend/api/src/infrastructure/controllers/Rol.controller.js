"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolController = void 0;
// definicion de la clase controller
class RolController {
    createUseCase;
    getAllUseCase;
    // constructor
    constructor(createUseCase, getAllUseCase) {
        this.createUseCase = createUseCase;
        this.getAllUseCase = getAllUseCase;
    }
    // metodo para obtener todos los roles
    getAll = async (_req, res) => {
        try {
            const roles = await this.getAllUseCase.execute();
            res.json(roles);
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
    // metodo para crear rol
    create = async (req, res) => {
        try {
            const rol = await this.createUseCase.execute(req.body);
            res.json(rol);
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
exports.RolController = RolController;
