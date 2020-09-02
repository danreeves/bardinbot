const { CronJob } = require("cron");

module.exports = class Annoy {
  init(bot) {
    const channel = bot.channels
      .array()
      .find(
        channel =>
          channel.type === "text" && channel.id === "742569224639086592",
      );
    this.job = new CronJob("0 0 8 * * 3", () => {
      try {
        channel.send("have a nice poop, sport <@166043701469118464>");
      } catch (error) {
        console.log(error);
      }
    });
    this.job.start();
  }
};
