import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';

export const siteTitle = 'RTK as SRS';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home && (
          <div>
           {siteTitle}
          </div>
        )}
        {!home && (
          <div>
            <Link href="/">← Retour à la page d'accueil</Link>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}