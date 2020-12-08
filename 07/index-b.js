const fs = require('fs');

const Rule = require('./Rule');

const contents = fs.readFileSync('./input.txt').toString();

const rules = contents.split('\n').map(c => Rule.parse(c));

const hash = {};

for (let r of rules) {
  hash[r.parent.name] = r;
}

function build(name, num = 1) {
  const item = hash[name];
  if (!item) {
    return undefined;
  }
  return new Rule(
    item.parent.times(num),
    item.contents.map(c => build(c.name, c.num * num))
  );
}

const tree = build('shiny gold');

function count_num(node) {
  if (!node) {
    return 0;
  }
  return node.parent.num + node.contents.reduce((num, item) => {
    return num + count_num(item);
  }, 0);
}

console.log('debug', count_num(tree) - 1);
