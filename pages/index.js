import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getAllChapters } from '../lib/chapters';
import utilStyles from '../styles/utils.module.css';
import DeckStyles from '../styles/Deck.module.css';

function Deck({id, name}) {
  return (
    <Link href={`/chapters/${id}`}>
      <div className={DeckStyles.container}>
          {name}
        <br />
          Chapitre {id}
        <br />
      </div>
    </Link>
  )
}

export default function Home({ chapters }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.heading}`}>
        <ul>
          {chapters.map(({ id, name }) => (
            <li key={id}>
              <Deck id={id} name={name} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      chapters: await getAllChapters(),
    }
  }
}