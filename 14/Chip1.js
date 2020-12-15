const Chip = require('./Chip');

class Chip1 extends Chip {
    run(instructions) {
        let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
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
                    const value = parseInt(this.mask(argument, mask), 2)
                    this.memory[+address] = value;
                    break;
            }
        }
    }

    mask(input, mask) {
        const string = this.parse(input);
        return string.split('').map((char, i) => {
            return mask[i] === 'X' ? char : mask[i];
        }).join('');
    }
}

module.exports = Chip1;
