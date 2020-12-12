function parse(input) {
    return input.split('\n').map(i => {
        return [
            i.slice(0, 1),
            +i.slice(1),
        ];
    });
}

function run(ship, instructions) {
    for (let i of instructions) {
        const [ins, arg] = i;
        switch (ins) {
            case 'N':
                ship.move(0, arg);
                break;
            case 'S':
                ship.move(0, -arg);
                break;
            case 'E':
                ship.move(arg, 0);
                break;
            case 'W':
                ship.move(-arg, 0);
                break;
            case 'L':
                ship.turn(-arg);
                break;
            case 'R':
                ship.turn(arg);
                break;
            case 'F':
                ship.forward(arg);
                break;
        }
    }
}

function calc_d(ship) {
    return Math.abs(ship.x) + Math.abs(ship.y);
}

module.exports = { parse, run, calc_d };
