import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.json({ hello: 'world', method: req.method });
      break;
    default:
      res.status(500).json({ message: 'sorry we only accept GET requests' });
  }
}
