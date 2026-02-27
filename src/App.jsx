import { useState } from 'react';
import './styles/App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold">{count}</h1>
      <button className="bg-blue-700 text-white-700" onClick={handleClick}>
        count
      </button>
    </div>
  );
}

export default App;
