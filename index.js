require("dotenv").config();
const micro = require("micro");
const HelperBot = require("@danreeves/helper-bot");
const DontReplyToSelf = require("@danreeves/helper-bot/middleware/dont-reply-to-self");
const Responder = require("@danreeves/helper-bot/middleware/responder");

const RoleReactions = require("./role-reactions");
const DefaultRole = require("./default-role");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DontReplyToSelf())
  .use(
    new Responder({
      command: /know what i think/gi,
      response: "do I know what an elf thinks? No one does!",
    }),
  )
  .use(
    new Responder({
      command: /^oi/gi,
      response: "OI!",
    }),
  )
  .use(
    new RoleReactions({
      // IDs of channels to refresh on booting
      channels: ["673040355041476621"],
      // IDs of messages to watch
      messages: ["678761819547893762"],
      // Emoji ID: Role name
      mapping: {
        "678780524399034370": "VT2",
        "678780728405655562": "DRG",
        "678782811066466384": "RoR",
        "678783520201637907": "Conan",
        "678784015720775710": "Minecraft",
      },
    }),
  )
  .use(new DefaultRole("Comfy Camper"))
  .start();

const server = micro(async () => {
  return `Bot Bardin is online. Uptime: ${helper.bot.uptime}`;
});

server.listen(process.env.PORT);
