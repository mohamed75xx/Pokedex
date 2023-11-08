import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetails } from "../api/getDetails";
import { Pokemon } from "../interface/interface";
import styles from "../styles/Details.module.css";
import PokemonLoader from '../Loader/PokemonLoader';

export default function Details() {
  // État pour stocker les détails du Pokémon et l'indicateur de chargement
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de l'état passé lors de la navigation (index du Pokémon, etc.)
  const { state } = useLocation();
  const navigate = useNavigate();

  // Lorsque le composant est monté, récupère les détails du Pokémon par son index
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getDetails(state.index).then((data: Pokemon) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }, 2000);
  }, []);

  // Affiche un loader pendant le chargement des données
  if (isLoading) {
    return <PokemonLoader />;
  }

  // Affichage des détails du Pokémon
  return (
    <div className={styles.details_container}>
      <img className={styles.image_container} src={pokemon?.sprites?.front_default} alt={state.name} />
      <div className={styles.stats_container}>
        <h1 className={styles.name_pokemon}>{state.name}</h1>
        <h2>Type:</h2>
        {pokemon?.types?.map((type) => (
          <h2 key={type.type.name}>{type.type.name}</h2>
        ))}
        <h2>Height: {pokemon?.height}</h2>
        <h2>Weight: {pokemon?.weight}</h2>
        <h2>Abilities:</h2>
        <ul>
          {pokemon?.abilities?.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <button className={styles.button_retour} onClick={() => navigate(-1)}>Retour</button>
      </div>
    </div>
  );
}
