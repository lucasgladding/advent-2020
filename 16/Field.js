class Field {
  static parse(input) {
    const [name, value] = input.split(': ');
    const ranges = value.split(' or ').map((r) => {
      return r.split('-').map(r => +r)
    });
    return new Field(name, ranges);
  }

  constructor(name, ranges) {
    this.name = name;
    this.ranges = ranges;
  }

  test(input) {
    return this.ranges.some((r) => {
      return input >= r[0] && input <= r[1];
    });
  }
}

module.exports = Field;
