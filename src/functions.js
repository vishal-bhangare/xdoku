export function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}
export function generateSudoku(blankCount) {
  // @ts-ignore
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill the main diagonal of the grid
  fillDiagonal(grid);

  // Try to fill the entire grid
  if (solveSudoku(grid)) {
    if (blankCount)
      createBlankSpaces(grid, blankCount)
    return grid;
  } else {
    // If a solution is not possible, regenerate the grid
    return generateSudoku();
  }
}

function fillDiagonal(grid) {
  for (let i = 0; i < 9; i += 3) {
    fillBox(grid, i, i);
  }
}

function fillBox(grid, row, col) {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(values);

  let valIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[row + i][col + j] = values[valIndex];
      valIndex++;
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isSafe(grid, row, col, num) {
  // Check if 'num' is not present in the current row, column, and the 3x3 subgrid
  return (
    !usedInRow(grid, row, num) &&
    !usedInCol(grid, col, num) &&
    !usedInBox(grid, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(grid, row, num) {
  return grid[row].includes(num);
}

function usedInCol(grid, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(grid, startRow, startCol, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return true;
      }
    }
  }
  return false;
}

function findUnassignedLocation(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null;
}

export function solveSudoku(grid) {
  if (grid.length < 9)
    return false
  const emptyLocation = findUnassignedLocation(grid);

  if (!emptyLocation) {
    // No unassigned location, the grid is solved
    return true;
  }

  const { row, col } = emptyLocation;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      // Try assigning the current number
      grid[row][col] = num;

      // Recursively try to solve the rest of the grid
      if (solveSudoku(grid)) {
        return true;
      }

      // If the current assignment does not lead to a solution, backtrack
      grid[row][col] = 0;
    }
  }

  // No number can be assigned, backtrack
  return false;
}

export function createBlankSpaces(grid, blankCount) {
  // Randomly remove numbers to create blank spaces
  // const blankCount = Math.floor(Math.random() * 20) + 15;

  for (let i = 0; i <= blankCount; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    // Set the cell value to 0 to represent a blank space
    grid[row][col] = 0;
  }
}
export function isValidSudoku(board) {
  // Check rows
  for (let i = 0; i < 9; i++) {
    if (!isValidSet(board[i])) {
      return false;
    }
  }

  // Check columns
  for (let i = 0; i < 9; i++) {
    const column = [];
    for (let j = 0; j < 9; j++) {
      column.push(board[j][i]);
    }
    if (!isValidSet(column)) {
      return false;
    }
  }

  // Check 3x3 subgrids
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const subgrid = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          subgrid.push(board[i + x][j + y]);
        }
      }
      if (!isValidSet(subgrid)) {
        return false;
      }
    }
  }

  return true;
}

function isValidSet(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (num !== 0 && seen.has(num)) {
      return false;
    }
    seen.add(num);
  }
  return true;
}
