const read = require('../read');

const example = read(__dirname + '/example.txt');
const input = read(__dirname + '/input.txt');

function parse(input) {
    const lines = input.split('\n');
    const depart = +lines[0];
    const ids = lines[1].split(',').map(i => i === 'x' ? undefined : +i);
    return { depart, ids };
}

function get_wait(depart, id) {
    return id - (depart % id);
}

function get_min_wait_id(depart, ids) {
    const waits = ids.map(id => get_wait(depart, id));
    const min = Math.min(...waits);
    const i = waits.indexOf(min);
    return ids[i];
}

describe('part 1', () => {
    it('gets the solution for the example', () => {
        const { depart, ids } = parse(example);
        const id = get_min_wait_id(depart, ids.filter(id => id !== undefined));
        const wait = get_wait(depart, id);
        expect(id * wait).toEqual(295);
    });

    it('gets the solution for the input', () => {
        const { depart, ids } = parse(input);
        const id = get_min_wait_id(depart, ids.filter(id => id !== undefined));
        const wait = get_wait(depart, id);
        expect(id * wait).toEqual(153);
    });
});

function test_t(ids, t) {
    return ids.every(([id, i]) => {
        if (id === undefined) {
            return true;
        }
        return (t + i) % id === 0;
    });
}

function get_t(ids, start = 0) {
    for (let t = start; t > -1; t++) {
        const success = test_t(ids, t);
        if (success) {
            return t;
        }
    }
    return undefined;
}

describe('part 2', () => {
    it('gets the solution for the example', () => {
        const { ids } = parse(example);
        const buses = ids.map((id, i) => [id, i]).filter(i => i[0] !== undefined);
        const t = get_t(buses);
        expect(t).toEqual(1068781);
    });

    it('gets the solution for the input', () => {
        const { ids } = parse(input);
        const buses = ids.map((id, i) => [id, i]).filter(i => i[0] !== undefined);
        const t = get_t(buses);
        expect(t).toEqual(0);
    });
});
