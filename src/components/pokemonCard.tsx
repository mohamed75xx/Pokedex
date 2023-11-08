import { useNavigate } from "react-router-dom";
import styles from "../styles/pokemonCard.module.css";


export default function PokemonCard({
  name,
  url,
  index,
}: {
  name: string;
  url: string;
  index: number;
}): JSX.Element {
  
  // Hook pour la navigation interne
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
        <h1 className={styles.cardName}> {name} </h1>

        {/* Affichage de l'image du Pokémon en utilisant son index */}
        <img
          className={styles.cardImage}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
          alt={name}
        />

        {/* Navigation vers la page des détails du Pokémon lors du clic */}
        <a
          onClick={() => navigate("/details", { state: { name, url, index } })}
          className={styles.cardLink}
        >
          <button>Détails</button>
        </a>
    </div>
  );
}
