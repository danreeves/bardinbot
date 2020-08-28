const { CronJob } = require("cron");

module.exports = class Annoy {
  async init(bot) {
    const channel = bot.channels
      .array()
      .find(
        channel =>
          channel.type === "text" && channel.id === "742569224639086592",
      );
    try {
      this.job = new CronJob("* * * * * 0", () => {
        channel.send("Who'd like to hear a song?");
      });
      this.job.start();
    } catch (error) {
      console.log(error);
    }
  }
};
