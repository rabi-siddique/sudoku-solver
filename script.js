import solve from './src/solve';
import createGrid from './src/createGrid';

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
const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');

function reset() {
  window.location.reload();
}

// Add event listeners to the buttons
solveButton.addEventListener(
  'click',
  solve.bind(this, JSON.parse(JSON.stringify(originalGridValues)))
);
resetButton.addEventListener('click', reset);

createGrid(originalGridValues);
