const fs = require('fs');

const { parse, run } = require('./run');

const input = fs.readFileSync(__dirname + '/input.txt').toString();

function invert(instruction) {
  switch (instruction.operator) {
    case 'jmp':
      return { operator: 'nop', argument: instruction.argument };
    case 'nop':
      return { operator: 'jmp', argument: instruction.argument };
    default:
      return instruction;
  }
}

describe('index-b', () => {
  it('runs the input', () => {
    const instructions = parse(input);

    // find instructions...
    const indexes = instructions.reduce((matches, inst, i) => {
      if (['jmp', 'nop'].includes(inst.operator)) {
        matches.push(i);
      }
      return matches;
    }, []);

    // invert instructions...
    for (let i of indexes) {
      const instruction = instructions[i];
      const tacos = [...instructions];
      tacos[i] = invert(instruction);
      const code = run(tacos);
      if (code === 0) {
        console.log('success', [code]);
      }
    }
  });
});
