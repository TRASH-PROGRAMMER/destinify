"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
// Definicion de la clase controller
class FeedbackController {
    createFeedback;
    getAllUseCase;
    constructor(createFeedback, getAllUseCase) {
        this.createFeedback = createFeedback;
        this.getAllUseCase = getAllUseCase;
    }
    // metodo para crear feedback
    async create(req, res) {
        try {
            const feedback = await this.createFeedback.execute(req.body);
            res.json(feedback);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    // metodo para obtener todos los felbacks
    async getAll(_req, res) {
        try {
            const feedback = await this.getAllUseCase.execute();
            console.log("ESTO ES LO QUE TRAE ", feedback);
            res.json(feedback);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
exports.FeedbackController = FeedbackController;
