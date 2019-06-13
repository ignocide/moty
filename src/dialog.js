const readline = require('readline');
const Printer = require('./printer');
const COLOR = require('./color');
const printer = new Printer();
const out = process.stdout;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

const getChar = function (a) {
  const read = process.stdin
  read.setEncoding('utf8');
  return new Promise((res) => {
    let readChar = (chunk) => {
      read.off('data', readChar)
      if (chunk === "\u000D") {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
      }
      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      return res(chunk);
    }
    read.on('data', readChar);

  })
}

const question = function (ques) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((res, rej) => {
    rl.question(ques, (answer) => {
      // TODO: Log the answer in a database
      rl.close();
      return res(answer)
    });
  })
}

const select = async function (question, options) {
  let currentIndex = 0;

  out.write(question + "\n");
  function printOptions() {
    for (let index in options) {
      let color = null;
      if (index == currentIndex) {
        color = COLOR.BRIGHT_GREEN
      }
      printer.write(options[index] + '\n', color)
      // out.write("\x1b[30;160m" + option + "\n");
    }
  }

  function initOptions() {
    process.stdout.moveCursor(0, -1 * options.length);
    process.stdout.clearLine();
    printOptions();
  }

  printOptions();

  let selected = false;

  while (!selected) {
    let key = await getChar(1);
    switch (key) {
      case '\u001b[A':
        if (currentIndex > 0) {
          currentIndex--;
          initOptions();
        }
        // Up
        break;
      case '\u001b[B':
        if (currentIndex < (options.length) - 1) {
          currentIndex++;
          initOptions();
        }
        // Down
        break;
      case "\u000D":
        selected = true;
        break;
      default: {

      }
    }
  }

  return options[currentIndex];
}




module.exports = {
  select,
  question
}