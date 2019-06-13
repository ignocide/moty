const COLOR = require('../src/color')
const Printer = require('../src/printer');


describe('printer', () => {
  test('constructor', () => {
    const printer = new Printer();
  });
  test('constructor with options', () => {
    const printer = new Printer({
      myRed: {
        fontColor: COLOR.RED,
        backgroundColor: COLOR.RED
      }
    });
    expect(printer).toHaveProperty('writeMyRed')
  });
});