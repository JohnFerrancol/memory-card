export default function Card({ id, name, spriteUrl, handleClick }) {
  return (
    <div key={id} id={id} onClick={handleClick} className="border border-gray-200">
      <h1>{name}</h1>
      <img src={spriteUrl} />
    </div>
  );
}
