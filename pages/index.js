import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getAllDecks } from '../lib/decks';
import utilStyles from '../styles/utils.module.css';
import DeckStyles from '../styles/Deck.module.css';

function Deck({ deck }) {
  return (
    <Link href={`/decks/${deck.folder}/${deck.id}`}>
      <div className={DeckStyles.container}>
          {deck.name}
        <br />
          {deck.method} {deck.chapter && <span> - Chapitre {deck.chapter} </span>}
      </div>
    </Link>
  )
}

export default function Home({ decks }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.heading}`}>
        <ul>
          {decks.map(deck => (
            <li key={`${deck.folder}/${deck.id}`}>
              <Deck deck={deck} />
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
      decks: await getAllDecks(),
    }
  }
}