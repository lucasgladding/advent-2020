const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const grid = contents.split('\n').map((l) => l.split(''));

function get(grid, x, y) {
  if (!grid[y]) {
    return false;
  }
  const ax = x % grid[y].length;
  return grid[y][ax];
}

function go(grid, dx, dy) {
  let x = 0;
  let y = 0;
  let count = 0;
  do {
    const v = get(grid, x, y);
    if (v === '#') {
      count++;
    }
    x = x + dx;
    y = y + dy;
  } while (y <= grid.length);
  return count;
}

const count = go(grid, 3, 1);

console.log('count', count);
