const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const lines = contents.split('\n');

function parse(input) {
  const pattern = /(\d+)-(\d+) (\w): (\w+)/i;
  const data = pattern.exec(input);
  const l = +data[1];
  const r = +data[2];
  const char = data[3];
  const password = data[4];
  return { l, r, char, password };
}

function test(input) {
  const { l, r, char, password } = parse(input);
  let count = 0;
  for (let p of password) {
    if (p === char) {
      count++;
    }
  }
  return count >= l && count <= r;
}

const passes = lines.map(l => test(l)).filter(l => l === true);

console.log(passes.length);
