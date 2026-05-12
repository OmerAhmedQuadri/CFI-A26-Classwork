import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-black text-white gap-3"
    >
      <h1 className={`font-bold text-3xl ${count >= 0 ? 'text-green-500' : 'text-red-500'}`}>Colour: {count}</h1>
      <div className="flex flex-row gap-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count + 1)}
        >Increment</button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count - 1)}
        >Decrement</button>
      </div>
    </div>
  );
};

export default App;
