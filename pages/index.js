import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getAllChapters } from '../lib/chapters';
import utilStyles from '../styles/utils.module.css';
import ChapterStyles from '../styles/Chapter.module.css';

function Chapter({id, name}) {
  return (
    <Link href={`/chapters/${id}`}>
      <div className={ChapterStyles.container}>
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
      {/* <section>
        <div className={utilStyles.heading}>Ce site est un <b>SRS</b> (Space Repetition System ou Système de Répétition espacée)
          pour apprendre les kanji présentés dans le livre <i>Les kanji dans la tête</i>.
        </div>
      </section> */}
      <section className={`${utilStyles.heading}`}>
        <ul>
          {chapters.map(({ id, name }) => (
            <li key={id}>
              <Chapter id={id} name={name} />
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