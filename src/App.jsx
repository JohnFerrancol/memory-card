import { useState, useEffect } from 'react';
import Card from './components/Card';
import Button from './components/Button';
import Modal from './components/Modal';

import generateRandomNumbers from './utils/generateRandomNumbers';
import shuffleArray from './utils/shuffleArray';

import pokeBall from './assets/poke-ball.png';
import './styles/App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [numberOfPokemon, setNumberOfPokemon] = useState(5);
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const diffcultyLevels = [
    { label: 'Easy', cards: 5 },
    { label: 'Medium', cards: 10 },
    { label: 'Hard', cards: 15 },
  ];

  useEffect(() => {
    // Asynchronous function to help to make API calls on random IDs of pokemon based on the number of Pokemon
    const fetchRandomPokemon = async () => {
      const randomIntsArray = generateRandomNumbers(numberOfPokemon);

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
  }, [numberOfPokemon]);

  const resetGame = () => {
    setCurrentScore(0);
    setClickedPokemonIds([]);
  };

  // Event handler to handle when a pokemon card is clicked
  const handleCardClick = (e) => {
    // Obtain the id the pokemon clicked
    const clickedPokemonId = e.currentTarget.id;

    // If the id of the pokemon clicked has already been clicked, reset the game by resetting the current score and removing all the ids in the clickedPokemonIds
    if (clickedPokemonIds.includes(clickedPokemonId)) {
      setIsModalVisible(true);
    } else {
      // Else if it has not been clicked
      setCurrentScore((prevScore) => {
        // Increment current score
        const newScore = prevScore + 1;

        if (newScore === numberOfPokemon) {
          setIsModalVisible(true);
        }

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

  // Event handler to handle when the user wants to change the difficulty level
  const handleButtonClick = (noOfCards) => {
    setNumberOfPokemon(noOfCards);

    // Reset the game to ensure, that past progress is not carried over
    // And to clear the clicked pokemons to prevent errors where the card generated is in another difficulty setting, resulting in game over
    resetGame();
  };

  // Event handler to handle when the user wants to try again
  const handleTryAgain = () => {
    setIsModalVisible(false);
    resetGame();
  };

  return (
    <div className="text-white h-screen background-img font-press-start-2p flex flex-col justify-start items-center ">
      <div className="flex items-center gap-3">
        <img src={pokeBall} width={60} />
        <h1 className="text-3xl">Poke Memory</h1>
      </div>

      {isModalVisible ? (
        <Modal
          text={
            currentScore === numberOfPokemon
              ? 'You Won! Try a higher difficulty ;)'
              : 'Oops! You clicked a same pokemon! You lost!'
          }
          handleTryAgain={handleTryAgain}
        />
      ) : (
        <>
          {' '}
          <h2 className="text-2xl">Current score: {currentScore}</h2>
          <h2 className="text-2xl">Best score: {bestScore}</h2>
          <p className="mt-4 mb-3">
            Pokemon Memory Game. Do not click the same pokemon more than once. Click all the cards
            to win!
          </p>
          <h3 className="text-xl mt-3 mr-100">Choose Difficulty:</h3>
          <div className="flex gap-4 mr-100 mt-5">
            {diffcultyLevels.map((difficulty) => (
              <Button
                key={difficulty.label}
                text={`${difficulty.label} (${difficulty.cards})`}
                handleButtonClick={() => handleButtonClick(difficulty.cards)}
              />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-3 m-9 mr-100">
            {pokemonList.map((pokemon) => (
              <Card key={pokemon.id} {...pokemon} handleCardClick={handleCardClick} />
            ))}
          </div>{' '}
        </>
      )}
    </div>
  );
}

export default App;
