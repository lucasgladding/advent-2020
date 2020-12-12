const Heading = require('./Heading');

function to_deg(rad) {
    return rad / (Math.PI / 180);
}

function to_rad(deg) {
    return deg * (Math.PI / 180);
}

class Waypoint {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    turn(deg) {
        const hyp = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const rad = Math.atan2(this.y, this.x);
        const next = rad + to_rad(-deg);
        this.x = Math.round(Math.cos(next) * hyp);
        this.y = Math.round(Math.sin(next) * hyp);
    }
}

module.exports = Waypoint;
