const fs = require('fs');

const { parse, run } = require('./run');

const input = fs.readFileSync(__dirname + '/input.txt').toString();

describe('index-a', () => {
  it('runs the input', () => {
    const instructions = parse(input);
    console.log('output', run(instructions));
  });
});
