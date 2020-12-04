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

function between(num, min, max) {
  return num >= min && num <= max;
}

function test_yr(input, min, max) {
  const num = +input;
  return between(num, min, max);
}

function test_hgt(input) {
  if (!input) {
    return false;
  }
  const match = input.match(/(\d+)(cm|in)/);
  if (!match) {
    return false;
  }
  const num = +match[1];
  const unit = match[2];
  switch (unit) {
    case 'cm':
      return between(num, 150, 193);
    case 'in':
      return between(num, 59, 76);
  }
}

function test_hcl(input) {
  if (!input) {
    return false;
  }
  return /^#[0-9a-f]{6}$/.test(input);
}

function test_ecl(input) {
  if (!input) {
    return false;
  }
  return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(input);
}

function test_pid(input) {
  if (!input) {
    return false;
  }
  return /^\d{9}$/.test(input);
}

function test(object) {
  return test_yr(object.byr, 1920, 2002) && 
    test_yr(object.iyr, 2010, 2020) && 
    test_yr(object.eyr, 2020, 2030) && 
    test_hgt(object.hgt) &&
    test_hcl(object.hcl) &&
    test_ecl(object.ecl) &&
    test_pid(object.pid)
    ;
}

const objects = parse(contents);

console.log('debug', objects.length);
console.log('debug', objects.filter(test).length);
