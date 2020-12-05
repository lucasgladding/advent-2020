const fs = require('fs');

const Seat = require('./Seat');

const contents = fs.readFileSync('./input.txt').toString();

const ids = contents.split('\n').map(input => Seat.parse(input).id);

console.log('debug', Math.max(...ids));
