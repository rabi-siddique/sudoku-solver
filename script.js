import solve from './src/solve';

const grid = document.getElementById('grid');
const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');

const slider = document.querySelector('.slider');
const dot = document.querySelector('.dot');
const value = document.querySelector('.value');
const progressBar = document.querySelector('.progress-bar');

let delay = 50;

function setDelay(newValue) {
  delay = newValue;
  value.textContent = newValue;
}

function setProgress(value) {
  progressBar.style.width = value + '%';
}

function setDotPosition(x) {
  if (x < 0) {
    x = 0;
  } else if (x > slider.offsetWidth - dot.offsetWidth) {
    x = slider.offsetWidth - dot.offsetWidth;
  }
  dot.style.left = x + 'px';
}

function onMouseMove(event) {
  let x = event.pageX - slider.getBoundingClientRect().left;
  x -= dot.offsetWidth / 2;
  if (x < 0) {
    x = 0;
  } else if (x > slider.offsetWidth - dot.offsetWidth) {
    x = slider.offsetWidth - dot.offsetWidth;
  }
  setDotPosition(x);
  const progress = (x / (slider.offsetWidth - dot.offsetWidth)) * 100;
  setProgress(progress);
  setDelay(Math.round(progress));
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  dot.style.pointerEvents = 'auto';
}

slider.addEventListener('mousedown', function (event) {
  event.preventDefault();
  dot.style.pointerEvents = 'none';
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

dot.addEventListener('mousedown', function (event) {
  event.preventDefault();
  dot.style.pointerEvents = 'none';
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

setProgress(delay);
const initialDotPosition = Math.floor(((delay - 1) / 100) * slider.offsetWidth);
setDotPosition(initialDotPosition);
value.textContent = delay;

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
