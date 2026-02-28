export default function Card({ id, name, spriteUrl, handleClick }) {
  return (
    <div key={id} onClick={handleClick}>
      <h1>{name}</h1>
      <img src={spriteUrl} />
    </div>
  );
}
