import React, { useState, useEffect } from "react";
import { getPokedex } from "../api/getPokedex";
import styles from "../styles/Home.module.css";
import PokemonCard from "../components/pokemonCard";
import { Pokemon } from "../interface/interface";
import Pokeball from '../image/pokeball-png-45330.png'; 

export default function Home() {
  // État pour stocker la liste de Pokémon et la gestion de la pagination
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedButton, setClickedButton] = useState<number | null>(1);
  const itemsPerPage = 4;

  // Récupération de la liste de Pokémon lors de l'initialisation du composant
  useEffect(() => {
    getPokedex().then((data) => {
      setPokedex(data);
    });
  }, []);

  // Détermination des index pour afficher la tranche correcte de Pokémon
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = pokedex.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(pokedex.length / itemsPerPage);

  // Gestion du changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setClickedButton(pageNumber);
  };

  // Vérification pour savoir si un numéro de page est adjacent au bouton cliqué
  const isAdjacent = (pageNumber: number) => {
    return clickedButton ? Math.abs(clickedButton - pageNumber) === 1 : false;
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {currentItems.map((pokemon: Pokemon, index: number) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            url={pokemon.url}
            index={index + firstItemIndex}
          />
        ))}
      </div>
      <div className={styles.pagination}>
  {/* Flèche gauche pour revenir à la page précédente */}
  {currentPage > 1 && (
    <button
      className={`${styles.paginationArrow} ${styles.paginationArrowLeft}`}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      &lt;
    </button>
  )}
  {[...Array(totalPages)].map((_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={index}
        className={
          clickedButton === pageNumber ? styles.clickedButton :
          isAdjacent(pageNumber) ? styles.adjacentButton : ''
        }
        onClick={() => handlePageChange(pageNumber)}
      >
        {clickedButton === pageNumber ? <img src={Pokeball} alt="Pokeball" className={styles.pokeballImage}/> : ''}
      </button>
    );
  })}
  {/* Flèche droite pour passer à la page suivante */}
  {currentPage < totalPages && (
    <button
      className={`${styles.paginationArrow} ${styles.paginationArrowRight}`}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      &gt;
    </button>
  )}
</div>

    </>
  );
}
