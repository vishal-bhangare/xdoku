import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import { generateSudoku } from "./functions";

function App() {
  const [grid, setGrid] = useState([[]]);
  const generateGrid = () => {
    setGrid(() => [[]]);
    setTimeout(() => {
      setGrid(() => generateSudoku(40));
    }, 100);
  };
  useEffect(() => {
    generateGrid();
  }, []);
  return (
    <div className=" h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold m-auto">Welcome to xdoku</h1>
      <div className="w-96">
        <button
          onClick={generateGrid}
          className="text-white bg-blue-700 h-fit w-fit hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 m-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New
        </button>
      </div>
      <Grid grid={grid} />
    </div>
  );
}

export default App;
