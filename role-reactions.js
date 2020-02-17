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
        channel =>
          channel.type === "text" && this.channels.includes(channel.id),
      );

    channels.forEach(channel => channel.fetchMessages({ limit: 20 }));
  }

  reactionAdd(reaction, user) {
    if (this.messages.includes(reaction.message.id)) {
      const roleName = this.mapping[reaction.emoji.id];
      if (roleName) {
        const guild = reaction.message.guild;
        const member = guild.member(user);
        const role = guild.roles.array().find(role => role.name === roleName);
        member.addRole(role);
        console.log(`Adding role ${roleName} to ${user.username}`);
      }
    }
  }

  reactionRemove(reaction, user) {
    if (this.messages.includes(reaction.message.id)) {
      const roleName = this.mapping[reaction.emoji.id];
      if (roleName) {
        const guild = reaction.message.guild;
        const member = guild.member(user);
        const role = guild.roles.array().find(role => role.name === roleName);
        member.removeRole(role);
        console.log(`Removing role ${roleName} to ${user.username}`);
      }
    }
  }
};
