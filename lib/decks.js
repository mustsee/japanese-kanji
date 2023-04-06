const baseUrl = "https://mustsee.github.io/japanese-kanji-static-api/v1";

export async function getAllDecks() {
  const res = await fetch(`${baseUrl}/decks/list.json`)
  const decks = await res.json();

  return decks;
}

export async function getAllDecksRoutes(folder) {
  const res = await fetch(`${baseUrl}/decks/list.json`);
  const decks = await res.json();

  const routes = decks.filter(deck => deck.folder === folder).map(deck => {
    return {
      params: { id: deck.id }
    }
  });

  return routes;
}

export async function getDeckData(folder, id) {
  const res = await fetch(`${baseUrl}/decks/${folder}/${id}.json`);
  const deck = await res.json();

  return deck;
}