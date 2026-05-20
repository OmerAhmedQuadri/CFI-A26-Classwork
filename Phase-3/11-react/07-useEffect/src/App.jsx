import React, { useEffect, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count])
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "10px"
    }}>
      <h1>Count {count}</h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
      }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "green", color: "white" }}
          >Increment</button>
        <button 
          onClick={() => setCount(Math.max(0, count - 1))}
          style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "red", color: "white" }}
          >Decrement</button>
      </div>
      <p>Designed with ❤️ by Team CFI {count}</p>
    </div>
  );
};

export default App;