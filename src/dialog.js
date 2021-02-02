const readline = require('readline');
const Printer = require('./printer');
const COLOR = require('./color');
const printer = new Printer();
const out = process.stdout;
const ListMark = require('./utils/listMark');

const getChar = function(a) {
  const read = process.stdin;
  read.setEncoding('utf8');
  return new Promise((res) => {
    let readChar = (chunk) => {
      read.off('data', readChar);
      if (chunk === '\u000D') {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
      }
      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      return res(chunk);
    };
    read.on('data', readChar);
  });
};

const question = function(ques) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((res, rej) => {
    rl.question(ques, (answer) => {
      // TODO: Log the answer in a database
      rl.close();
      return res(answer);
    });
  });
};

const select = async function(
  question,
  choices,
  options = {
    listStyle: 'none',
  },
) {
  let currentIndex = 0;
  let listMark = new ListMark({ listStyle: options.listStyle, currentIndex });
  choices = choices.map((choice) => {
    if (typeof choice === 'string') {
      return {
        value: choice,
        label: choice,
      };
    } else {
      return choice;
    }
  });

  out.write(question + '\n');
  function printChoices() {
    listMark.initCurrentOrder();
    for (let index in choices) {
      let color = null;
      let listItem = '';

      if (options.listStyle !== 'none') {
        listItem += listMark.getNextMark() + ' ';
      }

      listItem += choices[index].label;
      if (index == currentIndex) {
        color = COLOR.BRIGHT_GREEN;
      }
      printer.write(listItem + '\n', color);
    }
  }

  function initChoices() {
    process.stdout.moveCursor(0, -1 * choices.length);
    process.stdout.clearLine();
    listMark.setActiveOrder(currentIndex);
    printChoices();
  }

  printChoices();

  let selected = false;

  while (!selected) {
    let key = await getChar(1);
    switch (key) {
      case '\u001b[A':
        if (currentIndex > 0) {
          currentIndex--;
          initChoices();
        }
        // Up
        break;
      case '\u001b[B':
        if (currentIndex < choices.length - 1) {
          currentIndex++;
          initChoices();
        }
        // Down
        break;
      case '\u000D':
        selected = true;
        break;
      default: {
      }
    }
  }

  for (let i = 0; i < choices.length + question.split('\n').length; i++) {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine();
  }
  return choices[currentIndex].value;
};

module.exports = {
  select,
  question,
};
