export default function Button({ text, handleButtonClick }) {
  return (
    <button
      className="bg-white text-black px-5 py-2 rounded-xl border border-gray-500 shadow-xl"
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}
