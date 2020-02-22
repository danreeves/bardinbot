const { readFileSync } = require("fs");
const badwordsContent = readFileSync("./bad-words.txt", "utf8");
const badwords = badwordsContent.split("\n").map(str => str.trim());

module.exports = class BadWords {
  message(message, _state, kill) {
    const matches = badwords.filter(word => message.content.includes(word));
    if (matches.length > 0) {
      kill(); // Don't do anything after this
      if (message.editable) {
        message.edit("UMGAK");
      } else {
        const newContents = matches.reduce((str, match) => {
          return str.replace(match, "umgak");
        }, message.contents);
        message.reply(newContents);
        message.delete();
      }
    }
  }
};
