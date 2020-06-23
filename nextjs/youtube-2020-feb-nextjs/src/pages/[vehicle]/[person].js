import { useRouter } from 'next/router';

export default function Person() {
  const router = useRouter();
  const { vehicle, person } = router.query;

  console.log(router.query);

  return (
    <h2>
      {person}'s {vehicle}
    </h2>
  );
}
