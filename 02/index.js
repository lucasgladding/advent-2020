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

function test_1(input) {
  const { l, r, char, password } = parse(input);
  const count = password.split('').filter(p => p === char).length;
  return count >= l && count <= r;
}

function test_2(input) {
  const { l, r, char, password } = parse(input);
  return (password[l - 1] === char ^ password[r - 1] === char) > 0;
}

console.log(lines.map(l => test_1(l)).filter(l => l === true).length);
console.log(lines.map(l => test_2(l)).filter(l => l === true).length);
