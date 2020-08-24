import { Microphone } from '../../../model/Microphone';
import { GetStaticProps, GetStaticPaths } from 'next';
import { openDB } from '../../openDB';
import { useRouter } from 'next/router';

export type MicrophoneDetailProps = Microphone;
// export interface MicrophoneDetail extends Microphone {

// }

export default function MicrophoneDetail({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{imageUrl}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (
  ctx
) => {
  const id = ctx.params.id as string;
  const db = await openDB();
  const microhpone = await db.get('SELECT * FROM microphone where id = ?', +id);

  return { props: microhpone };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all('SELECT * FROM microphone');
  const paths = microphones.map((microphone) => {
    return { params: { id: microphone.id.toString() } };
  });
  return {
    // fallback: false,
    fallback: true, // if true, component can use router.isFallback option
    paths,
  };
};
