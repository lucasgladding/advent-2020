const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const nums = contents.split('\n').map(item => parseInt(item));

const sorted = nums.sort((a, b) => a - b);

for (let i = 0; i < sorted.length; i++) {
  const a = sorted[i];
  for (let j = sorted.length - 1; j > i; j--) {
    const b = sorted[j];
    for (let k = i + 1; k < j; k++) {
      const c = sorted[k];
      const sum = a + b + c;
      if (sum === 2020) {
        const product = a * b * c;
        console.log(`${a} + ${b} + ${c} = ${sum}`);
        console.log(`${a} * ${b} * ${c} = ${product}`);
      }
   }
  }
}
