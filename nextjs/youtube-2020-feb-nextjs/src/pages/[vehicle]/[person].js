import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Person({ ownersList }) {
  const router = useRouter();
  const [owners, setOwners] = useState(ownersList);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `http://localhost:3000/api/vehicle?ownerName=${router.query.person}&vehicle=${router.query.vehicle}`
      );
      const list = await response.json();
      setOwners(list);
    }

    if (!ownersList.length) {
      loadData();
    }
  }, []);

  if (!owners[0]) {
    return <div>loading...</div>;
  }

  return <pre>{owners[0]?.details}</pre>;
}

Person.getInitialProps = async (context) => {
  if (!context.req) {
    return { owners: [] };
  }

  const { query } = context;
  const response = await fetch(
    `http://localhost:3000/api/vehicle?ownerName=${query.person}&vehicle=${query.vehicle}`
  );
  const ownersList = await response.json();
  return { ownersList: ownersList };
};
