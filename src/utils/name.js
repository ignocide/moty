exports.toUpperFirstChar = function (name) {
  let char = name.charAt(0);
  name = name.substr(1);
  char = char.toUpperCase();
  return `${char}${name}`
}