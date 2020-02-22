const { readFileSync } = require("fs");
const badwordsContent = readFileSync("./bad-words.txt", "utf8");
const badwords = badwordsContent
  .split("\n")
  .map(str => str.trim())
  .filter(str => str.length > 0);

console.log(badwords);

module.exports = class BadWords {
  message(message, _state, kill) {
    const matches = badwords.filter(word => message.content.includes(word));
    if (matches.length > 0) {
      kill(); // Don't do anything after this

      const newContents = matches.reduce((str, match) => {
        console.log("replacing", match);
        return str.replace(match, "umgak");
      }, message.content);

      console.log(newContents);

      // M message.reply(`you said: ${newContents}`);
      // message.delete();
    }
  }
};
