import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { secret } from "../../../api/secret";
import cookie from "cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  switch (req.method) {
    case "POST":
      const person: any = await db.get("SELECT * FROM person where email = ?", [
        req.body.email,
      ]);

      if (!person) {
        res.status(401).json({ message: "We can't find the account." });
        break;
      }

      compare(req.body.password, person.password, async function (err, result) {
        if (!err && result) {
          const claims = { sub: person.id, myPersonEmail: person.email };
          const jwt = sign(claims, secret, { expiresIn: "1h" });

          res.setHeader("Set-Cookie", cookie.serialize('auth', jwt, {
            httpOnly: true, // can't control via javascript
            secure: process.env.NODE_ENV !== 'development', // only transfer in https
            sameSite: 'strict',
            maxAge: 3600,
            path: '/' // root out domain
          }));
          res.json({ message: 'Welcome back to the app!' });
        } else {
          res.json({ message: "Ups, something went wrong!" });
        }
      });
      break;
    default:
      res.status(405).json({ message: "We only support POST" });
  }
}
