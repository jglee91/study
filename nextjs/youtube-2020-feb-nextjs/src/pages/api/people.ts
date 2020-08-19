import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const people = await db.all('SELECT * FROM Person');

  res.json(people);
}
