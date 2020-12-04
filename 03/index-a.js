const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const grid = contents.split('\n').map((l) => l.split(''));

function get(grid, x, y) {
  if (!grid[y]) {
    return false;
  }
  const length = grid[y].length;
  return grid[y][x % length];
}

function tree(grid, x, y) {
  return get(grid, x, y) === '#';
}

function go(grid, dx, dy) {
  let x = 0;
  let y = 0;
  let count = 0;
  do {
    if (tree(grid, x, y)) {
      count++;
    }
    x += dx;
    y += dy;
  } while (y <= grid.length);
  return count;
}

const count = go(grid, 3, 1);

console.log('count', count);
