"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationController = void 0;
// Definicion de la clase controller
class DestinationController {
    createDestination;
    getAllUseCase;
    constructor(createDestination, getAllUseCase) {
        this.createDestination = createDestination;
        this.getAllUseCase = getAllUseCase;
    }
    // metodo para crear destino
    create = async (req, res) => {
        try {
            const destination = await this.createDestination.execute(req.body);
            res.json(destination);
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
    // metodo para obtener todos los destinos
    getAll = async (_req, res) => {
        try {
            const destination = await this.getAllUseCase.execute();
            res.json(destination);
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
exports.DestinationController = DestinationController;
