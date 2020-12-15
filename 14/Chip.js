class Chip {
    constructor() {
        this.memory = [];
    }

    parse(input) {
        return parseInt(input).toString(2).padStart(36, '0');
    }

    sum() {
        return Object.values(this.memory).reduce((output, value) => {
            return output + value;
        }, 0);
    }
}

module.exports = Chip;
