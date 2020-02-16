require("dotenv").env();
const HelperBot = require("@danreeves/helper-bot");
const DontReplyToSelf = require("@danreeves/helper-bot/middleware/dont-reply-to-self");
const Responder = require("@danreeves/helper-bot/middleware/responder");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DontReplyToSelf())
  .use(
    new Responder({
      command: /do you know what i think/gi,
      response: "Do I know what elf thinks? No one does!",
    }),
  )
  .start();
