const postgres = require("postgres");

const sql = postgres(process.env.PG_URL);

module.exports = class BookOfGrudges {
  init() {
    sql`
      CREATE TABLE IF NOT EXISTS bans (
        userid varchar(45) NOT NULL,
        bans integer NOT NULL DEFAULT '0'
      )
    `;
  }
  async message(msg) {
    try {
      if (msg.content.startsWith("!ban")) {
        const members = msg.mentions.members;
        if (!members) return;

        const userIds = members.map(user => user.id);
        const numBans = await sql`SELECT (userid, bans) FROM botbardin.bans WHERE userid IN (${userIds.join(', ')})`;
        console.log(numBans);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
