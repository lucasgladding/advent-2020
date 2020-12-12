const clone = require('lodash.clonedeep');

const read = require('../read');

const { prepare } = require('./index');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

function is_occ(seats, x, y) {
    if (!seats[y]) {
        return false;
    }
    return seats[y][x] === '#';
}

function count_occ(seats, x, y) {
    return [
        is_occ(seats, x, y + 1),
        is_occ(seats, x + 1, y + 1),
        is_occ(seats, x + 1, y),
        is_occ(seats, x + 1, y - 1),
        is_occ(seats, x, y - 1),
        is_occ(seats, x - 1, y - 1),
        is_occ(seats, x - 1, y),
        is_occ(seats, x - 1, y + 1),
    ].filter(i => i === true).length;
}

function run(input) {
    const output = clone(input);
    for (let y = 0; y < input.length; y++) {
        const r = input[y];
        for (let x = 0; x < r.length; x++) {
            const s = input[y][x];
            if (s === 'L' && count_occ(input, x, y) === 0) {
                output[y][x] = '#';
            }
            if (s === '#' && count_occ(input, x, y) >= 4) {
                output[y][x] = 'L';
            }
        }
    }
    return output;
}

function run_loop(input, count) {
    let seats = input;
    for (let i = 0; i < count; i++) {
        seats = run(seats);
    }
    return seats;
}

function debug(input) {
    return input.map(i => i.join('')).join('\n');
}

describe('part 1', () => {
    it('runs the example', () => {
        let seats = prepare(example);
        seats = run_loop(seats, 5);
        console.log(debug(seats));
    });

    it('runs the input', () => {
        let seats = prepare(input);
        seats = run_loop(seats, 5000);
        console.log(debug(seats));
    });
});
