const { readFileSync } = require("fs");
const badwordsContent = readFileSync("./bad-words.txt", "utf8");
const badwords = badwordsContent
  .split("\n")
  .map(str => str.trim())
  .filter(str => str.length > 0)
  .map(word => new RegExp(`(^|\\W)${word}($|\\W)`, "gi"));

module.exports = class BadWords {
  message(message, _state, kill) {
    const matches = badwords.filter(matcher => {
      const matches = message.content.match(matcher);
      return matches !== null && matches.length > 0;
    });

    matches.sort((a, b) => {
      return a.length > b.length ? -1 : 1;
    });

    if (matches.length > 0) {
      kill(); // Don't do anything after this

      const newContents = matches.reduce((str, match) => {
        return str.replace(match, "umgak");
      }, message.content);

      if (message.deletable) {
        message.reply(`you said: ${newContents}`);
        message.delete();
      } else {
        message.reply("watch your mouth, umgi");
      }
    }
  }
};
