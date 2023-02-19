const grid = document.getElementById('grid');

// Create 9 rows
for (let i = 0; i < 9; i++) {
  const row = document.createElement('div');
  row.classList.add('row');

  // Create 9 columns for each row
  for (let j = 0; j < 9; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.appendChild(cell);
  }

  // Add the row to the grid
  grid.appendChild(row);
}
