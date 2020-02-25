const postgres = require("postgres");

const sql = postgres(process.env.PG_URL, { debug: console.log });

function bans(newBans) {
  return newBans
    .map(user => {
      return `('${user.userid}', ${user.bans})`;
    })
    .join(", ");
}

module.exports = class BookOfGrudges {
  async init() {
    const res1 = await sql`DROP TABLE IF EXISTS bookofgrudges;`;
    console.log(res1);
    const res = await sql`
      CREATE TABLE IF NOT EXISTS bookofgrudges (
        userid varchar(45) UNIQUE NOT NULL,
        bans integer NOT NULL DEFAULT '0',
        PRIMARY KEY (userid)
      );
    `;
    console.log(res);
  }

  async message(msg) {
    try {
      if (msg.content.startsWith("!ban")) {
        const members = msg.mentions.members;
        if (!members) return;

        const userIds = members.map(user => user.id);
        const numBans = await sql`SELECT (userid, bans) FROM bookofgrudges WHERE userid IN ${sql(
          userIds,
        )}`;

        const newBans = userIds.map(id => {
          const userResult = numBans.find(result => result.userid === id);
          const bans = (userResult && userResult.bans) || 0;
          const newBans = bans + 1;
          return { userid: id, bans: newBans };
        });

        console.log(newBans);

        const result = await sql`INSERT INTO bookofgrudges ${sql(
          newBans,
          "userid",
          "bans",
        )} ON CONFLICT (userid) DO UPDATE SET bans = excluded.bans`;

        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
