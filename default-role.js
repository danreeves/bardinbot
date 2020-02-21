module.exports = class DefaultRole {
  constructor(defaultRole) {
    this.defaultRole = defaultRole;
    this.userJoin = this.userJoin.bind(this);
  }

  userJoin(user) {
    try {
      const role = user.guild.roles
        .array()
        .find(role => role.name === this.defaultRole);
      user.addRole(role);
      console.log(`Adding role ${this.defaultRole} to ${user.username}`);
    } catch (error) {
      console.log(`FAILED adding role ${this.defaultRole} to ${user.username}`);
      console.log(error);
    }
  }
};
