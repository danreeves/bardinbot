const postgres = require("postgres");

const sql = postgres(process.env.PG_URL);

function bans(newBans) {
  return newBans
    .map(user => {
      return `('${user.userid}', ${user.bans})`;
    })
    .join(", ");
}

module.exports = class BookOfGrudges {
  init() {
    const res = sql`
      CREATE TABLE IF NOT EXISTS bans (
        userid varchar(45) NOT NULL,
        bans integer NOT NULL DEFAULT '0'
      )
    `;
    console.log(res);
  }

  async message(msg) {
    try {
      if (msg.content.startsWith("!ban")) {
        const members = msg.mentions.members;
        if (!members) return;

        const userIds = members.map(user => user.id);
        const numBans = await sql`SELECT (userid, bans) FROM bans WHERE userid IN (${userIds.join(
          ", ",
        )})`;

        const newBans = userIds.map(id => {
          const userResult = numBans.find(result => result.userid === id);
          const bans = (userResult && userResult.bans) || 0;
          const newBans = bans + 1;
          return { userid: id, bans: newBans };
        });

        console.log(newBans);
        console.log(bans(newBans));

        const query = `INSERT INTO bans (userid, bans) VALUES ${bans(
          newBans,
        )} ON CONFLICT (userid) DO UPDATE bans = excluded.bans`;

        const result = await sql`${query}`;

        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
