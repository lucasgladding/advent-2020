const read = require('../read');

const Chip1 = require('./Chip1');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
    it('gets the solution for the example', () => {
        const instructions = example.split('\n');
        const chip = new Chip1();
        chip.run(instructions);
        expect(chip.sum()).toEqual(165);
    });

    it('gets the solution for the input', () => {
        const instructions = input.split('\n');
        const chip = new Chip1();
        chip.run(instructions);
        expect(chip.sum()).toEqual(7611244640053);
    });
});
