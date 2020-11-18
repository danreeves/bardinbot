module.exports = class VoiceChats {
  constructor({ category, startChannel, channelTemplate }) {
    this.category = category;
    this.startChannel = startChannel;
    this.channelTemplate = channelTemplate;
    this.voiceStateUpdate = this.voiceStateUpdate.bind(this);
    this.newChannelName = this.newChannelName.bind(this);
  }

  newChannelName(user) {
    const username = user.nickname || user.user.username;
    return this.channelTemplate.replace("%", username);
  }

  async voiceStateUpdate(oldUser, user) {
    try {
      // Creating new rooms
      if (user.voiceChannel && user.voiceChannel.name === this.startChannel) {
        let newChannelName = this.newChannelName(user);
        const guild = user.voiceChannel.guild;
        const channels = guild.channels.array();
        const category = channels
          .filter(channel => channel.type === "category")
          .find(channel => channel.name === this.category);
        const voiceChannels = channels
          .filter(channel => channel.type === "voice")
          .filter(channel => channel.parentId === category.id);
        const userOwnedChannels = voiceChannels.filter(channel =>
          channel.name.includes(newChannelName)
        );

        if (userOwnedChannels.length > 0) {
          newChannelName = `${newChannelName} (${userOwnedChannels.length})`;
        }

        const newChannel = await guild.createChannel(newChannelName, {
          type: "voice",
          parent: category
        });
        user.setVoiceChannel(newChannel);
      }

      // Deleting old rooms
      if (oldUser.voiceChannel) {
        const oldVoiceChannel = oldUser.voiceChannel;
        const isGeneratedChannel = oldVoiceChannel.name.includes(
          this.channelTemplate.replace("%", "")
        );
        const isEmpty = oldVoiceChannel.members.array().length === 0;
        if (isGeneratedChannel && isEmpty) {
          oldVoiceChannel.delete("It's empty");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
