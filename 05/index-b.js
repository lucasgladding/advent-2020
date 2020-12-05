const fs = require('fs');

const Seat = require('./Seat');

const contents = fs.readFileSync('./input.txt').toString();

const ids = contents.split('\n').map(input => Seat.parse(input).id).sort((a, b) => a - b);

for (let i = 0; i < ids.length; i++) {
  const prev_id = ids[i - 1];
  const this_id = ids[i];
  if (this_id - prev_id > 1) {
    console.log('missing', this_id - 1);
  }
}
