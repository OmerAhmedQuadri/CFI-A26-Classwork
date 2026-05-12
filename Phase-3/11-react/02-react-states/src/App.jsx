import React from "react";
import "./App.css";
const App = () => {
  const [count, setCount] = React.useState(0);
  function clickHandler() {
    setCount(count + 1);
  }
  return (
    <div className="container">
      <h1>Current count: {count}</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={clickHandler}>Increment</button>
        <button onClick={() => setCount(Math.max(0, count - 1))}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default App;

// // import React from "react";

// // const App = () => {
// //   const statesManagementArray = React.useState(100);
// //   console.log(statesManagementArray);
// //   return (
// //     <>
// //       <h1>Current count: {statesManagementArray[0]}</h1>
// //       <button
// //         onClick={() => {
// //           const c = statesManagementArray[0];
// //           statesManagementArray[1](c + 1);
// //         }}
// //       >Increment</button>
// //     </>
// //   );
// // };

// // export default App;

// import React from "react";

// const App = () => {
//   const [count, setCount] = React.useState(0);
//   return (
//     <>
//       <h1>Current count: {count}</h1>
//       <button
//         onClick={() => setCount(count + 1)}
//       >Increment</button>
//     </>
//   );
// };

// export default App;
