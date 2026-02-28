import Button from './Button';
import winner from '../assets/winner.gif';
import loser from '../assets/loser.gif';

export default function Modal({ haveWon, handleTryAgain }) {
  return (
    <div className="flex flex-col gap-10 bg-white text-black items-center justify-center w-300 h-90 border border-gray shadow-2xl rounded-2xl">
      <h1 className="text-xl">
        {haveWon
          ? 'You Won! Try a higher difficulty ;)'
          : 'Oops! You clicked a same pokemon! You lost!'}
      </h1>
      <img src={haveWon ? winner : loser} height={!haveWon && 40} width={haveWon && 200} />
      <Button text="Try Again" handleButtonClick={handleTryAgain} />
    </div>
  );
}
