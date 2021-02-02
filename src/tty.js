const clear = function() {
  process.stdout.write('\x1Bc');
};

module.exports = {
  clear,
};
