const read = require('../read');

const Field = require('./Field');
const Ticket = require('./Ticket');

const example_1 = read(__dirname + '/example-1.txt');
const input = read(__dirname + '/input.txt');

function parse_fields(input) {
  return input.split('\n').map(i => Field.parse(i));
}

function parse_tickets(input) {
  return input.split('\n').slice(1).map(i => Ticket.parse(i));
}

function sum(input) {
  return input.reduce((output, i) => {
    return output + i;
  }, 0);
}

describe('part 1', () => {
  it('calculates the errors for example 1', () => {
    const sections = example_1.split('\n\n');
    const fields = parse_fields(sections[0]);
    const tickets = parse_tickets(sections[2]);
    const errors = [];
    tickets.filter(t => t.test(fields, errors));
    expect(sum(errors)).toEqual(71);
  });

  it('calculates the errors for input', () => {
    const sections = input.split('\n\n');
    const fields = parse_fields(sections[0]);
    const tickets = parse_tickets(sections[2]);
    const errors = [];
    tickets.filter(t => t.test(fields, errors));
    expect(sum(errors)).toEqual(27870);
  });
});
