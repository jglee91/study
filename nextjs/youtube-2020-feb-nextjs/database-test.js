const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ force: 'last' });

  const people = await db.all('SELECT * from Person');
  console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

  const vehicles = await db.all('SELECT * from Vehicle');
  console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2));
}

setup();
