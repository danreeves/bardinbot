module.exports = class Hello {
  async init(bot) {
    const channel = bot.channels
      .array()
      .find(
        channel =>
          channel.type === "text" && channel.id === "679042808132272171"
      );
    try {
      channel.send("This bot is up!");
    } catch (error) {
      console.log(error);
    }
  }
};
