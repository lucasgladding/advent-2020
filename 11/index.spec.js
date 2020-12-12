const read = require('../read');

const { prepare, run_loop, count_occ } = require('./index');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

describe('part 1', () => {
    it('runs the example', () => {
        let seats = prepare(example);
        seats = run_loop(seats, 5);
        console.log(count_occ(seats));
    });

    it('runs the input', () => {
        let seats = prepare(input);
        seats = run_loop(seats);
        console.log(count_occ(seats));
    });
});
