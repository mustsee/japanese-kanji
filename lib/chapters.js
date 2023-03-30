export async function getAllChapters() {
  const res = await fetch("https://mustsee.github.io/japanese-kanji-api/v1/chapters/list.json")
  const chapters = await res.json();

  let list = [];
  for (const [key, value] of Object.entries(chapters)) {
    list.push({ ...value, id: key });
  }

  return list;
}

export async function getAllChaptersId() {
  const res = await fetch("https://mustsee.github.io/japanese-kanji-api/v1/chapters/list.json")
  const chapters = await res.json();

  let list = [];
  for (const [key, value] of Object.entries(chapters)) {
    list.push({ params: { id: key }});
  }

  return list;
}

export async function getChapterData(id) {
  const res = await fetch(`https://mustsee.github.io/japanese-kanji-api/v1/chapters/${id}.json`)
  const chapter = await res.json();

  return {
    id,
    ...chapter,
  }
}