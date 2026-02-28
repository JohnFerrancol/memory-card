import Button from './Button';

export default function Modal({ text, handleTryAgain }) {
  return (
    <div className="flex flex-col gap-10 bg-white text-black items-center justify-center w-300 h-90 border border-gray shadow-2xl rounded-2xl">
      <h1 className="text-3xl">{text}</h1>
      <Button text="Try Again" handleButtonClick={handleTryAgain} />
    </div>
  );
}
