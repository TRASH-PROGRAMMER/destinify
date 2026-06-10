"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItinerary = exports.getRecommendations = void 0;
const axios_1 = __importDefault(require("axios"));
// funcion para obtener recomendaciones
const getRecommendations = async (data) => {
    const res = await axios_1.default.post("http://localhost:5000/recommend", data);
    return res.data;
};
exports.getRecommendations = getRecommendations;
// funcion para obtener itinerarios
const getItinerary = async (data) => {
    const res = await axios_1.default.post("http://localhost:5000/itinerary", data);
    return res.data;
};
exports.getItinerary = getItinerary;
// exportacion de las funciones
exports.default = { getRecommendations: exports.getRecommendations, getItinerary: exports.getItinerary };
