const read = require('../read');

const Chip1 = require('./Chip1');
const Chip2 = require('./Chip2');

const example_1 = read(__dirname + '/example-1.txt');
const example_2 = read(__dirname + '/example-2.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
    it('gets the solution for the example', () => {
        const instructions = example_1.split('\n');
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

describe('part 2', () => {
    it('gets the solution for the example', () => {
        const instructions = example_2.split('\n');
        const chip = new Chip2();
        chip.run(instructions);
        expect(chip.sum()).toEqual(208);
    });

    it('gets the solution for the input', () => {
        const instructions = input.split('\n');
        const chip = new Chip2();
        chip.run(instructions);
        expect(chip.sum()).toEqual(3705162613854);
    });
});
