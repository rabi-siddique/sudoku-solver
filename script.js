import solve from './src/solve';
import createGrid from './src/createGrid';

const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');

let delay = 50;

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

function reset() {
  window.location.reload();
}

// Add event listeners to the buttons
solveButton.addEventListener(
  'click',
  solve.bind(this, [JSON.parse(JSON.stringify(originalGridValues)), delay])
);
resetButton.addEventListener('click', reset);

createGrid();
