import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { hash } from 'bcrypt';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  switch (req.method) {
    case 'POST':
      hash(req.body.password, 10, async function (err, hash) {
        const stmt = await db.prepare('INSERT INTO person (name, email, password) VALUES (?, ?, ?)');
        await stmt.run(req.body.name, req.body.email, hash);
        stmt.finalize();

        const person = await db.all('SELECT * FROM person');
        res.json(person);
      });
      break;
    default:
      res.status(405).json({ message: 'We only support POST' });
  }
}
