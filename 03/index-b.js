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

const count_a = go(grid, 1, 1);
const count_b = go(grid, 3, 1);
const count_c = go(grid, 5, 1);
const count_d = go(grid, 7, 1);
const count_e = go(grid, 1, 2);

console.log('product', count_a * count_b * count_c * count_d * count_e);
