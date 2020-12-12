const Heading = require('./Heading');

class Ship {
    constructor(x = 0, y = 0, h = 'e') {
        this.x = x;
        this.y = y;
        this.h = new Heading(h);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    turn(d) {
        this.h = this.h.turn(d);
    }

    forward(m = 1) {
        const [dx, dy] = this.h.get_d();
        this.move(dx * m, dy * m);
    }
}

module.exports = Ship;
