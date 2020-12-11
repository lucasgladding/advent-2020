const read = require('../read');
const { find_diff, count } = require('./index');

const example_1 = read(__dirname + '/example-1.txt');
const example_2 = read(__dirname + '/example-2.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
  it('determines the differences for example 2', () => {
    const nums = example_2.split('\n').map(i => +i);
    const sorted = nums.sort((a, b) => a - b);
    const output = find_diff(sorted);
    expect(output).toEqual({ 1: 22, 3: 10 });
  });

  it('determines the differences for input', () => {
    const nums = input.split('\n').map(i => +i);
    const sorted = nums.sort((a, b) => a - b);
    const output = find_diff(sorted);
    expect(output).toEqual({ 1: 69, 3: 33 });
  });
});

describe('part 2', () => {
  it('determines the combinations for example 1', () => {
    const nums = example_1.split('\n').map(i => +i);
    const sorted = nums.sort((a, b) => a - b);
    const max = sorted[sorted.length - 1] + 3;
    const output = count(sorted, 0, max);
    expect(output).toEqual(8);
  });

  it('determines the combinations for example 2', () => {
    const nums = example_2.split('\n').map(i => +i);
    const sorted = nums.sort((a, b) => a - b);
    const max = sorted[sorted.length - 1] + 3;
    const output = count(sorted, 0, max);
    expect(output).toEqual(19208);
  });

  it('determines the combinations for input', () => {
    const nums = input.split('\n').map(i => +i);
    const sorted = nums.sort((a, b) => a - b);
    const max = sorted[sorted.length - 1] + 3;
    const output = count(sorted, 0, max);
    expect(output).toEqual(1);
  });
});
