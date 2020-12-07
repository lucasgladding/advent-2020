const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString();

const groups = contents.split('\n\n');

const yeses = groups.map(g => {
  const persons = g.split('\n');
  return persons.reduce((questions, question) => {
    if (questions === question) {
      return questions;
    }
    return questions.split('').filter(q => question.includes(q)).join('');
  }, persons[0]);
});

function sum(items) {
  return items.reduce((sum, item) => {
    return sum + item;
  }, 0);
}

console.log('debug', sum(yeses.map(y => y.length)));
