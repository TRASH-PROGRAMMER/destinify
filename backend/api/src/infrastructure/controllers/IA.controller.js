"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAController = void 0;
class IAController {
    getRecommendationsUseCase;
    constructor(getRecommendationsUseCase) {
        this.getRecommendationsUseCase = getRecommendationsUseCase;
    }
    // Metodo para pedir recomendaciones a la IA
    getRecommendations = async (req, res) => {
        try {
            // Se asume que req.body contiene los datos del usuario/preferencias
            const recommendations = await this.getRecommendationsUseCase.execute(req.body);
            res.json(recommendations);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error connecting to AI" });
            }
        }
    };
}
exports.IAController = IAController;
