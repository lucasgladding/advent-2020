const read = require('../read');

const example_1 = read(__dirname + '/example-1.txt');
const input = read(__dirname + '/input.txt');

class Cube {
    static parse(input) {
        return new Cube(input === '#');
    }

    constructor(on) {
        this.on = on;
    }

    debug() {
        return this.on ? '#' : '.';
    }
}

class Dimension {
    static parse(input) {
        const coords = input.split('\n').map(i => i.split('').map(i => Cube.parse(i)));
        return new Dimension([[coords]]);
    }

    constructor(coords = []) {
        this.coords = coords;
    }

    run(next) {
        const ws = this.coords;
        const zs = ws[0] || [];
        const ys = zs[0] || [];
        const xs = ys[0] || [];
        const [xmin, xmax] = this.get_min_max(xs, 1);
        const [ymin, ymax] = this.get_min_max(ys, 1);
        const [zmin, zmax] = this.get_min_max(zs, 1);
        const [wmin, wmax] = this.get_min_max(ws, 1);
        for (let w = wmin; w <= wmax; w++) {
            for (let z = zmin; z <= zmax; z++) {
                for (let y = ymin; y <= ymax; y++) {
                    for (let x = xmin; x <= xmax; x++) {
                        next(x, y, z, w);
                    }
                }
            }
        }
    }

    get_min_max(input, expand = 0) {
        return [
            Math.min(...Object.keys(input), 0) - expand,
            Math.max(...Object.keys(input), 0) + expand,
        ];
    }

    get(x, y, z, w) {
        const none = new Cube(false);
        if (!this.coords[w]) {
            return none;
        }
        if (!this.coords[w][z]) {
            return none;
        }
        if (!this.coords[w][z][y]) {
            return none;
        }
        return this.coords[w][z][y][x] || none;
    }

    set(x, y, z, w, c) {
        if (!this.coords[w]) {
            this.coords[w] = [];
        }
        if (!this.coords[w][z]) {
            this.coords[w][z] = [];
        }
        if (!this.coords[w][z][y]) {
            this.coords[w][z][y] = [];
        }
        this.coords[w][z][y][x] = c;
    }

    near(x, y, z, w) {
        const output = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = z - 1; k <= z + 1; k++) {
                    for (let l = w - 1; l <= w + 1; l++) {
                        if (i !== x || j !== y || k !== z || l !== w) {
                            output.push(this.get(i, j, k, l));
                        }
                    }
                }
            }
        }
        return output;
    }

    debug() {
        const output = [];
        const ws = this.coords;
        const zs = ws[0] || [];
        const ys = zs[0] || [];
        const xs = ys[0] || [];
        const [xmin, xmax] = this.get_min_max(xs, 1);
        const [ymin, ymax] = this.get_min_max(ys, 1);
        const [zmin, zmax] = this.get_min_max(zs, 1);
        const [wmin, wmax] = this.get_min_max(ws, 1);
        for (let w = wmin; w <= wmax; w++) {
            for (let z = zmin; z <= zmax; z++) {
                output.push(`z=${z}, w=${w}\n`);
                for (let y = ymin; y <= ymax; y++) {
                    for (let x = xmin; x <= xmax; x++) {
                        const cube = this.get(x, y, z, w);
                        output.push(cube.debug());
                    }
                    output.push('\n');
                }
                output.push('\n\n');
            }
        }
        return output.join('');
    }
}

function between(v, a, b) {
    return v >= a && v <= b;
}

function get_next(dimension, x, y, z, w) {
    const current = dimension.get(x, y, z, w);
    const count = dimension.near(x, y, z, w).filter(c => c.on).length;
    if (current.on && between(count, 2, 3)) {
        return new Cube(true);
    }
    if (!current.on && count === 3) {
        return new Cube(true);
    }
    return new Cube(false);
}

function run(input) {
    const output = new Dimension();
    input.run((x, y, z, w) => {
        const next = get_next(input, x, y, z, w);
        output.set(x, y, z, w, next);
    });
    return output;
}

function loop(input, count) {
    let dimension = input;
    for (let i = 0; i < count; i++) {
        dimension = run(dimension);
    }
    return dimension;
}

describe('part 2', () => {
    it('counts the example', () => {
        const dimension1 = Dimension.parse(example_1);
        const dimension2 = loop(dimension1, 6);
        const count = dimension2.debug().match(/#/g).length;
        expect(count).toEqual(848);
    });

    it('counts the input', () => {
        const dimension1 = Dimension.parse(input);
        const dimension2 = loop(dimension1, 6);
        const count = dimension2.debug().match(/#/g).length;
        expect(count).toEqual(1952);
    });
});
