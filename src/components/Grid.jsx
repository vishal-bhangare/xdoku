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
          <table className="w-96 h-96 border-collapse border-2 border-slate-400 m-auto">
            <tbody className="grid grid-cols-1 grid-rows-9 w-full h-full">
              {grid?.map((row, idx) => (
                <tr
                  className={["grid grid-cols-9 grid-rows-1"].join(" ")}
                  key={idx}
                >
                  {row.map((item, i) => (
                    <td
                      className={[
                        "border-2 border-slate-400",
                        (i + 1) % 3 == 0 && i < 8
                          ? "border-r-2 border-r-slate-500"
                          : "border-slate-400",
                        ,
                        (idx + 1) % 3 == 0 && idx < 8
                          ? "border-b-2 border-b-slate-500"
                          : "border-slate-400",
                      ].join(" ")}
                      key={i}
                    >
                      <input
                        type="text"
                        name={"element" + (idx + 1) + "/" + (i + 1)}
                        defaultValue={item > 0 ? item : ""}
                        pattern="[1-9]{1}"
                        maxLength={1}
                        className="text-center border-none outline-none w-full h-full"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
