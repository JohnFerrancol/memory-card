import { useState, useEffect } from 'react';
import Card from './components/Card';
import generateRandomNumbers from './utils/generateRandomNumbers';
import './styles/App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);

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
    setCurrentScore(currentScore + 1);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Current score: {currentScore}</h1>
      {pokemonList.map((pokemon) => (
        <Card key={pokemon.id} {...pokemon} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default App;
