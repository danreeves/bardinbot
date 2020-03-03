const random = require("./utils/random");

module.exports = class Raffle {
  async message(msg, _state, kill) {
    if (!admins.includes(msg.author.id)) {
      return;
    }
    if (msg.content.trim().startsWith("!raffle")) {
      // Don't do any other middleware
      kill();

      const roles = msg.mentions.roles;
      if (roles.array().length < 1) return;

      const members = Array.from(
        new Set(
          roles.reduce((members, role) => {
            return members.concat(role.members.array());
          }, []),
        ),
      );

      const winner = random(members);

      msg.channel.send(`Alright, ${mentioner(msg)}, let me count...`);
      await wait(1500);
      msg.channel.send(`The winner is... <@${winner.id}>`);
    }
  }
};

function wait(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t);
  });
}

function mentioner(msg) {
  const mentionMap = {
    "89182544880234496": "Grimgi",
    "165687679034327052": "Elgi",
    "355941312505315328": "ya Wazzok",
  };

  return mentionMap[msg.author.id] || "Azumgi";
}

const admins = [
  "105699335878021120", // rain
  "89182544880234496", // bunny
  "165687679034327052", // hello
  "355941312505315328", // monkey
];
