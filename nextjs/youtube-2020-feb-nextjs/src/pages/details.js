import Link from 'next/link';

const people = [
  { v: 'car', name: 'jglee' },
  { v: 'bike', name: 'dlwnsrb' },
  { v: 'airplane', name: 'lee' },
];

export default function Details() {
  return (
    <div>
      {people.map((person) => (
        <div>
          <Link as={`/${person.v}/${person.name}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {person.name}'s {person.v}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
