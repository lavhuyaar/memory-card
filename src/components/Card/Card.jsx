import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Card({ url, cardOnClick, index }) {
  const [pokemonData, setPokemonData] = useState({}); //Data of individual pokemons

  //Fetches the data of pokemon using the url prop asynchronously
  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(error, "Cannot find pokemon data");
      }
    };

    getPokemonData();
  }, [url]);


  //Later displays the data in-form of Cards

  return (
    <>
      <div
        className="pokemon-card"
        id="not-clicked"
        onClick={() => cardOnClick(index)}
      >
        <div className="pokemon-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
            alt={pokemonData.name}
          />
        </div>
        <p>{pokemonData.name}</p>
      </div>
    </>
  );
}

export default Card;

Card.propTypes = {
  url: PropTypes.string.isRequired,
  cardOnClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
