const { readFileSync } = require("fs");
const reactionFile = readFileSync("./ff_bot.txt", "utf8");
const reactions = reactionFile
  .split("\n")
  .map(str => str.trim())
  .filter(str => str.length > 0);

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function noMentions(collection) {
  return collection.array().length === 0;
}

module.exports = class FriendlyFire {
  message(msg, state, kill) {
    const botUser = state.bot.user;
    if (msg.isMemberMentioned(botUser)) {
      const mentions = msg.mentions;

      if (noMentions(mentions.channels) && noMentions(mentions.roles)) {
        if (mentions.users.array().length === 1) {
          // Bot is mentioned but no roles or channels are
          // and the users length is 1 which means only the bot is mentioned
          msg.reply(randomItem(reactions));
          kill();
        }
      }
    }
  }
};
