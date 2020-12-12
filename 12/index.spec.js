const read = require('../read');

const Ship = require('./Ship');
const { parse, run, calc_d } = require('./index');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
    it('gets the distance for the example', () => {
        const instructions = parse(example);
        const ship = new Ship();
        run(ship, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(25);
    });

    it('gets the distance for the input', () => {
        const instructions = parse(input);
        const ship = new Ship();
        run(ship, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(938);
    });
});
