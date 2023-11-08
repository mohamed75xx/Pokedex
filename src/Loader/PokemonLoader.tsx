import 'react';
import styles from '../styles/PokemonLoader.module.css'; 
import pokeball from '../image/pokeball-png-45330.png'

const PokemonLoader = () => {
  return (
    <img src={pokeball} className={styles.pokeball_Loader} ></img>
  );
}

export default PokemonLoader;
