class Component {
  constructor(num, name) {
    this.num = num;
    this.name = name;
  }

  static parse(input) {
    const matches = input.match(/^(\d+)? ?(.+) bags?.?$/);
    const num = +(matches[1] || 1);
    const name = matches[2];
    return new Component(num, name);
  }

  times(num) {
    return new Component(this.num * num, this.name);
  }
}

class Rule {
  constructor(parent, contents) {
    this.parent = parent;
    this.contents = contents;
  }

  static parse(input) {
    const parts = input.split(' contain ');
    const parent = Component.parse(parts[0]);
    if (parts[1] === 'no other') {
      return new Rule(parent, []);
    }
    const contents = parts[1].split(', ').map(i => Component.parse(i));
    return new Rule(parent, contents);
  }

  contains(name) {
    return this.contents.some(c => c.name === name);
  }

  times(num) {
    const contents = this.contents.map(c => c.times(num));
    return new Rule(this.parent, contents);
  }
}

module.exports = Rule;
