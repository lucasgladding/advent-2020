function parse(input) {
  return input.split('\n').map(i => {
    const parts = i.split(' ');
    return { operator: parts[0], argument: +parts[1] };
  });
}

function run(instructions) {
  let executed = new Set();
  let acc = 0;
  let pos = 0;

  let instruction = instructions[0];
  while (instruction) {
    if (executed.has(pos)) {
      return 1;
    }
    executed.add(pos);

    const { operator, argument } = instruction;
    switch (operator) {
      case 'acc':
        acc += argument;
        pos++;
        break;
      case 'jmp':
        pos += argument;
        break;
      case 'nop':
        pos++;
        break;
      default:
        break;
    }
    instruction = instructions[pos];
  }
  return 0;
}

module.exports = { parse, run };
