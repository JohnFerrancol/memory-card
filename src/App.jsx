import { useState, useEffect } from 'react';
import Card from './components/Card';
import generateRandomNumbers from './utils/generateRandomNumbers';
import shuffleArray from './utils/shuffleArray';
import './styles/App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // Asynchronous function to help to make 5 API calls on 5 random IDs of pokemon
    const fetchRandomPokemon = async () => {
      const randomIntsArray = generateRandomNumbers(5);

      const requests = randomIntsArray.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((result) => result.json())
      );

      const results = await Promise.all(requests);
      return results;
    };

    // Populate the pokemon data to a populate pokemon list and set the pokemonList state variable
    fetchRandomPokemon().then((pokemonData) => {
      const populatedPokemonList = pokemonData.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          spriteUrl: pokemon.sprites.front_default,
        };
      });
      setPokemonList(populatedPokemonList);
    });
  }, []);

  const handleClick = (e) => {
    // Obtain the id the pokemon clicked
    const clickedPokemonId = e.currentTarget.id;

    // If the id of the pokemon clicked has already been clicked, reset the game by resetting the current score and removing all the ids in the clickedPokemonIds
    if (clickedPokemonIds.includes(clickedPokemonId)) {
      setCurrentScore(0);
      setClickedPokemonIds([]);
    } else {
      // Else if it has not been clicked
      setCurrentScore((prevScore) => {
        // Increment current score
        const newScore = prevScore + 1;

        // To prevent the best score updating in the re render, wrap it within the setCurrentScore
        // Change the best score if the current score is greater than the new score
        setBestScore((prevBestScore) => (newScore > prevBestScore ? newScore : prevBestScore));

        return newScore;
      });

      // Add the pokemon id to the clicked ids
      setClickedPokemonIds((prevClickedPokemonIds) => [...prevClickedPokemonIds, clickedPokemonId]);
    }

    // Reshuffle the pokemon list
    setPokemonList((prevPokemonList) => shuffleArray(prevPokemonList));
  };

  return (
    <div className="grid grid-rows-2 justify-center">
      <h1 className="text-3xl font-bold">Current score: {currentScore}</h1>
      <h1 className="text-3xl font-bold">Best score: {bestScore}</h1>
      <div className="flex gap-2">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.id} {...pokemon} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
