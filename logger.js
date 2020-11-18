module.exports = class Logger {
  warn(data) {
    console.warn(data);
  }

  error(data) {
    console.error(data);
  }

  rateLimit(data) {
    console.warn(data);
  }
};
