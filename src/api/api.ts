import axios from "axios";

// Configuration de l'instance axios pour interagir avec l'API Pokémon
export const api = axios.create({
  // URL de base pour toutes les requêtes à l'API
  baseURL: "https://pokeapi.co/api/v2",
});
