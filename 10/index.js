function find_diff(input) {
  return input.reduce((counts, current, i) => {
    if (i === 0) {
      return counts;
    }
    const diff = current - input[i - 1];
    counts[diff] = (counts[diff] || 1) + 1;
    return counts;
  }, {});
}

function remove(input, i) {
  return [
    ...input.slice(0, i),
    ...input.slice(i + 1),
  ];
}

function test(input, min, max) {
  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const previous = input[i - 1];
    if (i === 0 && current - min > 3) {
      return false;
    }
    if (i === input.length - 1 && max - current > 3) {
      return false;
    }
    if (current - previous > 3) {
      return false;
    }
  }
  return true;
}

function count(input, min, max, start = 0) {
  let output = 1;
  for (let i = start; i < input.length; i++) {
    const updated = remove(input, i);
    if (test(updated, min, max)) {
      output += count(updated, min, max, i);
    }
  }
  return output;
}

module.exports = { find_diff, test , count };
