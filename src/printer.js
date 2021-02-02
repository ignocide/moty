const { BAKCGROUND_COLOR_CODE, FONT_COLOR_CODE } = require('./color/code');
const { toUpperFirstChar } = require('./utils/name');

const Printer = function(options = {}) {
  Object.keys(options).forEach((key) => {
    let option = options[key];
    Object.defineProperty(this, `write${toUpperFirstChar(key)}`, {
      value: (text) => {
        this.write(text, option.fontColor, option.backgroundColor);
      },
      writable: false,
    });
  });
};

Printer.prototype.write = function(text, fontColor, backgroundColor) {
  this.setColor(fontColor, backgroundColor);
  process.stdout.write(text);
  this.reset();
};

Printer.prototype.setColor = function(fontColor = null, backgroundColor = null) {
  const fontColorCode = FONT_COLOR_CODE[fontColor] || 39;
  const backgroundColorCode = BAKCGROUND_COLOR_CODE[backgroundColor] || 49;

  const escape = `\x1b[${fontColorCode};${backgroundColorCode}m`;
  process.stdout.write(escape);
};

Printer.prototype.reset = function() {
  process.stdout.write(`\x1b[0m`);
};

module.exports = Printer;
