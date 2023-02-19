const grid = document.getElementById('grid');
const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');

const originalGridValues = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

function createGrid() {
  // Use a deep copy of the original grid values to avoid modifying the original array
  const gridValues = JSON.parse(JSON.stringify(originalGridValues));

  // Create 9 rows
  for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    // Create 9 columns for each row
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      cell.innerText = gridValues[i][j];

      row.appendChild(cell);
    }

    // Add the row to the grid
    grid.appendChild(row);
  }
}

async function solve(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] == '.') {
        for (let number of '123456789') {
          if (isValid(number, grid, i, j)) {
            grid[i][j] = number;
            const cell = document
              .getElementsByClassName('row')
              [i].getElementsByClassName('cell')[j];
            cell.innerText = number; // update cell value on screen
            cell.classList.add('backtracking');
            await new Promise((resolve) => setTimeout(resolve, 50)); // Add delay of 50ms
            if (await solve(grid)) {
              return true;
            }
            cell.classList.remove('backtracking');
            grid[i][j] = '.';
            cell.innerText = ''; // reset cell value on screen
            await new Promise((resolve) => setTimeout(resolve, 50)); // Add delay of 50ms
          }
        }
        return false;
      } else {
        const cell = document
          .getElementsByClassName('row')
          [i].getElementsByClassName('cell')[j];
        cell.classList.add('backtracking');
      }
    }
  }

  return true;
}

function isValid(value, grid, row, col) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] == value) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (grid[i][col] == value) {
      return false;
    }
  }

  let r = 3 * Math.floor(row / 3);
  let c = 3 * Math.floor(col / 3);

  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      if (grid[i][j] == value) {
        return false;
      }
    }
  }

  return true;
}

function reset() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document
        .getElementsByClassName('row')
        [i].getElementsByClassName('cell')[j];
      cell.classList.remove('backtracking');
      cell.innerText = originalGridValues[i][j];
    }
  }
}

// Add event listeners to the buttons
solveButton.addEventListener(
  'click',
  solve.bind(this, JSON.parse(JSON.stringify(originalGridValues)))
);
resetButton.addEventListener('click', reset);

createGrid();
