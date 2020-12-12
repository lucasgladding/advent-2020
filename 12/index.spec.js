const read = require('../read');

const Ship = require('./Ship');
const Waypoint = require('./Waypoint');

const { parse, run_1, run_2, calc_d } = require('./index');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
    it('gets the distance for the example', () => {
        const instructions = parse(example);
        const ship = new Ship();
        run_1(ship, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(25);
    });

    it('gets the distance for the input', () => {
        const instructions = parse(input);
        const ship = new Ship();
        run_1(ship, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(938);
    });
});

describe('part 2', () => {
    it('gets the distance for the example', () => {
        const instructions = parse(example);
        const ship = new Ship();
        const waypoint = new Waypoint(10, 1);
        run_2(ship, waypoint, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(286);
    });

    it('gets the distance for the input', () => {
        const instructions = parse(input);
        const ship = new Ship();
        const waypoint = new Waypoint(10, 1);
        run_2(ship, waypoint, instructions);
        const d = calc_d(ship);
        expect(d).toEqual(54404);
    });
});
