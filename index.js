require("dotenv").config();
const micro = require("micro");
const HelperBot = require("@danreeves/helper-bot");
const DontReplyToSelf = require("@danreeves/helper-bot/middleware/dont-reply-to-self");
const Responder = require("@danreeves/helper-bot/middleware/responder");

const RoleReactions = require("./role-reactions");
const BadWords = require("./bad-words");
const Hello = require("./hello");
const VoiceChats = require("./voice-chats");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DontReplyToSelf())
  .use(new BadWords())
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
      channels: [
        "673040355041476621", // #rules
      ],
      // IDs of messages to watch
      messages: [
        "681707767085793334", // Rules
        "681708036188143657", // LFG
      ],
      // Emoji ID: Role name
      mapping: {
        "678746053301764116": "Comfy Camper",
        "678780524399034370": "VT2",
        "678780728405655562": "DRG",
        "678782811066466384": "RoR",
        "678783520201637907": "Conan",
        "678784015720775710": "Minecraft",
        "681716545230995479": "Monster Hunter",
      },
    }),
  )
  .use(
    new VoiceChats({
      category: "adventures",
      startChannel: "new party",
      channelTemplate: "%'s party",
    }),
  )
  .use(new Hello())
  .start();

const server = micro(async () => {
  return `Bot Bardin is online. Uptime: ${helper.bot.uptime}`;
});

server.listen(process.env.PORT);
