const read = require('../read');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

function use_bitmask(input, mask) {
    const string = parseInt(input).toString(2).padStart(36, '0');
    return string.split('').map((char, i) => {
        return mask[i] === 'X' ? char : mask[i];
    }).join('');
}

function run(instructions) {
    const memory = [];
    let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    for (let i of instructions) {
        const match = i.match(/^(\w+)(\[(\d+)])? = (.+)$/);
        const operation = match[1];
        const address = match[3];
        const argument = match[4];

        switch (operation) {
            case 'mask':
                mask = argument;
                break;
            case 'mem':
                memory[+address] = use_bitmask(argument, mask);
                break;
        }
    }
    return memory;
}

function sum(memory) {
    return Object.values(memory).reduce((output, value) => {
        return output + parseInt(value, 2);
    }, 0);
}

describe('part 1', () => {
    it('gets the solution for the example', () => {
        const lines = example.split('\n');
        const memory = run(lines);
        const output = sum(memory);
        expect(output).toEqual(165);
    });

    it('gets the solution for the input', () => {
        const lines = input.split('\n');
        const memory = run(lines);
        const output = sum(memory);
        expect(output).toEqual(7611244640053);
    });
});
