function parse(input) {
    return input.split('\n').map(i => {
        return [
            i.slice(0, 1),
            +i.slice(1),
        ];
    });
}

function run_1(ship, instructions) {
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

function run_2(ship, waypoint, instructions) {
    for (let i of instructions) {
        const [ins, arg] = i;
        switch (ins) {
            case 'N':
                waypoint.move(0, arg);
                break;
            case 'S':
                waypoint.move(0, -arg);
                break;
            case 'E':
                waypoint.move(arg, 0);
                break;
            case 'W':
                waypoint.move(-arg, 0);
                break;
            case 'L':
                waypoint.turn(-arg);
                break;
            case 'R':
                waypoint.turn(arg);
                break;
            case 'F':
                ship.move(waypoint.x * arg, waypoint.y * arg);
                break;
        }
    }
}

function calc_d(ship) {
    return Math.abs(ship.x) + Math.abs(ship.y);
}

module.exports = { parse, run_1, run_2, calc_d };
