import { api } from "./api";

export const getPokedex = async () => {
  // Envoie une requête à l'API Pokémon pour obtenir une liste limitée de Pokémon
  const response = await api.get("/pokemon/?limit=20");
  return response.data.results;
};
