/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [score, setScore] = useState(0); //Current score
  const [bestScore, setBestScore] = useState(0); //Best score
  const [pokemons, setPokemons] = useState([]); //Array of pokemons
  const [clickedPokemons, setClickedPokemons] = useState([]); //Array of clicked pokemons

  const NUMBER_OF_POKEMONS = 15; //Total no. of pokemons

  //Fetches the data of 15 pokemons from PokeAPI (asynchronously) and shuffles it as well
  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${NUMBER_OF_POKEMONS}`
      );
      const data = await response.json();
      const shuffledPokemons = shuffle(data.results); //Shuffles the pokemons
      setPokemons(shuffledPokemons);
    };
    getPokemons();
  }, []); //Empty dependency array

  //Checks whether all the cards are clicked
  useEffect(() => {
    if (score >= NUMBER_OF_POKEMONS) {
      //If clicked
      alert("You won! Congratulations!"); //Alert
      resetGame(); //And resets the game
    }
  }, [score]); //Checks everytime the current score is updated

  //Shuffles the array passed as the parameter (Fisher-Yates Shuffle)
  const shuffle = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr; //Returns shuffled array
  };

  //Card event handler; takes the index of pokemons array as the parameter
  const cardOnClick = (index) => {
    if (clickedPokemons.includes(pokemons[index])) {
      //If the card is clicked before
      alert("Oops! You lost. Try Again!"); //Alert that you lost
      resetGame(); //Resets the game
    } else {
      //Else pushes the clicked card's data to clickedPokemons array
      const copyOfClickedPokemons = [...clickedPokemons, pokemons[index]];
      setClickedPokemons(copyOfClickedPokemons);

      const shuffledPokemons = shuffle(pokemons);
      setPokemons(shuffledPokemons); //And shuffle the cards (pokemons array)
      const newScore = score + 1; //Increments current score by 1
      setScore(newScore);
      setBestScore(newScore > bestScore ? newScore : bestScore); //Checks if the current score is the best score yet
      //And sets best score after that
    }
  };

  //Resets Game
  const resetGame = () => {
    setScore(0); //Sets current score to 0;
    setClickedPokemons([]); //Sets clickedPokemons array to an empty array

    const shuffledPokemons = shuffle(pokemons);
    setPokemons(shuffledPokemons); //Shuffles the pokemons
  };

  return (
    <>
      <Navbar score={score} bestScore={bestScore} />
      <main className="pokemons-card-container">
        {pokemons.map((pokemon, index) => (
          <Card
            url={pokemon.url}
            key={pokemon.name}
            cardOnClick={cardOnClick}
            index={index}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
