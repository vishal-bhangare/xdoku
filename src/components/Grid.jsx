// @ts-nocheck
import React, { useEffect, useState } from "react";
import { isValidSudoku, listToMatrix, solveSudoku } from "../functions";

const Grid = ({ grid }) => {
  const [solvedGrid, setSolvedGrid] = useState([[]]);
  const [gridArr, setGridArr] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGridArr([]);
    const elements = e.target.elements;
    for (let i = 0; i < 81; i++) {
      const value = elements[i].value;
      setGridArr((row) => [...row, value == "" ? 0 : parseInt(value)]);
    }
  };

  useEffect(() => {
    if (gridArr.length > 0)
      if (isValidSudoku(listToMatrix(gridArr, 9))) alert("Valid sudoku.");
      else alert("Invalid sudoku, Try again.");
  }, [gridArr]);
  return (
    <>
      {grid && (
        <form onSubmit={handleSubmit}>
          <div className="w-96 h-96 grid grid-cols-9 grid-row-9 m-auto bg-slate-400 p-1">
            {grid?.map((row, i) => {
              return row.map((item, j) => (
                <div
                  className={[
                    "border border-slate-300",
                    i % 3 == 0 && j % 3 == 0 ? "mt-0.5 ml-0.5" : "",
                    i % 3 == 0 && j % 3 == 1 ? "mt-0.5" : "",
                    i % 3 == 0 && j % 3 == 2 ? "mt-0.5 mr-0.5" : "",

                    i % 3 == 1 && j % 3 == 0 ? "ml-0.5" : "",
                    i % 3 == 1 && j % 3 == 2 ? "mr-0.5" : "",

                    i % 3 == 2 && j % 3 == 0 ? "mb-0.5 ml-0.5" : "",
                    i % 3 == 2 && j % 3 == 1 ? "mb-0.5" : "",
                    i % 3 == 2 && j % 3 == 2 ? "mb-0.5 mr-0.5" : "",
                  ].join(" ")}
                >
                  {
                    <input
                      type="text"
                      name={"element" + (i + 1) + "/" + (j + 1)}
                      defaultValue={item > 0 ? item : ""}
                      pattern="[1-9]{1}"
                      maxLength={1}
                      className="text-center border-none outline-none w-full h-full"
                    />
                  }
                </div>
              ));
            })}
          </div>
          <input
            type="submit"
            value={"submit"}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-1 m-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          />
        </form>
      )}
    </>
  );
};

export default Grid;
