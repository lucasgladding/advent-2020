const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

function parse(input) {
  return input.split("\n\n")
    .map(l => l.split(/\s/))
    .map(l => {
      return l.reduce((object, input) => {
        const parts = input.split(':');
        return {
          ...object,
          [parts[0]]: parts[1],
        };
      }, {});
    });
}

function test(object) {
  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const missing = required.some((field) => {
    return !object[field];
  });
  return !missing;
}

const objects = parse(contents);

console.log('debug', objects.length);
console.log('debug', objects.filter(test).length);
