const fs = require('fs');

function read(path) {
  return fs.readFileSync(path).toString();
}

module.exports = read;
