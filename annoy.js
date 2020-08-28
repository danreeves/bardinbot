const { CronJob } = require("cron");

module.exports = class Annoy {
  init(bot) {
    const channel = bot.channels
      .array()
      .find(
        channel =>
          channel.type === "text" && channel.id === "742569224639086592",
      );
    this.job = new CronJob("0 * * * * *", () => {
      try {
        channel.send("Who'd like to hear a song?");
      } catch (error) {
        console.log(error);
      }
    });
    this.job.start();
  }
};
