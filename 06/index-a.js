const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const groups = contents.split('\n\n').map(c => c.replace(/\s+/g, ''));

const chars = 'abcdefghijklmnopqrstuvwxyz';

const yeses = groups.map(g => {
  return chars.split('').filter(c => g.includes(c)).length;
});

const sum = yeses.reduce((acc, item) => {
  return acc + item;
}, 0);

console.log('debug', sum);
