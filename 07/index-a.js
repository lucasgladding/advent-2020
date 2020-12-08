const fs = require('fs');

const Rule = require('./Rule');

const contents = fs.readFileSync('./input.txt').toString();

const rules = contents.split('\n').map(c => Rule.parse(c));

const hash = {};

for (let r of rules) {
  for (let c of r.contents) {
    hash[c.name] = [
      ...(hash[c.name] || []),
      r,
    ];
  }
}

function get_roots(name) {
  let output = [];
  const parents = hash[name] || [];
  for (let p of parents) {
    const matches = get_roots(p.parent.name);
    output = [...output, p, ...matches];
  }
  return output;
}

const roots = get_roots('shiny gold');

const names = roots.reduce((output, item) => {
  return output.add(item.parent.name);
}, new Set());

console.log(names.size);
