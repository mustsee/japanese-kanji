import Layout from "../../../components/layout";
import { getAllDecksRoutes, getDeckData } from "../../../lib/decks";
import utilStyles from '../../../styles/utils.module.css';
import CardStyles from '../../../styles/Card.module.css';
import { useState } from "react";
import arrayShuffle from "array-shuffle";

export default function Deck({ deckData }) {
  const [currentIndex, setIndex] = useState(0)
  const [items, setItems] = useState(deckData.kanji)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setIndex(currentIndex + 1)
    } else {
      setIndex(0)
    }
    setShowAnswer(false)
  }

  const handlePrevious = () => {
    if (currentIndex - 1 < 0) {
      setIndex(items.length - 1)
    } else {
      setIndex(currentIndex - 1)
    }
    setShowAnswer(false)
  }

  const handleShuffle = () => {
    const shuffled = arrayShuffle(items);
    setItems(shuffled);
  }

  return (
    <Layout>
      <section className={`${utilStyles.padding1rem} ${CardStyles.header}`}>
        <span className={CardStyles.title}>{deckData.name}</span>
        {/* <span className={CardStyles.description}>Chapitre {deckData.id}</span> */}
      </section>
      <section className={`${utilStyles.padding1rem}`}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
          <span 
            style={{ width: '40%', textAlign: 'center', border: '2px solid #eaeaea', padding: '0.25rem 0', backgroundColor: 'white', cursor: 'pointer'}} 
            onClick={handleShuffle}
          >
            Mélanger
          </span>
        </div>
      </section>
      <section>
        <div style={{ padding: '3rem 0 3rem 0'}}>
          <div style={{fontSize: 4  + 'rem', textAlign: 'center'}}>
            {items[currentIndex].kanji}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
          <span 
            style={{ width: '40%', textAlign: 'center', border: '2px solid #eaeaea', padding: '0.25rem 0', backgroundColor: 'white', cursor: 'pointer'}} 
            onClick={handlePrevious}
          >
            Précédent
          </span>
          <span style={{ padding: '0.25rem 0' }}>{currentIndex + 1} / {items.length}</span>
          <span 
            style={{ width: '40%', textAlign: 'center', border: '2px solid #eaeaea', padding: '0.25rem 0', backgroundColor: 'white', cursor: 'pointer'}} 
            onClick={handleNext}
          >
            Suivant
          </span>
        </div>
        <div style={{ padding: '1rem', margin: '1rem 0', borderLeft: '2px solid #eaeaea', visibility: `${showAnswer ? 'visible' : 'hidden'}`}}>
          <div style={{ marginBottom: '0.25rem'}}>
            {items[currentIndex].meanings.FR.map((meaning, index) => {
              return (
                <>
                  {index > 0 && ', '}
                  <span key={meaning}>{meaning}</span>
                </>
              ) 
            })}
          </div>
          <div style={{ marginBottom: '0.25rem'}}>
            {items[currentIndex].elements.FR.map((element, index) => {
              return (
                <>
                  {index > 0 && ', '}
                  <span key={element}>{element}</span>
                </>
              ) 
            })}
          </div>
          <div>
            {items[currentIndex].summary.FR}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <span 
            style={{ width: '40%', textAlign: 'center', border: '2px solid #eaeaea', padding: '0.25rem 0', backgroundColor: 'white', cursor: 'pointer'}} 
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {!showAnswer ? 'Afficher la réponse' : 'Cacher la réponse'}
          </span>
        </div>
      </section>
    </Layout>
  ) 
}

const folder = "cdj"

export async function getStaticProps({ params }) {
  const deckData = await getDeckData(folder, params.id);
  return {
    props: {
      deckData,
    }
  }
}

export async function getStaticPaths() {
  const paths = await getAllDecksRoutes(folder);
  return {
    paths,
    fallback: false,
  }
}
