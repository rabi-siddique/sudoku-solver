import getDelay from './slider.js';

let recursiveCalls = 0;
const counter = document.getElementById('counter');

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
            await new Promise((resolve) => setTimeout(resolve, getDelay())); // Add delay
            if (await solve(grid)) {
              cell.classList.remove('backtracking');
              cell.classList.add('solved');
              return true;
            }
            cell.classList.remove('backtracking');
            grid[i][j] = '.';
            cell.innerText = ''; // reset cell value on screen
            await new Promise((resolve) => setTimeout(resolve, getDelay())); // Add delay
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

export default solve;
