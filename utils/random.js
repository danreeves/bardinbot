module.exports = function random(items) {
  return items[Math.floor(Math.random() * items.length)];
};
