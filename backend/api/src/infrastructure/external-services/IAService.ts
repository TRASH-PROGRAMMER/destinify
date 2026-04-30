import axios from "axios";
// funcion para obtener recomendaciones
export const getRecommendations = async (data: any) => {
  const res = await axios.post("http://localhost:5000/recommend", data);
  return res.data;
};
// funcion para obtener itinerarios
export const getItinerary = async (data: any) => {
  const res = await axios.post("http://localhost:5000/itinerary", data);
  return res.data;
};
// exportacion de las funciones
export default { getRecommendations, getItinerary };