import { getChapterData } from "./chapters";

/*************************

const item = {
  interval,
  repetition,
  efactor // initial value = 2.5
}

const grade = 0 | 1 | 2 | 3 | 4 | 5;

*************************/

export const grades = [0, 1, 2, 3, 4, 5]

export const supermemo = (item, grade) => {
  let nextInterval;
  let nextRepetition;
  let nextEfactor;

  if (grade >= 3) {
    if (item.repetition === 0) {
      nextInterval = 1;
      nextRepetition = 1;
    } else if (item.repetition === 1) {
      nextInterval = 6;
      nextRepetition = 2;
    } else {
      nextInterval = Math.round(item.interval * item.efactor);
      nextRepetition = item.nextRepetition + 1;
    }
  } else {
    nextInterval = 1;
    nextRepetition = 0;
  }

  nextEfactor = item.efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  if (nextEfactor < 1.3) nextEfactor = 1.3;

  return {
    interval: nextInterval,
    repetition: nextRepetition,
    efactor: nextEfactor,
  }
}

export const getChapterKanji = async (id) => {
  const list = await getChapterData(id);
  const res = {}
  // If no data in firestore, add defaut value
  list.kanji.forEach(element => {
    res[element.kanji] = {
      interval: 0,
      repetition: 0,
      efactor: 2.5
    }
  });
  return { supermemoData: res, deckId: id}
}

// All the user decks from firestore (on load also, on homepage)
export const mainState = {
  "1": {},
  "2": {},
  "3": {}
}