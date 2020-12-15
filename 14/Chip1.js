class Chip1 {
    constructor() {
        this.memory = [];
    }

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
                    this.memory[+address] = this.mask(argument, mask);
                    break;
            }
        }
    }

    mask(input, mask) {
        const string = parseInt(input).toString(2).padStart(36, '0');
        return string.split('').map((char, i) => {
            return mask[i] === 'X' ? char : mask[i];
        }).join('');
    }

    sum() {
        return Object.values(this.memory).reduce((output, value) => {
            return output + parseInt(value, 2);
        }, 0);
    }
}

module.exports = Chip1;
