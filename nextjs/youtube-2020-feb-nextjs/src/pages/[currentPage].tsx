import Index, { getStaticProps } from './';
import { GetStaticPaths } from 'next';
import { openDB } from '../openDB';

export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await openDB();
  const { total } = await db.get('SELECT COUNT(*) AS total FROM microphone');
  const numberOfPages = Math.ceil(total / 5.0);
  const paths = Array(numberOfPages)
    .fill('')
    .map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } };
    });

  return {
    fallback: false,
    paths,
  };
};
