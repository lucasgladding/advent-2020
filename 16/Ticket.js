class Ticket {
  static parse(input) {
    const values = input.split(',').map(i => +i);
    return new Ticket(values);
  }

  constructor(values) {
    this.values = values;
  }

  test(fields, errors = []) {
    return this.values.every((v) => {
      const success = fields.some(f => f.test(v));
      if (!success) {
        errors.push(v);
      }
      return success;
    })
  }
}

module.exports = Ticket;
