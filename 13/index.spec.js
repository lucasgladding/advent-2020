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

function get_min_wait(depart, ids) {
    const items = ids.filter(id => id !== undefined);
    const waits = items.map(id => get_wait(depart, id));
    const wait = Math.min(...waits);
    const i = waits.indexOf(wait);
    return [wait, items[i]];
}

describe('part 1', () => {
    it('gets the solution for the example', () => {
        const { depart, ids } = parse(example);
        const [wait, id] = get_min_wait(depart, ids);
        expect(id * wait).toEqual(295);
    });

    it('gets the solution for the input', () => {
        const { depart, ids } = parse(input);
        const [wait, id] = get_min_wait(depart, ids);
        expect(id * wait).toEqual(153);
    });
});

function test_t(items, t) {
    return items.every(([id, i]) => {
        return (t + i) % id === 0;
    });
}

function get_t_1(ids) {
    const items = ids.map((id, i) => [id, i]).filter(i => i[0] !== undefined);
    const id = Math.max(...items.map(item => item[0]));
    const [increment, start] = items.find(item => item[0] === id);

    let t = 0 - start;
    while (true) {
        const success = test_t(items, t);
        if (success) {
            return t;
        }
        t += increment;
    }

    return undefined;
}

function get_t_2(ids) {
    const items = ids.map((id, i) => [id, i]).filter(i => i[0] !== undefined);

    let t = 0;
    let product = 1;
    for (let [id, i] of items) {
        do {
            t += product;
        } while ((t + i) % id !== 0);
        product *= id;
    }

    return t;
}

describe('part 2', () => {
    it('gets the solution for the example', () => {
        const { ids } = parse(example);
        const t = get_t_1(ids.slice(0, 5));
        expect(t).toEqual(1068781);
    });

    it('gets the solution for the example - 2', () => {
        const { ids } = parse(example);
        const t = get_t_1(ids.slice(0, 7));
        expect(t).toEqual(1068781);
    });

    it('gets the solution for the input', () => {
        const { ids } = parse(input);
        const t = get_t_2(ids);
        expect(t).toEqual(471793476184394);
    });
});
