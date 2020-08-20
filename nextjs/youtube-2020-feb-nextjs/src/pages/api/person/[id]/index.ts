import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  switch (req.method) {
    case 'PUT':
      const stmt = await db.prepare('UPDATE person SET name = ?, email = ? where id = ?');
      await stmt.run(req.body.name, req.body.email, req.query.id);
      stmt.finalize();
    default:
      const person = await db.get('SELECT * FROM person where id = ?', [req.query.id]);
      res.json(person);
  }
}
