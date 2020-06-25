import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function List() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('http://localhost:3000/api/vehicle');
      const ownersList = await response.json();
      setOwners(ownersList);
    }

    loadData();
  }, []);

  return (
    <div>
      {owners.map((e, index) => (
        <div key={index}>
          <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
