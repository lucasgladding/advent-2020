function parse(input) {
  return input.split('\n').map(i => +i);
}

function test_i(data, pre, i) {
  const target = data[i];
  const nums = data.slice(i - pre, i);
  return nums.some((n) => {
    return nums.includes(target - n);
  });
}

function test(data, pre) {
  for (let i = pre; i < data.length; i++) {
    const output = test_i(data, pre, i);
    if (!output) {
      return data[i];
    }
  }
  return undefined;
}

function find_hash(data, target) {
  for (let i = 0; i < data.length; i++) {
    let sum = data[i];
    for (let j = i - 1; j > -1 && sum < target; j--) {
      sum += data[j];
      if (sum === target) {
        const range = data.slice(j, i + 1);
        return Math.min(...range) + Math.max(...range);
      }
    }
  }
  return undefined;
}

module.exports = {parse, test, find_hash};
