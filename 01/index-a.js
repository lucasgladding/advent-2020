const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const nums = contents.split('\n').map(item => Number(item));

const sorted = nums.sort((a, b) => a - b);

for (let i = 0; i < sorted.length; i++) {
  const a = sorted[i];
  for (let j = sorted.length - 1; j > i; j--) {
    const b = sorted[j];
    const sum = a + b;
    if (sum === 2020) {
      const product = a * b;
      console.log(`${a} + ${b} = ${sum}`);
      console.log(`${a} * ${b} = ${product}`);
    }
  }
}
