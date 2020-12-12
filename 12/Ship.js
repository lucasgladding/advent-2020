class Heading {
    static HEADINGS = ['n', 'e', 's', 'w'];

    constructor(h) {
        this.name = h;
    }

    turn(d) {
        const i = Heading.HEADINGS.indexOf(this.name);
        const m = d / 90;
        const next = (i + 4 + m) % 4;
        return new Heading(Heading.HEADINGS[next]);
    }

    get_d() {
        switch (this.name) {
            case 'n':
                return [0, 1];
            case 'e':
                return [1, 0];
            case 's':
                return [0, -1];
            case 'w':
                return [-1, 0];
        }
        return [0, 0];
    }
}

class Ship {
    x = 0;
    y = 0;
    h = new Heading('e');

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
