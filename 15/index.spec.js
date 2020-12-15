function update(logs, input, i) {
    const items = logs[input] || [];
    logs[input] = [...items.slice(-1), i];
}

function get(last, logs, i) {
    const items = logs[last] || [];
    const length = items.length;
    if (length < 2) {
        return 0;
    }
    return items[length - 1] - items[length - 2];
}

function run(start, target) {
    let last = undefined;
    const logs = {};
    for (let i = 0; i < start.length; i++) {
        const input = start[i];
        update(logs, input, i);
        last = input;
    }
    for (let j = start.length; j < target; j++) {
        const input = get(last, logs, j);
        update(logs, input, j);
        last = input;
    }
    return last;
}

describe('part 1', () => {
    it('gets example 1', () => {
        const output = run([3, 2, 1], 2020);
        expect(output).toEqual(438);
    });

    it('gets example 6', () => {
        const output = run([3, 1, 2], 2020);
        expect(output).toEqual(1836);
    });

    it('gets the input', () => {
        const output = run([11, 18, 0, 20, 1, 7, 16], 2020);
        expect(output).toEqual(639);
    });
});

describe('part 2', () => {
    it('gets the input', () => {
        const output = run([11, 18, 0, 20, 1, 7, 16], 30000000);
        expect(output).toEqual(266);
    });
});
