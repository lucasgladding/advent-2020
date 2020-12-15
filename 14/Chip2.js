const Chip = require('./Chip');

class Chip2 extends Chip {
    run(instructions) {
        let mask = '000000000000000000000000000000000000';
        for (let i of instructions) {
            const match = i.match(/^(\w+)(\[(\d+)])? = (.+)$/);
            const operation = match[1];
            const address = match[3];
            const argument = match[4];

            switch (operation) {
                case 'mask':
                    mask = argument;
                    break;
                case 'mem':
                    this.addresses(address, mask).forEach((address) => {
                        this.memory[address] = +argument;
                    });
                    break;
            }
        }
    }

    addresses(input, mask) {
        const masked = this.mask(input, mask);
        return this.populate(masked).map(input => parseInt(input, 2));
    }

    mask(input, mask) {
        const string = parseInt(input).toString(2).padStart(36, '0');
        return string.split('').map((char, i) => {
            return mask[i] === '0' ? char : mask[i];
        }).join('');
    }

    populate(input) {
        const i = input.indexOf('X');
        if (i === -1) {
            return [input];
        }
        return [
            ...this.populate(input.slice(0, i) + '0' + input.slice(i + 1)),
            ...this.populate(input.slice(0, i) + '1' + input.slice(i + 1)),
        ];
    }
}

module.exports = Chip2;


