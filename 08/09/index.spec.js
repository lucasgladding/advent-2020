const fs = require('fs');

const example = fs.readFileSync(__dirname + '/example.txt').toString();
const input = fs.readFileSync(__dirname + '/input.txt').toString();

const {parse, test, find_hash} = require('./index');

describe('index-a', () => {
  it('test example', () => {
    const nums = parse(example);
    const target = test(nums, 5);
    console.log('debug', target);
  });

  it('test input', () => {
    const nums = parse(input);
    const target = test(nums, 25);
    console.log('debug', target);
  });
});

describe('index-b', () => {
  it('test example', () => {
    const nums = parse(example);
    const target = test(nums, 5);
    const set = find_hash(nums, target);
    console.log('debug', set);
  });

  it('test input', () => {
    const nums = parse(input);
    const target = test(nums, 25);
    const set = find_hash(nums, target);
    console.log('debug', set);
  });
});
