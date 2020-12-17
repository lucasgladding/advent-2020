const read = require('../read');

const Field = require('./Field');
const Ticket = require('./Ticket');

const example_1 = read(__dirname + '/example-1.txt');
const example_2 = read(__dirname + '/example-2.txt');
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

function map_field(ticket, fields) {
  return ticket.values.map((v) => {
    return fields.filter(f => f.test(v)).map(f => f.name);
  });
}

function intersect(a, b) {
  return a.filter(v => b.includes(v));
}

function intersect_field(matches) {
  return matches.slice(1).reduce((output, current, j) => {
    return output.map((field, i) => {
      return intersect(field, current[i]);
    });
  }, matches[0]);
}

function flatten(input) {
  return input.reduce((output, i) => {
    return [...output, ...i]
  }, []);
}

function get_unique_field(input) {
  const found = flatten(input.filter(i => i.length === 1));
  if (found.length === input.length) {
    return input;
  }
  const remaining = input.map((i) => {
    if (i.length === 1) {
      return i;
    }
    return i.filter(i => !found.includes(i));
  });
  return get_unique_field(remaining);
}

describe('part 2', () => {
  it('calculates the order for example 2', () => {
    const sections = example_2.split('\n\n');
    const fields = parse_fields(sections[0]);
    const tickets = parse_tickets(sections[2]);
    const matches = tickets.map(t => map_field(t, fields));
    const names = flatten(get_unique_field(intersect_field(matches)));
    console.log('debug', names);
  });

  function get_product(names, ticket) {
    const indexes = names.reduce((output, name, i) => {
      if (name.includes('departure')) {
        output.push(i);
      }
      return output;
    }, []);
    return indexes.reduce((output, i) => {
      return output * ticket.values[i];
    }, 1);
  }

  it('calculates the order for input', () => {
    const sections = input.split('\n\n');
    const fields = parse_fields(sections[0]);
    const mine = parse_tickets(sections[1])[0];
    const tickets = parse_tickets(sections[2]);
    const matches = tickets.filter(t => t.test(fields)).map(t => map_field(t, fields));
    const names = flatten(get_unique_field(intersect_field(matches)));
    const product = get_product(names, mine);
    expect(product).toEqual(3173135507987);
  });
});
