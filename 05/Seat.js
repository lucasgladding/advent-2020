class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  get size() {
    return this.max - this.min + 1;
  }

  get lower() {
    return new Range(this.min, this.min + this.size / 2 - 1);
  }

  get upper() {
    return new Range(this.min + this.size / 2, this.min + this.size - 1);
  }
}

const ROWS_RANGE = new Range(0, 127);
const ROWS_MAP = { F: 'lower', B: 'upper' };
const COLS_RANGE = new Range(0, 7);
const COLS_MAP = { L: 'lower', R: 'upper' };

class Seat {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  static parse(input) {
    const rows = Seat.parse_range(input.substring(0, 7).split(''), ROWS_RANGE, ROWS_MAP);
    const cols = Seat.parse_range(input.substring(7).split(''), COLS_RANGE, COLS_MAP);
    return new Seat(rows.min, cols.min);
  }

  static parse_range(input, range, map) {
    if (!input.length) {
      return range;
    }
    const [code, ...remaining] = input;
    const prop = map[code];
    return Seat.parse_range(remaining, range[prop], map);
  }

  get id() {
    return this.row * 8 + this.col;
  }
}

module.exports = Seat;
