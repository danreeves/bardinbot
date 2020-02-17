require("dotenv").config();
const micro = require("micro");
const HelperBot = require("@danreeves/helper-bot");
const DontReplyToSelf = require("@danreeves/helper-bot/middleware/dont-reply-to-self");
const Responder = require("@danreeves/helper-bot/middleware/responder");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DontReplyToSelf())
  .use(
    new Responder({
      command: /know what i think/gi,
      response: "do I know what an elf thinks? No one does!",
    }),
  )
  .start();

const server = micro(async () => {
  return `Bot Bardin is online. Uptime: ${helper.bot.uptime}`;
});

server.listen(process.env.PORT);
