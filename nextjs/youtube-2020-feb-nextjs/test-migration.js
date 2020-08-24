const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
  try {
    const db = await sqlite.open({
      filename: './microphones.sqlite',
      driver: sqlite3.Database,
    });

    await db.migrate({ force: true });
    const microphones = await db.all('SELECT * FROM microphone');
    console.log(JSON.stringify(microphones, null, 4));
  } catch (e) {
    console.error(e);
  }
})();
