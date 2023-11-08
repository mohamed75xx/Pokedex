import { api } from "./api";

export const getDetails = async (index: number) => {
  // Envoie une requête à l'API Pokémon pour obtenir les détails d'un Pokémon spécifique
  const response = await api.get(`/pokemon/${(index + 1).toString()}`);
  return response.data;
};
