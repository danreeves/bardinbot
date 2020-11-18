module.exports = class RoleReactions {
  constructor({ channels, messages, mapping }) {
    this.channels = channels;
    this.messages = messages;
    this.mapping = mapping;
    this.init = this.init.bind(this);
    this.reactionAdd = this.reactionAdd.bind(this);
  }

  async init(bot) {
    const channels = bot.channels
      .array()
      .filter(
        channel => channel.type === "text" && this.channels.includes(channel.id)
      );

    channels.forEach(channel => channel.fetchMessages({ limit: 20 }));
  }

  async reply(user, roleName, given) {
    let dm;

    if (user.dmChannel) {
      dm = user.dmChannel;
    } else {
      dm = await user.createDM();
    }

    if (given) {
      dm.send(`Oi, I've given you the ${roleName} role.`);
    } else {
      dm.send(`Oi, I've removed the ${roleName} role from you.`);
    }
  }

  async reactionAdd(reaction, user) {
    if (this.messages.includes(reaction.message.id)) {
      const roleName = this.mapping[reaction.emoji.id];
      if (roleName) {
        const guild = reaction.message.guild;
        const member = guild.member(user);
        const role = guild.roles.array().find(role => role.name === roleName);
        await member.addRole(role);
        console.log(`Adding role ${roleName} to ${user.username}`);
        this.reply(user, roleName, true);
      }
    }
  }

  async reactionRemove(reaction, user) {
    if (this.messages.includes(reaction.message.id)) {
      const roleName = this.mapping[reaction.emoji.id];
      if (roleName) {
        const guild = reaction.message.guild;
        const member = guild.member(user);
        const role = guild.roles.array().find(role => role.name === roleName);
        await member.removeRole(role);
        console.log(`Removing role ${roleName} to ${user.username}`);
        this.reply(user, roleName, false);
      }
    }
  }
};
