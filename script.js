const grid = document.getElementById('grid');

function createGrid() {
  const gridValues = [
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
  // Create 9 rows
  for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    // Create 9 columns for each row
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (gridValues[i][j] !== '.') {
        cell.innerText = gridValues[i][j];
      }
      row.appendChild(cell);
    }

    // Add the row to the grid
    grid.appendChild(row);
  }
}

createGrid();
