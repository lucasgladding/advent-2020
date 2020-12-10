const fs = require('fs');

const example = fs.readFileSync(__dirname + '/example.txt').toString();
const input = fs.readFileSync(__dirname + '/input.txt').toString();

const {parse, get_invalid, get_hash} = require('./index');

describe('index-a', () => {
  it('test example', () => {
    const nums = parse(example);
    const target = get_invalid(nums, 5);
    console.log('debug', target);
  });

  it('test input', () => {
    const nums = parse(input);
    const target = get_invalid(nums, 25);
    console.log('debug', target);
  });
});

describe('index-b', () => {
  it('test example', () => {
    const nums = parse(example);
    const target = get_invalid(nums, 5);
    const output = get_hash(nums, target);
    console.log('debug', output);
  });

  it('test input', () => {
    const nums = parse(input);
    const target = get_invalid(nums, 25);
    const output = get_hash(nums, target);
    console.log('debug', output);
  });
});
