const grid = document.getElementById('grid');
const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');
const counter = document.getElementById('counter');
let recursiveCalls = 0;

const dot = document.querySelector('.dot');
const slider = document.querySelector('.slider');
let delay = 50;

function updateValue() {
  document.querySelector('.value').innerHTML = delay;
}

// function to handle dot movement
function moveDot(event) {
  // calculate the new position of the dot
  let dotPosition = event.clientX - slider.offsetLeft;
  // make sure the dot stays within the slider
  if (dotPosition < 0) {
    dotPosition = 0;
  } else if (dotPosition > slider.offsetWidth) {
    dotPosition = slider.offsetWidth;
  }
  // calculate the delay value based on the dot position
  delay = Math.round((dotPosition / slider.offsetWidth) * 100);
  // update the value element and delay variable
  updateValue();
  // update the position of the dot
  dot.style.left = `${dotPosition}px`;
}

// add event listeners for dot movement
dot.addEventListener('mousedown', () => {
  dot.classList.add('active-dot');
  document.addEventListener('mousemove', moveDot);
});
document.addEventListener('mouseup', () => {
  dot.classList.remove('active-dot');
  document.removeEventListener('mousemove', moveDot);
});
document.addEventListener('mouseleave', () => {
  dot.classList.remove('active-dot');
  document.removeEventListener('mousemove', moveDot);
});

// update the initial value element and delay variable
updateValue();

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
  recursiveCalls += 1;
  counter.textContent = `Number of recursive calls: ${recursiveCalls}`;
  counter.style.backgroundColor = '#333';
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
            await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay of 50ms
            if (await solve(grid)) {
              cell.classList.remove('backtracking');
              cell.classList.add('solved');
              return true;
            }
            cell.classList.remove('backtracking');
            grid[i][j] = '.';
            cell.innerText = ''; // reset cell value on screen
            await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay of 50ms
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
  window.location.reload();
}

// Add event listeners to the buttons
solveButton.addEventListener(
  'click',
  solve.bind(this, JSON.parse(JSON.stringify(originalGridValues)))
);
resetButton.addEventListener('click', reset);

createGrid();
