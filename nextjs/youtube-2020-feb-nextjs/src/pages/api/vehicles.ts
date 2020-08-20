import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { authenticated } from './people';

export default authenticated(async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const vehicle = await db.all('SELECT * FROM vehicle');

  res.json(vehicle);
});
