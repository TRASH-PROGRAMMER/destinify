import axios from "axios";

export const getRecommendations = async (data: any) => {
  const res = await axios.post("http://localhost:5000/recommend", data);
  return res.data;
};