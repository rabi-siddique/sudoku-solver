import solve from './src/solve';
import originalGridValues from './grid';

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
