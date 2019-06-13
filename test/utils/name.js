const nameUtil = require("../../src/utils/name");

describe('utils/name', () => {
  test('upperFirstChar', () => {
    expect(nameUtil.toUpperFirstChar('name')).toEqual('Name')
  });
});