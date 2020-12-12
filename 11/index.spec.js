const clone = require('lodash.clonedeep');

const read = require('../read');

const { prepare } = require('./index');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

function is_occ(seats, x, y, dx, dy, m = 1) {
    if (!seats[y + dy * m]) {
        return false;
    }
    const v = seats[y + dy * m][x + dx * m];
    if (v === '.') {
        return is_occ(seats, x, y, dx, dy, m + 1);
    }
    return v === '#';
}

function count_adj(seats, x, y) {
    return [
        is_occ(seats, x, y, 0, 1),
        is_occ(seats, x, y, 1, 1),
        is_occ(seats, x, y, 1, 0),
        is_occ(seats, x, y, 1, -1),
        is_occ(seats, x, y, 0, -1),
        is_occ(seats, x, y, -1, -1),
        is_occ(seats, x, y, -1, 0),
        is_occ(seats, x, y, -1, 1),
    ].filter(i => i === true).length;
}

function run(input) {
    const output = clone(input);
    let count = 0;
    for (let y = 0; y < input.length; y++) {
        const r = input[y];
        for (let x = 0; x < r.length; x++) {
            const s = input[y][x];
            if (s === 'L' && count_adj(input, x, y) === 0) {
                output[y][x] = '#';
                count++;
            }
            if (s === '#' && count_adj(input, x, y) >= 5) {
                output[y][x] = 'L';
                count++;
            }
        }
    }
    return [output, count];
}

function run_loop(input) {
    let seats = input;
    do {
        [seats, count] = run(seats);
    } while (count > 0);
    return seats;
}

function debug(input) {
    return input.map(i => i.join('')).join('\n');
}

function count_occ(seats) {
    const output = debug(seats);
    const matches = output.match(/#/g);
    return matches.length;
}

describe('part 1', () => {
    it('runs the example', () => {
        let seats = prepare(example);
        seats = run_loop(seats, 5);
        console.log(debug(seats));
    });

    it('runs the input', () => {
        let seats = prepare(input);
        seats = run_loop(seats);
        console.log(count_occ(seats));
    });
});
