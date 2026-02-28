export default function Card({ id, name, spriteUrl, handleClick }) {
  return (
    <div
      key={id}
      id={id}
      onClick={handleClick}
      className="text-black bg-white hover:bg-gray-100 border border-gray-200 shadow-xs rounded-xl h-35 w-50 flex flex-col items-center pt-2"
    >
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <img src={spriteUrl} width={100} />
    </div>
  );
}
