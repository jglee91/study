import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { VehiclePerson } from '../../api/VehiclePerson';

export interface ListProps {
  ownersList: VehiclePerson[] | undefined;
}

export default function List({ ownersList }: ListProps) {
  return (
    <div>
      {ownersList?.map((owner, index) => (
        <div key={index}>
          <Link as={`/${owner.vehicle}/${owner.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {owner.ownerName}'s {owner.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/vehicles');
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { ownersList };
};
