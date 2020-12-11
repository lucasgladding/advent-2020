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

function test(input) {
  for (let i = 1; i < input.length; i++) {
    const current = input[i];
    const previous = input[i - 1];
    if (current - previous > 3) {
      return false;
    }
  }
  return true;
}

function find_i(input) {
  for (let i = 1; i < input.length; i++) {
    const current = input[i];
    const previous = input[i - 1];
    if (current - previous === 3) {
      return i;
    }
  }
  return undefined;
}

function count_1(input, start = 1) {
  let output = 1;
  for (let i = start; i < input.length - 1; i++) {
    const updated = remove(input, i);
    if (test(updated)) {
      output += count_1(updated, i);
    }
  }
  return output;
}

function count_2(input, start = 1) {
  const groups = [];
  let i = 0;
  let next = input;
  while (i = find_i(next)) {
    groups.push(next.slice(0, i));
    next = next.slice(i);
  }
  return groups.reduce((output, group) => {
    return output * count_1(group);
  }, 1);
}

module.exports = { find_diff, count_1, count_2 };
